import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutations_types'
import {loginURL, redirectURL, baseURL} from '@/conf/env'

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';


axios.interceptors.request.use(
  config => {
    config.validateStatus = function (status) {
      console.log(`status: ${status}`);
      return Number(status) === 200;
    };
    console.log('request.config: ', config);
    return config;
  },
  err => {
    console.error('request.err: ', err);
  }
);

axios.interceptors.response.use(
  res => {
    console.log('response: ', res);
    if (Number(res.status) === 200) {
      if (res.data && Number(res.data.err) === 0) {
        // console.log('res: ',res);
        return res.data.data;
      } else if (Number(res.data.err) === 401) {
        console.log('未登陆', res);
        console.log(location.href.replace(location.search, ''));
        console.log(loginURL + location.href);
        debugger;
        location.replace(loginURL + encodeURIComponent(location.href));
        return Promise.reject(res);
      } else {
        return Promise.reject(res);
      }
    } else {
      console.log('response: ', res);
      return Promise.reject(res);
    }

  },
  err => {
    console.error('response.err: ', err);
    return Promise.reject(err);
  }
);

export {axios as default}
