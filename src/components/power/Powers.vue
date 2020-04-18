<template>
    <div>
        <Breadcrumb>
            <span slot="first-title">权限管理</span>
            <span slot="second-title">权限列表</span>
        </Breadcrumb>
        <el-card>
            <re-table :dataList="labelList" :tableInfo="labelTableInfo">
                <template slot="label_level" slot-scope="scope">
                    <el-tag v-if="scope.data.label_level === 0"> 一级</el-tag>
                    <el-tag type="success" v-if="scope.data.label_level === 1">
                        二级</el-tag
                    >
                    <el-tag type="warning" v-if="scope.data.label_level === 2">
                        三级</el-tag
                    >
                </template>
            </re-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query_info.page"
                :page-sizes="[5, 10, 15]"
                :page-size="query_info.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from '../common/Breadcrumb';
import { getLabelData } from 'network/api_url.js';
import ReTable from '../common/ReTable';

export default {
    name: 'Power',
    data() {
        return {
            labelList: [],
            query_info: {
                page: 1,
                size: 5,
                type: 'list'
            },
            total: 0,
            labelTableInfo: [
                { title: '权限名称', prop: 'label_name' },
                { title: '权限路径', prop: 'path' },
                {
                    title: '权限等级',
                    prop: 'label_level',
                    slot: true,
                    name: 'label_level',
                },
            ],
        };
    },
    created() {
        this.getLabelList();
    },
    components: {
        Breadcrumb,
        ReTable,
    },
    methods: {
        getLabelList() {
            getLabelData(this.query_info).then((res) => {
                if (res.data.code !== 200) {
                    return this.$message.error(res.data.msg);
                }
                this.labelList = res.data.data;
                this.total = res.data.total
            });
        },
        // 更改页面数据个数
        handleSizeChange(newSize) {
            this.query_info.size = newSize;
            this.getLabelList();
        },
        // 处理当前所处页数
        handleCurrentChange(current_page) {
            this.query_info.page = current_page;
            this.getLabelList();
        },
    },
};
</script>

<style lang="less" scoped></style>
