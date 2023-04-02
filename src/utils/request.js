import axios from 'axios'

const http = axios.create({
  // 通用请求地址前缀
  baseURL: '/api',
  timeout: 10000,   // 超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
