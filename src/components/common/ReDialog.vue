<template>
    <el-dialog
        :title="title"
        :width="width"
        :visible.sync="isShow"
        :close-on-click-moal="false"
        :before-close="dialogCancel"
    >
        <slot name="content"></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'ReDialog',
    props: {
        title: {
            type: String,
        },
        width: {
            type: String,
            default: '50%',
        },
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        dialogCancel() {
            this.$emit('dialog-cancel');
        },
        dialogConfirm() {
            this.$emit('dialog-confirm');
        },
    },
};
</script>

<style lang="less" scoped></style>
