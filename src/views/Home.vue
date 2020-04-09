<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="logo">
                <img src="~assets/img/logo.png" alt />
                <span class="title">电商后台管理系统</span>
            </div>
            <div>
                <el-button type="info" @click="logout">退出</el-button>//
            </div>
        </el-header>
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside width="200px">
                <!-- 一级菜单区域 -->
                <el-menu background-color="#353744" text-color="#fff" active-text-color="#409eef">
                    <el-submenu :index="`${item.id}`" v-for="item in labelList" :key="item.id">
                        <template slot="title">
                            <!-- 一级菜单图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 一级菜单标题 -->
                            <span>{{item.label_name}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="`${subItem.id}`" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">{{subItem.label_name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>MAIN</el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getLabelData } from "network/api_url.js";
export default {
    name: "Home",
    data() {
        return {
            labelList: []
        };
    },
    created() {
        this.getLabelList();
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        getLabelList() {
            getLabelData().then(res => {
                if (res.data.code != 200) return res.data.msg;
                this.labelList = res.data.data;
                console.log(res.data);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.logo {
    color: #fff;
    font-size: 1.2rem;
    img {
        height: 60px;
        width: 70px;
        vertical-align: middle;
    }
    .title {
        margin-left: 10px;
    }
}
.home-container {
    height: 100%;
}
.el-menu {
    border-right: 1px;
    padding: 0;
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #353b48;
    padding-left: 0;
}
.el-aside {
    background-color: #353744;
}
.el-main {
    background-color: #f1f2f6;
}
</style>
