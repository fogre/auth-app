const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helpers = require('./users_test_helpers')
const api = supertest(app)

beforeAll(async () => {
  await api.post('/api/tests/reset')
})

const newUser = {
  email: 'email@email.com',
  password: 'sekret1234'
}

describe('A new user can', () => {

  test('be created with valid email and password', async () => {
    const resultUser = await helpers.usersApiPost(api, 200, newUser)

    expect(resultUser.body.id).toBeDefined()
    expect(resultUser.body.passwordHash).not.toBeDefined()
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

let existingUsers = null

describe('Existing user can', () => {

  beforeAll(async () => {
    await helpers.usersApiPost(api, 200, {
      email: 'em@em.com', password: 'maidenname'
    })
    existingUsers = await helpers.usersInDB()
  })

  test('get user info from the api', async () => {
    const resultUser = await api
      .get(`/api/users/${existingUsers[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultUser.body.id).toBeDefined()
    expect(resultUser.body.name).toBeDefined()
    expect(resultUser.body.email).toBeDefined()
    expect(resultUser.body.bio).toBeDefined()
  })

  test('add name, phone and bio', async () => {
    const data = {
      name: 'Darth Vader',
      phone: '040123456',
      bio: 'I love force choking'
    }
    expect(existingUsers[0].name).toEqual(null)

    const resultUser = await helpers
      .usersApiPut(api, existingUsers[0].id, 200, data)

    expect(resultUser.body.name).toEqual(data.name)
  })

})

afterAll(async () => {
  mongoose.connection.close()
})