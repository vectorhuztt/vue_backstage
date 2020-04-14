import { request } from './request';
import qs from 'qs';
export function getLoginData(params) {
    return request({
        method: 'post',
        url: 'login/',
        data: qs.stringify(params)
    });
}

export function getLabelData() {
    return request({
        method: 'get',
        url: 'label/'
    });
}

export function getUsersData(params) {
    return request({
        method: 'get',
        url: 'users/',
        params
    });
}

export function getUserTypes() {
    return request({
        method: 'get',
        url: 'types/'
    });
}

export function addUserData(params) {
    return request({
        method: 'post',
        url: 'register/',
        data: qs.stringify(params)
    });
}

export function getUserInfo(params) {
    return request({
        method: 'get',
        url: `user-action/`,
        params,
    });
}

export function UpdateUserInfo(params) {
    return request({
        method: 'put',
        url: 'user-action/',
        params
    });
}

export function DeleteUser(params) {
    return request({
        method: 'delete',
        url: 'user-action/',
        params
    });
}