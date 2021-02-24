import axios from 'axios'

const avatarURL = '/api/avatar'
const loginURL = '/api/login'
const userURL = '/api/users'

const post = (url, data) => axios.post(url, data)

const get = (url, id) => axios.get(`${url}/${id}`)

const put = (url, id, data) => axios.put(`${url}/${id}`, data)

const destroy = (url, id) => axios.delete(`${url}/${id}`)

export default {
  login: credentials => post(loginURL, credentials),
  getUser: id => get(userURL, id),
  createUser: credentials => post(userURL, credentials),
  updateUser: (id, user) => put(userURL, id, user),
  deleteUser: id => destroy(userURL, id),
  addAvatar: avatar => post(avatarURL, avatar),
  deleteAvatar: id => destroy(avatarURL, id)
}