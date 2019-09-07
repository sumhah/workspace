import axios from 'axios';
import {server} from '../config/api';
import {encrypt, filterNullParams, filterNullData, errorRetry} from './middleware';

axios.defaults.baseURL = server;
axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
}
axios.defaults.timeout = 3000;
axios.defaults.retry = 1;
axios.defaults.retryDelay = 1000;

axios.interceptors.request.use(filterNullParams)
axios.interceptors.request.use(filterNullData)
axios.interceptors.request.use(encrypt)
axios.interceptors.response.use(undefined, errorRetry)

export function request({url, method = 'get', params = {}, data = {}, options = {}}){
    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            params,
            data,
            ...options,
        }).then((res) => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export function get(url, params, options) {
    return request.call(this, {
        url,
        method: 'get',
        params,
        options,
    })
}

export function post(url, data, options) {
    return request.call(this, {
        url,
        method: 'post',
        data,
        options,
    })
}

export function deleteApi(url, data, options) {
    return request.call(this, {
        url,
        method: 'delete',
        data,
        options,
    })
}

export function put(url, data, options) {
    return request.call(this, {
        url,
        method: 'put',
        data,
        options,
    })
}
