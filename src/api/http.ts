import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import showCodeMessage from '@/api/code';
import { formatJsonToUrlParams, instanceObject } from '@/utils/format';

export interface ResponseData<T> {
  code: number;
  data?: T;
  msg: string;
}
const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;
// axios.defaults.withCredentials = true; // 若跨域请求需要带 cookie 身份识别

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    message.info(JSON.stringify(response.status));
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      message.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    message.warning('网络连接异常,请稍后再试!');
    return Promise.reject(error);
  },
);
const service = {
  get: <T>(url: string, data?: object): Promise<ResponseData<T>> => axiosInstance.get(url, { params: data }),
  post: <T>(url: string, data?: object): Promise<ResponseData<T>> => axiosInstance.post(url, data),
  put: (url: string, data?: object) => axiosInstance.put(url, data),
  delete: (url: string, data?: object) => axiosInstance.delete(url, data),
  upload: (url: string, file: File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url: string, data: instanceObject) => {
    const downloadUrl = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
    window.location.href = downloadUrl;
  },
};

export default service;
