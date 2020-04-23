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

export function getRolesList() {
    return request({
        method: 'get',
        url: 'roles/',
    });
}

export function removeRoleLabel(params) {
    return request({
        method: 'post',
        url: 'roles/remove-label/',
        data: qs.stringify(params)
    });
}

export function updateRoleLabel(params) {
    return request({
        method: 'post',
        url: 'roles/update-label/',
        data: qs.stringify(params)
    });
}

export function createRole(params) {
    return request({
        method: 'post',
        url: 'roles/create-role/',
        data: qs.stringify(params)
    });
}

export function updateRole(params) {
    return request({
        method: 'post',
        url: 'roles/update-role/',
        data: qs.stringify(params)
    });
}

export function deleteRole(params) {
    return request({
        method: 'post',
        url: 'roles/delete-role/',
        data: qs.stringify(params)
    })
}

export function getRoleDetail(params) {
    return request({
        method: 'get',
        url: 'roles/detail/',
        params
    })
}