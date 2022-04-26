import { AxiosRequestConfig } from "axios";

import { _axios } from "./_axios";

interface objAny {
  [propName: string]: any;
}

// get请求
const httpGet = async (url: string, params?: objAny) => {
  const res = await _axios.get(url, { params: params })
  return res.data
}

// post请求
const httpPost = async (
  url: string,
  data?: objAny,
  config?: AxiosRequestConfig | undefined) => {
  const res = await _axios.post(url, data, config)
  return res.data
}

export { httpGet, httpPost }

