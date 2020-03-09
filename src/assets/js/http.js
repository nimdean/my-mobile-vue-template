import axios from 'axios';
import vm from '../../main.js';

let options = {
  baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_BASEURL,
  timeout: 30000,
  headers: {}
}
const instance = axios.create(options);

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.params || (config.params = {})
  if(config.data && config.data.hasOwnProperty('needRemoveMask')){
    if(!config.data.needRemoveMask) vm.$loading.show();
    config.data = config.data.data
    // 无遮罩层的请求添加一个名为temptime的时间戳
    config.params.temptime = new Date().getTime()
  }else{
    // 有遮罩层的请求添加一个名为timestamp的时间戳
    config.params.timestamp = new Date().getTime()
    vm.$store.commit('setHttpsNumber',vm.$store.state.httpsNumber + 1)
    vm.$loading.show();
  }
  // 请求头里添加sessionId
  if(sessionStorage.sessionId){
    config.headers || (config.headers = {})
    config.headers.sessionid = sessionStorage.sessionId
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response.config.params.timestamp && vm.$store.commit('setHttpsNumber',vm.$store.state.httpsNumber - 1)
  vm.$store.state.httpsNumber === 0 && vm.$loading.remove();
  if(response.status === 200) {
    response.data.result && response.data.result === 'fail' && vm.$notify({ type: 'warning', message: response.data.msg });
    return response.data;
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  error.config.params.timestamp && vm.$store.commit('setHttpsNumber',vm.$store.state.httpsNumber - 1)
  vm.$store.state.httpsNumber === 0 && vm.$loading.remove();
  if(error.message === 'Network Error'){
    vm.$notify({ type: 'warning', message: '当前网络信号弱,请移步至信号良好区域!' });
    return error
  }else{
    return Promise.reject(error);
  }
});

export default instance;
