const fs = require('fs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helpers = require('./test_helpers')
const Avatar = require('../models/avatar')
const User = require('../models/user')
const api = supertest(app)

const testImage = `${__dirname}/test-image.png`
const testImageTwo = `${__dirname}/test-image2.png`
const userTemplate = { email: 'photo@mail.com', password: 'sekrett' }

beforeAll( async () => {
  await helpers.deleteDB(api)
})

describe('When uploading avatar, user can', () => {

  test('upload a new avatar when logged in', async () => {
    expect(fs.existsSync(testImage)).toBeTruthy()

    const user = await helpers.generateUser(
      userTemplate.email, userTemplate.password
    )
    const res = await helpers.avatarsApiPost(
      api, user._id, 200, testImage, user
    )

    expect(res.body.user.toString()).toMatch(user._id.toString())
    expect(res.body.cloudinaryId).toBeDefined()
    expect(res.body.cloudinaryV).toBeDefined()
    expect(res.body.url).toBeDefined()
    expect(res.body.id).toBeDefined()
    expect(res.body._id).not.toBeDefined()
    expect(res.body._v).not.toBeDefined()
  })

  test('replace avatar when logged in', async () => {
    expect(fs.existsSync(testImageTwo)).toBeTruthy()

    const user = await User
      .findOne({ email: userTemplate.email })
      .populate('avatar')
    const oldAvatar = user.avatar
    expect(oldAvatar).toBeDefined()

    const res = await helpers.avatarsApiPost(
      api, user.id, 200, testImageTwo, user
    )

    expect(res.body.user.toString()).toMatch(user._id.toString())
    expect(res.body.cloudinaryId).toMatch(oldAvatar.cloudinaryId)
    expect(res.body.cloudinaryV).toBeDefined()
    expect(res.body.url).toBeDefined()
    expect(res.body.id).toBeDefined()
    expect(res.body.cloudinaryV).not.toEqual(oldAvatar.cloudinaryV)
    expect(res.body.url).not.toEqual(oldAvatar.url)
  })

  test('delete avatar when logged in', async () => {
    const user = await User.findOne({ email: userTemplate.email })
    expect(user.avatar).toBeTruthy()

    await helpers.avatarsApiDelete(api, user._id, 204, user)

    const updatedUser = await User.findById(user._id)
    expect(updatedUser.avatar).not.toBeTruthy()

    const avatar = await Avatar.findById(user.avatar._id)
    expect(avatar).not.toBeTruthy()
  })

  test('not upload or delete avatar without right credentials', async () => {
    const user = await User.findOne({ email: userTemplate.email })
    const wrongUser = await helpers.generateUser('wrongwqeddw@f.com', 'dsaodpka')
    await helpers.avatarsApiPost(api, user._id, 401, testImage)
    await helpers.avatarsApiPost(api, user._id, 401, testImage, wrongUser)
    await helpers.avatarsApiDelete(api, user._id, 401)
    await helpers.avatarsApiDelete(api, user._id, 401, wrongUser)
  })
})

afterAll( async () => {
  mongoose.connection.close()
})