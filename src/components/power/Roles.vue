<template>
    <div>
        <breadcrumb>
            <span slot="first-title">权限管理</span>
            <span slot="second-title">角色列表</span>
        </breadcrumb>
        <el-card>
            <el-button type="primary" @click="addRoleDialog = true"
                >添加角色</el-button
            >
            <!-- 角色列表 -->
            <re-table
                :dataList="roleList"
                :tableInfo="RoleTableInfo"
                :hasExpand="has_expand"
            >
                <template slot-scope="expand" slot="expand">
                    <div class="row">
                        <el-row
                            :class="[
                                'bd_bottom',
                                index === 0 ? 'bd_top' : '',
                                'vcenter',
                            ]"
                            v-for="(first_item, index) in expand.data.children"
                            :key="first_item.id"
                            class="vcenter"
                        >
                            <el-col :span="5">
                                <el-tag
                                    type="primary"
                                    closable
                                    @close="
                                        removeLabelById(
                                            expand.data,
                                            first_item.id
                                        )
                                    "
                                >
                                    {{ first_item.label_name }}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row
                                    :class="[
                                        index2 === 0 ? '' : 'bd_top',
                                        'vcenter',
                                    ]"
                                    v-for="(second_item,
                                    index2) in first_item.children"
                                    :key="second_item.id"
                                >
                                    <el-col :span="6">
                                        <el-tag
                                            type="success"
                                            closable
                                            @close="
                                                removeLabelById(
                                                    expand.data,
                                                    second_item.id
                                                )
                                            "
                                            >{{
                                                second_item.label_name
                                            }}</el-tag
                                        >
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag
                                            type="warning"
                                            v-for="(third_item,
                                            index3) in second_item.children"
                                            :key="third_item.id"
                                            closable
                                            @close="
                                                removeLabelById(
                                                    expand.data,
                                                    third_item.id
                                                )
                                            "
                                        >
                                            {{ third_item.label_name }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <template slot-scope="role" slot="action">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="showUpdateDialog(role.data.id)"
                        >修改</el-button
                    >
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="removeRoleById(role.data.id)"
                        >删除</el-button
                    >
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
                            @click="showSetPower(role)"
                            >分配权限</el-button
                        >
                    </el-tooltip>
                </template>
            </re-table>
            <!-- 分配权限面板 -->
            <re-dialog
                :title="`分配权限`"
                :isShow="powerDialog"
                @dialog-cancel="setPowerDialogClosed"
                @dialog-confirm="setRolePower"
            >
                <el-tree
                    slot="content"
                    :data="labelTreeList"
                    :props="treeProps"
                    node-key="id"
                    show-checkbox
                    default-expand-all
                    ref="treeRef"
                    :default-checked-keys="defalutKeys"
                ></el-tree>
            </re-dialog>
            <re-dialog
                :title="`添加角色`"
                :isShow="addRoleDialog"
                @dialog-cancel="cancelAddRoleDialog"
                @dialog-confirm="addRole"
            >
                <re-form
                    slot="content"
                    :formData="addFormInfo"
                    :formRules="formRules"
                    ref="addFormRef"
                ></re-form>
            </re-dialog>

            <re-dialog
                :title="`修改角色`"
                :isShow="updateRoleDialog"
                @dialog-cancel="cancelUpdateRoleDialog"
                @dialog-confirm="changeRoleInfo"
            >
                <re-form
                    slot="content"
                    :formData="updateFormInfo"
                    :formRules="formRules"
                    ref="updateFormRef"
                ></re-form>
            </re-dialog>
        </el-card>
    </div>
</template>

<script>
import {
    getRolesList,
    removeRoleLabel,
    getLabelData,
    updateRoleLabel,
    createRole,
    updateRole,
    deleteRole,
    getRoleDetail,
} from 'network/api_url.js';
import Breadcrumb from '../common/Breadcrumb';
import ReForm from '../common/ReForm';
import ReTable from '../common/ReTable';
import ReDialog from '../common/ReDialog';
export default {
    name: 'Role',
    data() {
        return {
            loading: true,
            has_expand: true,
            roleId: '',
            roleList: [],
            labelTreeList: [],
            // 默认选中的节点
            defalutKeys: [],
            powerDialog: false,
            addRoleDialog: false,
            updateRoleDialog: false,
            RoleTableInfo: [
                { title: '角色名称', prop: 'role_name' },
                { title: '角色描述', prop: 'role_desc' },
                { title: '操作', slot: true, name: 'action' },
            ],
            treeProps: {
                children: 'children',
                label: 'label_name',
            },
            formRules: {
                role_name: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur',
                    },
                    { min: 3, max: 15, message: '角色名长度在3-15之间' },
                ],
                role_desc: [
                    {
                        required: true,
                        message: '请输入角色描述',
                        trigger: 'blur',
                    },
                    { min: 3, max: 256, message: '角色名长度在3-256之间' },
                ],
            },
            addFormInfo: {
                formFields: {
                    role_name: '',
                    role_desc: '',
                },
                itemData: [
                    {
                        label: '角色名称',
                        prop: 'role_name',
                        name: 'role_name',
                        type: 'text',
                    },
                    {
                        label: '角色描述',
                        prop: 'role_desc',
                        name: 'role_desc',
                        type: 'textarea',
                    },
                ],
            },
            updateFormInfo: {
                formFields: {},
                itemData: [
                    {
                        label: '角色名称',
                        prop: 'role_name',
                        name: 'role_name',
                        type: 'text',
                    },
                    {
                        label: '角色描述',
                        prop: 'role_desc',
                        name: 'role_desc',
                        type: 'textarea',
                    },
                ],
            },
        };
    },
    created() {
        this.getRoleData();
    },
    methods: {
        getRoleData() {
            getRolesList().then((res) => {
                if (res.data.code !== 200) {
                    console.log(res.data);
                    return this.$message.error(res.data.msg);
                }
                this.roleList = res.data.data;
            });
        },
        removeLabelById(role, label_id) {
            const parmas = {
                role_id: role.id,
                label_id,
            };
            console.log(parmas);
            this.$confirm('此操作将删除该角色已拥有的权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(
                (success) => {
                    removeRoleLabel(parmas).then((res) => {
                        console.log(res.data);
                        if (res.data.code !== 200) {
                            return this.$message.error(res.data.msg);
                        }
                        role.children = res.data.data;
                        this.$message.success(res.data.msg);
                    });
                },
                (error) => {
                    this.$message.info('您已取消删除权限');
                }
            );
        },
        showSetPower(role) {
            this.roleId = role.data.id;
            console.log(this.roleId);
            getLabelData().then((res) => {
                if (res.data.code != 200) {
                    return this.$message.error(res.data.msg);
                }
                this.labelTreeList = res.data.data;
                this.powerDialog = true;
                this.getRoledefKeys(role.data, this.defalutKeys);
            });
        },
        getRoledefKeys(node, arr) {
            if (node.label_level == 2) {
                arr.push(node.id);
            }
            if (node.children) {
                node.children.forEach((item) => {
                    this.getRoledefKeys(item, arr);
                });
            }
        },
        setPowerDialogClosed() {
            this.defalutKeys = [];
            this.powerDialog = false;
        },
        setRolePower() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys(),
            ];
            const idStr = keys.join(',');
            const params = {
                role_id: this.roleId,
                label_ids: idStr,
            };
            updateRoleLabel(params).then((res) => {
                if (res.data.code !== 200) {
                    return this.$message.error(res.data.msg);
                }
                this.getRoleData();
                this.setPowerDialogClosed();
                this.powerDialog = false;
                return this.$message.success(res.data.msg);
            });
        },
        cancelAddRoleDialog() {
            this.addRoleDialog = false;
            this.$refs.addFormRef.$refs.form.resetFields();
        },
        cancelUpdateRoleDialog() {
            this.updateRoleDialog = false;
            this.$refs.updateFormRef.$refs.form.resetFields();
        },

        addRole() {
            createRole(this.addFormInfo.formFields).then((res) => {
                if (res.data.code != 200) {
                    return this.$message.error(res.data.msg);
                }
                this.cancelAddRoleDialog();
                this.getRoleData();
                return this.$message.success(res.data.msg);
            });
        },
        removeRoleById(role_id) {
            const params = { role_id };
            this.$confirm('此操作将永久删除此角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(
                (res) => {
                    deleteRole(params).then((res) => {
                        if (res.data.code !== 200) {
                            return this.$message.error(res.data.msg);
                        }
                        this.getRoleData();
                        return this.$message.success(res.data.msg);
                    });
                },
                (error) => this.$message.info('已取消删除角色')
            );
        },
        showUpdateDialog(id) {
            const params = { id };
            getRoleDetail(params).then((res) => {
                if (res.data.code !== 200) {
                    return this.$message.error(res.data.msg);
                }
                this.updateRoleDialog = true;
                this.updateFormInfo.formFields = res.data.data;
            });
        },
        changeRoleInfo() {
            updateRole(this.updateFormInfo.formFields).then((res) => {
                if (res.data.code !== 200) {
                    return this.$message.error(res.data.msg);
                }
                this.cancelUpdateRoleDialog();
                this.getRoleData();
                return this.$message.success(res.data.msg);
            });
        },
    },
    components: {
        Breadcrumb,
        ReTable,
        ReDialog,
        ReForm,
    },
};
</script>

<style lang="less" scoped>
.row {
    margin-top: 2px;
}
.el-tag {
    margin: 7px;
}
.bd_bottom {
    border-bottom: 1px solid #eee;
}
.bd_top {
    border-top: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>
