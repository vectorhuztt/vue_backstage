<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcom' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域视图 -->
        <el-card>
            <!-- 搜索栏视图 -->
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-input
                        placeholder="请输入内容"
                        class="input-with-select"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList" border style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="50"
                ></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column
                    prop="userphone"
                    label="手机号"
                ></el-table-column>
                <el-table-column
                    prop="user_email"
                    label="邮箱"
                ></el-table-column>
                <el-table-column prop="user_type_name" label="角色">
                </el-table-column>
                <el-table-column prop="address" label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="!scope.row.is_delete"
                            active-color="#13ce66"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            circle
                        ></el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            circle
                        ></el-button>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="分配角色"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                icon="el-icon-setting"
                                circle
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { getUsersData } from 'network/api_url';

export default {
    name: 'Users',
    data() {
        return {
            page: 1,
            page_size: 4,
            total: 0,
            userList: []
        };
    },
    created() {
        this.getUsers(this.page, this.page_size);
    },
    methods: {
        getUsers(page, page_size) {
            getUsersData(page, page_size).then(res => {
                if (res.data.code != 200)
                    return this.$message.error('获取列表失败');
                this.total = res.data.total;
                this.userList = res.data.data;
                console.log(this.userList);
            });
        }
    }
};
</script>

<style lang="less" scoped></style>
