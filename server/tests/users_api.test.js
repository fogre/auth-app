const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helpers = require('./test_helpers')
const api = supertest(app)

const newUser = {
  email: 'email@email.com',
  password: 'sekret1234'
}

beforeAll(async () => {
  await helpers.deleteDB(api)
})

describe('A new user can', () => {
  test('be created with valid email and password', async () => {
    const resultUser = await helpers.usersApiPost(api, 200, newUser)
    expect(resultUser.body.user.id).toBeDefined()
    expect(resultUser.body.user.email).toBeDefined()
    expect(resultUser.body.user.passwordHash).not.toBeDefined()
  })

  test('not be created if user already exists', async () => {
    const resultUser = await helpers.usersApiPost(api, 400, newUser)
    expect(resultUser.body.error).toBeDefined()
  })

  test('not be created with invalid email address', async () => {
    newUser.email = '@invalidemail.com'
    const resultUser = await helpers.usersApiPost(api, 400, newUser)
    expect(resultUser.body.error).toBeDefined()
  })

  test('not be created without email or password', async () => {
    newUser.email = ''
    let resultUser = await helpers.usersApiPost(api, 400, newUser)
    expect(resultUser.body.error).toBeDefined()

    newUser.email='email@newEmail.com'
    newUser.password=''
    resultUser = await helpers.usersApiPost(api, 400, newUser)
    expect(resultUser.body.error).toBeDefined()
  })
})

const data = {
  name: 'Darth Vader',
  phone: '040123456',
  bio: 'I love force choking'
}

describe('When not logged in user can', () => {
  let existingUsers = null

  beforeAll( async () => {
    existingUsers = await helpers.usersInDB()
  })

  test('get only basic user info from the api', async () => {
    const resultUser = await helpers
      .usersApiGet(api, existingUsers[0].id, 200)

    expect(resultUser.body.id).toBeDefined()
    expect(resultUser.body.name).toBeDefined()
    expect(resultUser.body.email).toBeDefined()
    expect(resultUser.body.bio).toBeDefined()
    expect(resultUser.body.phone).toBeDefined()
    expect(resultUser.body.password).not.toBeDefined()
    expect(resultUser.body.passwordHash).not.toBeDefined()
  })

  test('not edit info or delete account', async () => {
    let result = await helpers.usersApiPut(api, existingUsers[0].id, 401, data)
    expect(result.body.error).toBeDefined()

    result = await helpers.usersApiDelete(api, existingUsers[0].id, 401)
    expect(result.body.error).toEqual('invalid token')
  })
})


describe('When logged in user can', () => {

  test('edit info and delete account with right credentials', async () => {
    const user = await helpers.generateUser('mail@mailer.com', 'sekretttt')
    const resultUser = await helpers
      .usersApiPut(api, user._id, 200, data, user)
    expect(resultUser.body.name).toEqual(data.name)
    expect(resultUser.body.bio).toEqual(data.bio)
    expect(resultUser.body.phone).toEqual(data.phone)

    await helpers.usersApiDelete(api, user._id, 204, user)
  })

  test('not edit info or delete account with wrong credentials', async () => {
    const user1 = await helpers.generateUser('mailone@mailer.com', 'sekretttt')
    const user2 = await helpers.generateUser('mailtwo@mailer.com', 'sekretttt')

    let result = await helpers.usersApiPut(api, user1._id, 401, data, user2)
    expect(result.body.error).toEqual('unauthorized')

    result = await helpers.usersApiDelete(api, user1._id, 401, user2)
    expect(result.body.error).toEqual('unauthorized')
  })
})

afterAll( async () => {
  mongoose.connection.close()
})