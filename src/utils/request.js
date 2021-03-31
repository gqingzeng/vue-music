import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000,
  xhrFields: {
    withCredentials: true
  }
})

request.interceptors.response.use(res => {
  const { status, data } = res
  if (status === 200) {
    return data
  }
}, err => {
  return Promise.reject(err)
})

export default request