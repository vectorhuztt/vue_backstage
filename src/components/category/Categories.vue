<template>
    <div class="categories">
        <breadcrumb>
            <span slot="first-title">商品管理</span>
            <span slot="second-title">商品分类</span>
        </breadcrumb>
        <el-card>
            <el-button type="primary" @click="showDialog = true"
                >添加分类</el-button
            >
            <re-dialog
                :title="`添加分类`"
                :isShow="showDialog"
                @dialog-cancel="dialgCancel"
            ></re-dialog>
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from '../common/Breadcrumb';
import ReDialog from '../common/ReDialog';

export default {
    name: 'Categories',
    data() {
        return {
            showDialog: false,
        };
    },
    components: {
        Breadcrumb,
        ReDialog,
    },
    methods: {
        dialgCancel(){
            this.showDialog = false
        }
    },
};
</script>

<style lang="less" scoped></style>
