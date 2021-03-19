const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helpers = require('./test_helpers')
const api = supertest(app)

const user = { email: 'login@mail.com', password: 'sekrett' }

beforeAll( async () => {
  await helpers.deleteDB(api)
  await helpers.usersApiPost(api, 200, user)
})

describe('When logging in', () => {

  test('an user with right credentials can log in', async () => {
    const result = await helpers.loginApiPost(api, 200, user)
    expect(result.body.token).toBeDefined()
    expect(result.body.user.email).toBeDefined()
    expect(result.body.user.id).toBeDefined()
    expect(result.body.user.passwordHash).not.toBeDefined()
  })

  test('wrong credentials result in error', async () => {
    const wrongCreds = { email: user.email, password: 'wrongpassword' }
    let result = await helpers.loginApiPost(api, 401, wrongCreds)
    expect(result.body.token).not.toBeDefined()
    expect(result.body.error).toEqual('invalid username or password')

    wrongCreds.email = 'wrong@email.com'
    wrongCreds.password = user.password
    result = await helpers.loginApiPost(api, 401, wrongCreds)
    expect(result.body.error).toEqual('invalid username or password')
  })
})

afterAll( async () => {
  mongoose.connection.close()
})