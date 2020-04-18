<template>
    <div>
        <breadcrumb>
            <span slot="first-title">用户管理</span>
            <span slot="second-title">用户列表</span>
        </breadcrumb>
        <!-- 卡片区域视图 -->
        <el-card>
            <!-- 搜索栏视图 -->
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-input
                        placeholder="请输入内容"
                        v-model="query_info.query"
                        clearable
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUserList"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialog = true"
                        >添加用户</el-button
                    >
                </el-col>
            </el-row>
            <re-table :dataList="userList" :tableInfo="userTableInfo">
                <template slot-scope="user" slot="is_active">
                    <el-switch
                        v-model="user.data.is_active"
                        active-color="#13ce66"
                        @change="changeStatus(user.data)"
                    >
                    </el-switch>
                </template>
                <template slot-scope="user" slot="action">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="showEditDialog(user.data.id)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="removeUser(user.data.id)"
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
            </re-table>
            <!-- 分页操作 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query_info.page"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="query_info.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
            <!-- 添加用户的对话框 -->
            <el-dialog
                title="添加用户"
                :visible.sync="addDialog"
                width="50%"
                @close="addDialogClosed"
                :close-on-click-modal="false"
            >
                <!-- 内容主题区域 -->
                <re-form
                    :formData="addFormData"
                    :formRules="formRules"
                    ref="addFormRef"
                ></re-form>
                <!--  底部按钮区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改用户对话框 -->
            <el-dialog
                title="修改用户"
                width="50%"
                @close="editDialogClosed"
                :visible.sync="editDialog"
                :close-on-click-modal="false"
            >
                <re-form
                    :formData="editFormData"
                    :formRules="formRules"
                    ref="editFormRef"
                ></re-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateUserData"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import {
    getUsersData,
    UpdateUserInfo,
    getUserTypes,
    addUserData,
    getUserInfo,
    DeleteUser
} from 'network/api_url';
import * as valid from 'utils/validators';

import Breadcrumb from '../common/Breadcrumb';
import ReTable from '../common/ReTable';
import ReForm from '../common/ReForm';

