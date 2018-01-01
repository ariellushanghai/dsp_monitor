import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutations_types'
import {loginURL, baseURL} from '@/conf/env'

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';


axios.interceptors.request.use(
  config => {
    // console.log('request.config: ', config);
    return config;
  },
  err => {
    console.error('request.err: ', err);
  }
);

axios.interceptors.response.use(
  res => {
    // console.log('response: ', res);
    if(Number(res.status) === 200) {
      if(res.data && Number(res.data.err) === 0) {
        return res.data.data;
      }
    }

  },
  err => {
    console.error('response.err: ', err);
  }
);

export {axios as default}
