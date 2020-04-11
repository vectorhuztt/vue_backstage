<template>
    <div id="app">
        <div class="form">
            <div class="search">
                <a-input
                    placeholder="请输入任务"
                    class="my_ipt"
                    :value="inputVal"
                    @change="handleChange"
                />
                <a-button class="btn" type="primary" @click="addInfo"
                    >添加事项</a-button
                >
            </div>
            <a-list bordered :dataSource="getList" class="dt_list">
                <a-list-item slot="renderItem" slot-scope="item">
                    <!-- 复选框 -->
                    <a-checkbox
                        :checked="item.done"
                        @change="ckChange(item.id)"
                    >
                    </a-checkbox>
                    <p v-show="!item.update">{{ item.info }}</p>
                    <a-input
                        v-show="item.update"
                        :value="item.info"
                        @change="changeInfo(item.id)"
                    ></a-input>
                    <!-- 修改内容 -->
                    <a slot="actions" :class="{'confirm': item.update}" @click="updateInfo(item.id)">{{
                        item.update  ? '确定' : '修改'
                    }}</a>
                    <!-- 删除链接 -->
                    <a slot="actions" @click="delInfo(item.id)">删除</a>
                </a-list-item>

                <!-- footer区域 -->
                <div slot="footer" class="footer">
                    <!-- 未完成的任务个数 -->
                    <span>{{ getUndoneCount }}条剩余</span>
                    <!-- 操作按钮 -->
                    <a-button-group>
                        <a-button
                            :type="btnStatu('all')"
                            @click="changeBtnStatu('all')"
                            >全部</a-button
                        >
                        <a-button
                            :type="btnStatu('undone')"
                            @click="changeBtnStatu('undone')"
                            >未完成</a-button
                        >
                        <a-button
                            :type="btnStatu('done')"
                            @click="changeBtnStatu('done')"
                            >已完成</a-button
                        >
                    </a-button-group>
                    <!-- 把已经完成的任务清空 -->
                    <a @click="clearDone">清除已完成</a>
                </div>
            </a-list>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
            id: 0
        };
    },
    computed: {
        ...mapState(['dataList', 'inputVal', 'viewKey']),
        ...mapGetters(['getUndoneCount', 'getList'])
    },
    methods: {
        handleChange(e) {
            this.$store.commit('setInputVal', e.target.value);
        },
        addInfo() {
            if (this.inputVal.trim().length <= 0) {
                return this.$message.info('文本框内容不能为空');
            } else {
                this.$store.commit('addItem');
            }
        },
        delInfo(item_id) {
            this.$store.commit('delItem', item_id);
        },
        updateInfo(item_id) {
            this.$store.commit('updateItem', item_id)
        },
        changeInfo(item_id){
             const param = {
                id: item_id,
                info: event.target.value
            };
            this.$store.commit('changeInfo', param)
        },
        ckChange(item_id) {
            console.log(item_id, event.target);
            const param = {
                id: item_id,
                done: event.target.checked
            };
            this.$store.commit('changeCkStatu', param);
        },
        clearDone() {
            this.$store.commit('clearDone');
        },
        btnStatu(key) {
            return this.viewKey === key ? 'primary' : 'default';
        },
        changeBtnStatu(key) {
            this.$store.commit('changeBtnStatu', key);
        }
    },
    created() {
        this.$store.dispatch('getList');
    }
};
</script>

<style scoped>
.form {
    width: 60%;
    margin: 100px auto;
}
.search {
    display: flex;
}

.my_ipt {
    flex: 1;
    margin-right: 2%;
}
.btn {
    width: 120px;
    font-size: 1rem;
}

.dt_list {
    width: 100%;
    margin-top: 10px;
}
.dt_list p {
    margin: 0;
    padding: 0px 10px;
}
.dt_list input {
    margin-left: 10px;
}
.confirm {
    color: #ff6b6b;
}
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
