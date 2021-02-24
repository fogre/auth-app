export const handleChange = (e, obj, setObj) => {
  const newObj = { ...obj }
  newObj[e.target.name] = e.target.value
  setObj(newObj)
}