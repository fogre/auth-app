const User = require('../models/user')

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const usersApiPost = (api, code, data) => {
  return api.post('/api/users')
    .send(data)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

const usersApiPut = (api, id, code, data) => {
  return api.put(`/api/users/${id}`)
    .send(data)
    .expect(code)
    .expect('Content-Type', /application\/json/)
}

module.exports = {
  usersInDB,
  usersApiPost,
  usersApiPut
}