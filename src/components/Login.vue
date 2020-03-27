<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar-box">
                <img src="~assets/logo.png" alt="" />
            </div>
            <el-form
                label-width="80px"
                class="login-form"
                :model="loginForm"
                :rules="loginRules"
                ref="loginFormRef"
            >
                <el-form-item label="用户名称 " prop="username">
                    <el-input
                        suffix-icon="el-icon-user-solid"
                        v-model="loginForm.username"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户密码 " prop="password">
                    <el-input
                        suffix-icon="iconfont el-icon-lock"
                        type="password"
                        v-model="loginForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getLoginData } from 'network/login';
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在2 到10个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入用户密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: '长度在6到20个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(valid => {
                if (!valid) return;
                getLoginData(this.loginForm)
                    .then(res => {
                        console.log(res);
                        if (res.data.meta.status !== 200) {
                            this.$message.error("登录信息有误")
                        }else {
                            window.sessionStorage.setItem('token', res.data.meta.token)
                            this.$message.success("登录成功")
                            this.$router.push('/home')
                        }
                    })
                    .catch(error => console.log(error));
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login-container {
    background-color: #3c6382;
    height: 100%;
}
.login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar-box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0px 0px 5px #ddd;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.login-form {
    position: absolute;
    left: 5%;
    right: 10%;
    bottom: 10%;
}
</style>
