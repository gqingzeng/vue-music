import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

request.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data
  }
}, err => {
  console.log(err.response);
  return Promise.resolve(err.response)
})

export default request