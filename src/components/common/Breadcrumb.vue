<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcom' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="first-title"></slot>
        </el-breadcrumb-item>
        <el-breadcrumb-item >
            <slot name="second-title"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'Breadcrumb'
};
</script>

<style lang="less" scoped></style>
