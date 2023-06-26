import axios from 'axios'
import Vue from 'vue'

const service = axios.create({
  // withCredentials: true,
  // baseURL: 'http://47.56.168.26:8181/',
  baseURL: 'https://www.xaapt.com/',
  // baseURL: process.env.baseUrl + '/',
  timeout: 30000,
});


const ERROR = [
    {statusCode: 403, message: "forbidden"},
    {statusCode: 404, message: "not found"},
    {statusCode: 500, message: "server error"}
];

function handleError(error) {
  if (axios.isCancel(error)) { // 如果是用户主动取消的
    console.log(error.message);
    return;
  }
  if (error.response) { // 服务器错误
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    let tip = ERROR.find(item => item.statusCode === error.response.status);
    if (tip) {


      if (process.client) {
        Vue.notify({
          type: 'error',
          group: 'tip',
          duration: 4000,
          title: 'Error message',
          text: tip.message
        });
      }
    } else {
      if (process.client) {
        Vue.notify({
          type: 'error',
          group: 'tip',
          duration: 2000,
          title: 'Error message',
          text: error.data.message || 'Request exception'
        });
      }
    }
  } else if (error.request) { // 客户端错误
    if (error.data) {
      if (process.client) {
        Vue.notify({
          type: 'error',
          group: 'tip',
          duration: 2000,
          title: 'Error message',
          text: error.data.message || 'Request exception'
        });
      }
    } else {
      if (process.client) {
        Vue.notify({
          type: 'error',
          group: 'tip',
          duration: 2000,
          title: 'Error message',
          text: error
        });
      }
    }
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
  }
}

export default {
  request: params => {
    if (!params || Object.prototype.toString.call(params) !== "[object Object]") {
      throw new Error("params is undefined or not an object");
    }

    return new Promise((resolve, reject) => {
      service.request(params).then(res => {
        if (res.status === 200 && res.data.status && res.data.status.toString() === '1') {
          resolve(res.data.data);
        } else {
          handleError(res);
          reject(res);
        }
      }).catch(error => {
        handleError(error);
        reject(error);
      });
    });
  },
  getConfig: (method, url, data, config) => {
    const params = {
      url: url,
      method: method,
    };
    if (method === 'get') {
      data && (params.params = data);
    } else {
      if (data) {
        params.data = data;
      } else {
        params.data = {};
      }
    }
    config && Object.assign(params, config);
    return params;
  },
  get(url, data, config) {
    const params = this.getConfig('get', url, data, config);
    return this.request(params);
  },
  post(url, data, config) {
    const params = this.getConfig('post', url, data, config);
    return this.request(params);
  },
  put(url, data, config) {
    const params = this.getConfig('put', url, data, config);
    return this.request(params);
  },
  delete(url, data, config) {
    const params = this.getConfig('delete', url, data, config);
    return this.request(params);
  }
}
