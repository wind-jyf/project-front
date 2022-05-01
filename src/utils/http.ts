
import axios from 'axios';
import { message } from 'antd';

interface IRequestOptions {
    method: 'get' | 'post' | 'put' | 'delete',
    data?: any
}

export const http = axios.create({
    timeout: 10000,
    baseURL: 'http://localhost:3001/api/crophe',
    headers: {
        Accept: 'application/json',
    },
});

export function request(url: string, opts: IRequestOptions) {
    const { data = {}, ...extra } = opts;

    return http.request({
        url,
        ...extra,
        method: opts.method || 'get',
        params: opts.method === 'get' || opts.method == null ? data : {},
        data: opts.method === 'post' || 'put' ? data : {},
    }).then(res => {
        let result;
        const { data } = res;
        if (data.code !== 0) {
            throw new Error(data.message);
        } else {
            result = data;
        }
        return result;
    }).catch((err) => {
        message.error(err.message);
        throw (err);
    });
}