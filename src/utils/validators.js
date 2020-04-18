export const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('手机号不能为空'));
    }
    const reg = /^1[3-9]\d{9}$/;
    setTimeout(() => {
        if (reg.test(value)) {
            return callback();
        } else {
            callback(new Error('请输入正确的手机号'));
        }
    }, 500);
};

export const checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('邮箱不能为空'));
    }
    setTimeout(() => {
        const reg = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-]+)+\.([a-zA-Z0-9-.])+/;
        if (reg.test(value)) {
            return callback();
        } else {
            callback(new Error('请输入正确的邮箱'));
        }
    }, 500);
};