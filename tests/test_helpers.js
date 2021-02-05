const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const deleteDB = api => {
  return api
    .post('/api/tests/reset')
    .expect(204)
}

const generateAuthHeader = user => {
  if (!user) {
    return { Authorization: 'bearer ' }
  }
  const userForToken = {
    email: user.email,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return { Authorization: `bearer ${token.toString()}` }
}

const generateUser = async (mail, pass) => {
  const passwordHash = await bcrypt.hash(pass, 10)
  const user = new User({ email: mail, passwordHash })
  await user.save()
  return user
}

const loginApiPost = (api, code, data) => {
  return api
    .post('/api/login')
    .send(data)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const usersApiGet = (api, id, code) => {
  return api
    .get(`/api/users/${id}`)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

const usersApiPost = (api, code, data) => {
  return api.post('/api/users')
    .send(data)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

const usersApiPut = (api, id, code, data, user = null) => {
  return api.put(`/api/users/${id}`)
    .set(generateAuthHeader(user))
    .send(data)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

const usersApiDelete = (api, id, code, user = null) => {
  return api.delete(`/api/users/${id}`)
    .set(generateAuthHeader(user))
    .expect(code)
}

module.exports = {
  deleteDB,
  generateUser,
  loginApiPost,
  usersInDB,
  usersApiGet,
  usersApiPost,
  usersApiPut,
  usersApiDelete
}