export default {
    name: 'Users',
    data() {
        var checkRePass = (rule, value, callback) => {
            setTimeout(() => {
                if (value !== this.addForm.password) {
                    callback(new Error('密码不一致，请重新输入'));
                } else {
                    return callback();
                }
            }, 500);
        };
        return {
            query_info: {
                query: '',
                page: 1,
                size: 2
            },
            total: 0,
            userList: [],
            user_types: [],
            userTableInfo: [
                { title: '姓名', prop: 'username' },
                { title: '手机', prop: 'userphone' },
                { title: '邮箱', prop: 'user_email' },
                { title: '状态', slot: true, name: 'is_active' },
                { title: '操作', slot: true, name: 'action' }
            ],
            // 控制添加用户对话框是否显示与隐藏
            addDialog: false,
            // 控制修改用户对话框是否显示与隐藏
            editDialog: false,
            // 表单验证规则
            formRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    { min: 3, max: 15, message: '用户名长度在3-15之间' }
                ],
                password: [
                    {
                        required: true,
                        message: '请设置用户密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 32,
                        message: '密码长度在6-32位之间'
                    }
                ],
                userphone: [
                    {
                        required: true,
                        message: '请输入用户手机号',
                        trigger: 'blur'
                    },
                    { min: 11, max: 11, message: '请输入11位手机号' },
                    { validator: valid.checkPhone, trigger: 'blur' }
                ],
                user_email: [{ validator: valid.checkEmail, trigger: 'blur' }],
                user_type: [{ required: true, message: '请选择用户角色' }]
            },
            // 添加用户的表单数据
            addFormData: {
                formRef: 'addFormRef',
                formFields: {
                    username: '',
                    password: '',
                    userphone: '',
                    user_email: ''
                },
                itemData: [
                    {
                        label: '用户名称',
                        prop: 'username',
                        name: 'username',
                        type: 'text',
                    },
                    {
                        label: '用户密码',
                        prop: 'password',
                        name: 'password',
                        type: 'text',
                    },
                    {
                        label: '用户手机',
                        prop: 'userphone',
                        name: 'userphone',
                        type: 'text',
                    },
                    {
                        label: '用户邮箱',
                        prop: 'user_email',
                        name: 'user_email',
                        type: 'text',
                    }
                ]
            },
            // 修改用户的表单数据
            editFormData: {
                formRef: 'editFormRef',
                formModel: {},
                itemData: [
                    {
                        label: '用户名称',
                        name: 'username',
                        type: 'text',
                        disable: true
                    },
                    {
                        label: '用户手机',
                        type: 'text',
                        prop: 'userphone',
                        name: 'userphone'
                    },
                    {
                        label: '用户邮箱',
                        type: 'text',
                        prop: 'user_email',
                        name: 'user_email'
                    }
                ]
            }
            // 添加表单验证规则对象
        };
    },
    created() {
        this.getUserList();
        this.getUserTypeList();
    },
    components: {
        Breadcrumb,
        ReTable,
        ReForm
    },
    methods: {
        // 获取用户列表
        getUserList() {
            getUsersData(this.query_info).then(res => {
                if (res.data.code != 200)
                    return this.$message.error(res.data.msg);
                this.total = res.data.total;
                this.userList = res.data.data;
            });
        },
        // 更改页面数据个数
        handleSizeChange(newSize) {
            this.query_info.size = newSize;
            this.getUserList();
        },
        // 处理当前所处页数
        handleCurrentChange(current_page) {
            this.query_info.page = current_page;
            this.getUserList();
        },
        // 更改用户状态
        changeStatus(user_info) {
            let params = {
                id: user_info.id,
                is_active: user_info.is_active ? 1 : 0
            };
            setTimeout(() => {
                UpdateUserInfo(params).then(res => {
                    if (res.data.code == 200) {
                        return this.$message.success(res.data.msg);
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
            }, 500);
        },
        // 获取用户类型列表
        getUserTypeList() {
            getUserTypes().then(res => {
                if (res.data.code != 200)
                    return this.$message.error(res.data.msg);
                this.user_types = res.data.data;
            });
        },
        // 监听添加用户对话框的关闭事件
        addDialogClosed() {
            console.log(this.$refs);
            this.$refs[this.addFormData.formRef].$refs.form.resetFields();
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs[this.editFormData.formRef].$refs.form.resetFields();
        },
        // 添加用户
        addUser() {
            this.$refs[this.addFormData.formRef].$refs.form.validate(valid => {
                if (!valid) return;
                this.addDialog = false;
                addUserData(this.addForm).then(res => {
                    setTimeout(() => {
                        if (res.data.code != '200') {
                            return this.$message.error(res.data.msg);
                        }
                        this.$message.success('添加用户成功');
                        this.addDialog = false;
                        //  重新获取用户列表
                        this.getUserList();
                    }, 500);
                });
            });
        },
        // 获取用户信息并显示更改对话框
        showEditDialog(user_id) {
            const params = { id: user_id };
            getUserInfo(params).then(res => {
                if (res.data.code != '200') {
                    return this.$message.error(res.data.msg);
                }
                this.editDialog = true;
                this.editFormData.formFields = res.data.data;
            });
        },
        // 更改用户信息
        updateUserData() {
            const params = {
                id: this.editFormData.formFields.id,
                userphone: this.editFormData.formFields.userphone,
                user_email: this.editFormData.formFields.user_email
            };
            this.$refs[this.editFormData.formRef].$refs.form.validate(valid => {
                if (!valid) return;
                UpdateUserInfo(params).then(res => {
                    setTimeout(() => {
                        if (res.data.code != '200') {
                            return this.$message.error(res.data.msg);
                        }
                        this.editDialog = false;
                        this.getUserList();
                        return this.$message.success(res.data.msg);
                    }, 500);
                });
            });
        },
        removeUser(user_id) {
            this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(
                res => {
                    setTimeout(() => {
                        DeleteUser({ id: user_id }).then(res => {
                            if (res.data.code !== 200)
                                return this.$message.error(res.data.msg);
                            this.getUserList();
                            return this.$message.success(res.data.msg);
                        });
                    }, 500);
                },
                error => this.$message.info('已取消删除用户')
            );
        }
    }
};
</script>

<style lang="less" scoped></style>
