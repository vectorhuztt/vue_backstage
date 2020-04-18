<template>
    <el-table :data="dataList" :border="tableBoder" :style="tableStyle">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.title"
            v-for="(item, index) in tableInfo"
        >
            <template slot-scope="scope">
                <template v-if="!item.slot">
                    <span>{{ scope.row[item.prop] }}</span>
                </template>
                <template v-else>
                    <slot :name="item.name" :data="scope.row"></slot>
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'ReTable',
    props: {
        dataList: {
            type: Array
        },
        tableInfo: {
            type: Array
        },
        tableBoder: {
            default: true,
            type: Boolean
        },
        tableStyle: {
            default: 'width: 100%',
            type: String
        }
    }
};
</script>

<style lang="less" scoped></style>
