import { request } from './request'; 
import qs from 'qs'
export function getLoginData(params) {
    return request({
        method: 'post',
        url: 'login/',
        data: qs.stringify(params)
    });
}
