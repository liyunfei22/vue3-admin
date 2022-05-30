<template>
  <p>{{ title }}</p>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @submit="submit"
    @finish="handleFinish"
    @finish-failed="handleFinishFailed"
  >
    <a-form-item has-feedback label="名称" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="父级分类">
      <a-select v-model:value="formState.parent_id" placeholder="选择父级类别">
        <a-select-option :value="0">顶级分类</a-select-option>
        <a-select-option v-for="item in CategoryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="排序">
      <a-input-number v-model:value="formState.sort" />
    </a-form-item>
    <a-form-item label="是否展示">
      <a-radio-group v-model:value="formState.is_show">
        <a-radio :value="true">展示</a-radio>
        <a-radio :value="false">不展示</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="备注">
      <a-textarea v-model:value="formState.remark" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">新增</a-button>
      <a-button class="ml-4" @click="cancel">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { addCategory, getAllCategory } from '@/api/modules/goods';

interface Category {
  id?: number;
  name: string;
  parent_id: number;
  is_show: boolean;
  sort: number;
  remark: string;
}
defineProps<{
  title: string;
}>();
const emit = defineEmits<{
  (e: 'cancel'): void;
}>();
const formState: UnwrapRef<Category> = reactive({
  name: '',
  parent_id: 0,
  is_show: true,
  sort: 0,
  remark: '',
});
const formRef = ref<FormInstance>();
const CategoryList = ref<Category[]>([]);
const resetForm = () => {
  formRef.value?.resetFields();
};
const labelCol = { style: { width: '100px' } };
const wrapperCol = { span: 14 };
const checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('请填写分类名称'));
  }
  return Promise.resolve();
};
const rules: {
  [key: string]: Rule[];
} = {
  name: [{ required: true, validator: checkName, trigger: 'change' }],
};
const getCategory = async () => {
  const res = await getAllCategory<Category[]>();
  if (res.code === 0) {
    CategoryList.value = res.data || [];
  }
  console.log(res);
};
// 提交表单且数据验证成功后回调事件
const handleFinish = async (values: Category) => {
  console.log('handleFinish', values);
  const res = await addCategory(formState);
  if (res.code === 0) {
    resetForm();
    getCategory();
  }
  console.log(res);
};
// 提交表单且数据验证失败后回调事件
const handleFinishFailed = () => {
  console.log('验证失败');
};
// 数据验证成功后回调事件
const submit = (e: Event) => {
  console.log('submit', e);
};
// 取消
const cancel = () => {
  resetForm();
  emit('cancel');
};
onMounted(() => {
  getCategory();
});
defineExpose({
  resetForm,
});
</script>
<script lang="ts">
export default {
  name: 'AddCat',
};
</script>
<style scoped lang="scss"></style>
