export const handleChange = (e, obj, setState) => {
  const newObj = { ...obj }
  newObj[e.target.name] = e.target.value
  setState(newObj)
}

export const checkEmailAndPassword = (credentials, showError) => {
  if (credentials.emailtwo !== '' && credentials.email !== credentials.emailtwo) {
    showError({ type: 'email', error: 'Email is not equal' })
    return false
  } else if (credentials.password !== credentials.passwordtwo) {
    showError({ type: 'password', error: 'Password is not equal' })
    return false
  }
  return true
}