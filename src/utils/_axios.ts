import axios from 'axios'

// 根据生产环境和开发环境配置URL地址
const BASE_URL = process.env.REACT_APP_URL

// 创建axios
let config = {
  baseURL: BASE_URL,
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);

// 配置axios上传信息格式
_axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

export { _axios }

