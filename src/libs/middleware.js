import {filterNullValue} from './util';
import axios from 'axios';
import md5 from 'md5';
import {getToken} from './token';

export function errorRetry(e) {
    if (e.code !== 'ECONNABORTED') {
        return Promise.reject(e);
    }
    const config = e.config;
    if (!config || !config.retry) {
        return Promise.reject(e);
    }
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        return Promise.reject(e);
    }
    config.__retryCount += 1;
    const backOff = new Promise(resolve => setTimeout(() => resolve(), config.retryDelay || 1));
    return backOff.then(() => axios(config));
}

export function filterNullParams(config) {
    config.params = filterNullValue(config.params);
    return config;
}

export function filterNullData(config) {
    config.data = filterNullValue(config.data);
    return config;
}

export function encrypt(config) {
    const params = config.params;
    params.r = md5(Math.random());
    const sortParams = Object.keys(params).sort();
    const secret = '02b7895284cf572dccaee935da7943ff';
    const value = `${sortParams.map(key => params[key]).join(':')}:${secret}`;
    const base64 = window.btoa(value);
    params.s = md5(base64);

    // console.log('value', value);
    // console.log('base64', base64);
    // console.log('s', params.s);

    console.log(config);
    config.headers.Authorization =  `Bearer ${getToken()}`;
    return config;
}
