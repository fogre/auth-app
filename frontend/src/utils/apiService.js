import axios from 'axios'

const avatarURL = '/api/avatar'
const loginURL = '/api/login'
const userURL = '/api/users'
const config = {
  headers: { Authorization: '' }
}
let token = null

const get = (url, id) => axios.get(`${url}/${id}`)

const destroy = (url, id) => axios.delete(`${url}/${id}`, config)

const setLoggedUser = data => {
  if (data) {
    token = data.token
    config.headers.Authorization = `bearer ${token}`
    window.localStorage.setItem(
      'userAuthAppUser', JSON.stringify(data)
    )
  } else {
    token = null
    config.headers.Authorization = ''
    window.localStorage.removeItem('userAuthAppUser')
  }
}

const gitLogin = async code => {
  const res = await axios.get(`${loginURL}/github/login?code=${code}`)
  setLoggedUser(res.data)
  return res.data.user
}


const loginPost = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  setLoggedUser(res.data)
  return res.data.user
}

const put = async (url, id, data) => {
  const res = await axios.put(`${url}/${id}`, data, config)
  setLoggedUser({
    user: res.data,
    token,
  })
  return res.data
}

const imagePost = (img, id) => {
  const newConfig = {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'multipart/form'
    }
  }
  const formData = new FormData()
  formData.append('userImg', img)
  return axios.post(`${avatarURL}/${id}`, formData, newConfig)
}

export default {
  login: credentials => loginPost(loginURL, credentials),
  getUser: id => get(userURL, id),
  createUser: credentials => loginPost(userURL, credentials),
  updateUser: user => put(userURL, user.id, user),
  deleteUser: id => destroy(userURL, id),
  addAvatar: (image, id) => imagePost(image, id),
  deleteAvatar: id => destroy(avatarURL, id),
  setLoggedUser,
  gitLogin
}