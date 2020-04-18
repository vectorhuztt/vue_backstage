<template>
    <el-form
        :model="formData.formFields"
        :rules="formRules"
        ref="form"
        :label-width="formWidth"
        :class="formClass"
    >
        <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-for="item in formData.itemData"
            :key="item.label"
        >
            <template slot-scope="scope">
                <template v-if="item.type === 'text'">
                    <el-input
                        v-model="formData.formFields[item.name]"
                        :disabled="item.disable"
                    >
                    </el-input>
                </template>

                <template v-if="item.type === 'select'">
                    <el-select
                        v-if="item.type === 'select'"
                        v-model="formData.formFields[item.name]"
                        :placeholder="item.placeholder"
                    >
                        <el-option
                            v-for="(childItem, childIndex) in item.listData"
                            :key="childIndex"
                            :label="childItem.key"
                            :value="childItem.value"
                        />
                    </el-select>
                </template>

                <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="formData.formFields[item.name]"
                    :type="item.dateType"
                    :picker-options="item.TimePickerOptions"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                />
                <template v-if="item.type === 'slot'">
                    <slot :name="item.name"></slot>
                </template>
            </template>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'DialogTab',
    props: {
        formData: {
            type: Object,
        },
        formRules: {
            type: Object,
        },
        formWidth: {
            default: '80px',
            type: String,
        },
        formClass: {
            default: 'demo-ruleForm',
            type: String,
        },
    },
};
</script>

<style lang="less" scoped></style>
