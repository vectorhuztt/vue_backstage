import Axios from 'axios';
export function request(option, success, fail) {
    return new Promise((resolve, reject) => {
        // 1.创建axios的实例
        const instance = Axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 5000,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // 2. 请求拦截
        instance.interceptors.request.use(config => {
            config.headers.Authorization = window.sessionStorage.getItem('token')
            console.log(config.headers);
            return config
        })

        // 2.传入对象进行网络请求
        instance(option).then(
            res => resolve(res),
            error => reject(error)
        );
    });
}
