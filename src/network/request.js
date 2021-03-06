import axios from 'axios';

export function request(option) {
    return new Promise((resolve, reject) => {
        // 1.创建axios的实例
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 5000,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        });
        
        // 2. 请求拦截  判断请求头是否加了token
        instance.interceptors.request.use(config => {
            config.headers.Authorization = window.sessionStorage.getItem('token')
            return config
        })

        // 3.传入对象进行网络请求
        instance(option).then(
            res => resolve(res),
            error => reject(error)
        )
    })
}
