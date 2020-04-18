<template>
    <el-container class="home-container">
<<<<<<< HEAD
        <el-header>
            <div class="logo">
                <img src="~assets/img/logo.png" alt="" />
                <span class="title">电商后台管理系统</span>
            </div>
            <div class="logout">
                <el-button type="info" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="is_collspace ? '64px' : '200px'">
                <!-- 一级菜单区域 -->
                <div class="toggle-btn" @click="toggleCollspace">
                    <i
                        :class="
                            is_collspace
                                ? 'iconfont el-icon-show'
                                : 'iconfont el-icon-hide'
                        "
                    ></i>
                </div>
                <el-menu
                    background-color="#424f63"
                    text-color="#fff"
                    active-text-color="#409eef"
                    default-active="/users"
                    :unique-opened="true"
                    :collapse-transition="false"
                    :router="true"
                    :collapse="is_collspace"
                >
                    <el-submenu
                        :index="`/${item.id}`"
                        v-for="item in labelList"
                        :key="item.id"
                    >
                        <template slot="title">
                            <!-- 一级菜单图标 -->
                            <i :class="`iconfont ${item.icon_class}`"></i>
                            <!-- 一级菜单标题 -->
                            <span>{{ item.label_name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            :index="`/${subItem.path}`"
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            @click="saveNavSate(`/${subItem.path}`)"
                        >
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{
                                    subItem.label_name
                                }}</span>
=======
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
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
<<<<<<< HEAD
            <el-main>
                <router-view></router-view>
            </el-main>
=======
            <el-main>MAIN</el-main>
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
        </el-container>
    </el-container>
</template>

<script>
<<<<<<< HEAD
import { getLabelData } from 'network/api_url.js';
import { mapGetters } from 'vuex'
 
export default {
    name: 'Home',
    data() {
        return {
            labelList: [],
            is_collspace: false,
=======
import { getLabelData } from "network/api_url.js";
export default {
    name: "Home",
    data() {
        return {
            labelList: []
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
        };
    },
    created() {
        this.getLabelList();
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
<<<<<<< HEAD
            this.$router.push('/login');
=======
            this.$router.push("/login");
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
        },
        getLabelList() {
            getLabelData().then(res => {
                if (res.data.code != 200) return res.data.msg;
                this.labelList = res.data.data;
<<<<<<< HEAD
            });
        },
        toggleCollspace() {
            this.is_collspace = !this.is_collspace;
        },
        saveNavSate(path){
            this.$store.commit('saveActivePath', path)
=======
                console.log(res.data);
            });
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
        }
    }
};
</script>

<style lang="less" scoped>
<<<<<<< HEAD
.home-container {
    height: 100%;
}
=======
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

>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
<<<<<<< HEAD
    padding-left: 0;
    background: #34495d;
}
.title {
    margin-left: 10px;
    font-size: 1.3rem;
    color: #fff;
}

.logo img {
    height: 60px;
    width: 170px;
    vertical-align: middle;
}
.el-aside {
    background-color: #424f63;
}
.el-menu {
    border-right: 0px;
}

.toggle-btn {
    padding-top: 10px;
    color: #ccc;
    text-align: center;
    cursor: pointer;
}
.toggle-btn i {
    font-size: 25px;
}

.el-submenu__title i {
    margin-right: 15px;
    font-size: 20px;
=======
    background: #353b48;
    padding-left: 0;
}
.el-aside {
    background-color: #353744;
>>>>>>> ae9cd5c2742951eaf7a1c0655fa18e09f049b3bd
}
.el-main {
    background-color: #f1f2f6;
}
</style>
