import { request } from './request';
import qs from 'qs';
// 登录
export function getLoginData(params) {
    return request({
        method: 'post',
        url: 'login/',
        data: qs.stringify(params),
    });
}

// 获取标签列表
export function getLabelData(params) {
    return request({
        method: 'get',
        url: 'label/',
        params,
    });
}

export function getUsersData(params) {
    return request({
        method: 'get',
        url: 'users/',
        params,
    });
}

export function getUserTypes() {
    return request({
        method: 'get',
        url: 'types/',
    });
}

export function addUserData(params) {
    return request({
        method: 'post',
        url: 'register/',
        data: qs.stringify(params),
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
        params,
    });
}

export function DeleteUser(params) {
    return request({
        method: 'delete',
        url: 'user-action/',
        params,
    });
}
