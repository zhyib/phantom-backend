import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => config,
  // eslint-disable-next-line no-console
  (error) => { console.log(error); },
);

service.interceptors.response.use(
  (response) => {
    const dataAxios = response.data;
    const { code, data, message } = dataAxios;
    switch (code) {
      case 0:
        return Promise.resolve(data);
      default:
        ElMessage.error(message);
        return Promise.reject(message);
    }
  },
  (error) => Promise.reject(error),
);

export default service;
