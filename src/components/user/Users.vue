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
                        v-model="query_info.query"
                        clearable
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUsers(query_info)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialog = true"
                        >添加用户</el-button
                    >
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
                            v-model="scope.row.is_active"
                            @change="changeStatus(scope.row)"
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
                            @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            circle
                            @click="removeUser(scope.row.id)"
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
                <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    label-width="80px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="用户角色" prop="user_type">
                        <el-select
                            v-model="addForm.user_type"
                            placeholder="请选择用户类别"
                        >
                            <el-option
                                :label="item.type_name"
                                :value="item.id"
                                v-for="item in user_types"
                                :key="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="userphone">
                        <el-input v-model="addForm.userphone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="user_email">
                        <el-input v-model="addForm.user_email"></el-input>
                    </el-form-item>
                </el-form>
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
                <el-form
                    :model="editForm"
                    :rules="addFormRules"
                    status-icon
                    ref="editFormRef"
                    label-width="80px"
                >
                    <el-form-item label="用户名">
                        <el-input
                            type="text"
                            v-model="editForm.username"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="userphone">
                        <el-input
                            type="text"
                            v-model="editForm.userphone"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="user_email">
                        <el-input
                            type="text"
                            v-model="editForm.user_email"
                        ></el-input>
                    </el-form-item>
                </el-form>
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
import { checkPhone, checkEmail } from '@/validator/validators';

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
            // 控制添加用户对话框是否显示与隐藏
            addDialog: false,
            // 控制修改用户对话框是否显示与隐藏
            editDialog: false,
            // 添加用户的表单数据
            addForm: {
                username: '',
                user_type: '',
                password: '',
                userphone: '',
                user_email: ''
            },
            // 修改用户的表单数据
            editForm: {},
            // 添加表单验证规则对象
            addFormRules: {
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
                    { validator: checkPhone, trigger: 'blur' }
                ],
                user_email: [{ validator: checkEmail, trigger: 'blur' }],
                user_type: [{ required: true, message: '请选择用户角色' }]
            }
        };
    },
    created() {
        this.getUserList();
        this.getUserTypeList();
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
            this.getUserList(this.query_info);
        },
        // 处理当前所处页数
        handleCurrentChange(current_page) {
            this.query_info.page = current_page;
            this.getUserList(this.query_info);
        },
        // 更改用户状态
        changeStatus(user_info) {
            let params = {
                pk: user_info.id,
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
            this.$refs.addFormRef.resetFields();
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 添加用户
        addUser() {
            this.$refs.addFormRef.validate(valid => {
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
                this.editForm = res.data.data;
            });
        },
        // 更改用户信息
        updateUserData() {
            const params = {
                id: this.editForm.id,
                userphone: this.editForm.userphone,
                user_email: this.editForm.user_email
            };
            this.$refs.editFormRef.validate(valid => {
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
                            this.getUserList()
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
