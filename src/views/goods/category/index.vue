<template>
  <div class="flex p-4">
    <a-button class="mr-4" type="primary" @click="openDrawer">增加</a-button>
    <a-button class="mr-4" type="primary" @click="refresh">刷新</a-button>
  </div>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    title="增加品类"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <AddCal ref="addCalCom" title="增加品类" @cancel="visible = false" />
  </a-drawer>
  <a-table
    :loading="loading"
    :columns="columns"
    :pagination="pagination"
    :data-source="data"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>删除</a> |
          <a>编辑</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TableProps } from 'ant-design-vue';
import AddCal from './components/AddCat.vue';
import { getCategory } from '@/api/modules/goods';

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  {
    title: '品类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '父级分类',
    dataIndex: 'parent_id',
    key: 'parent_id',
  },
  {
    title: '是否展示',
    dataIndex: 'is_show',
    key: 'is_show',
  },
  {
    title: '排序',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    key: 'action',
  },
];
interface Category {
  id: number;
  name: string;
  parent_id: number;
  is_show: boolean;
  sort: number;
  remark: string;
}
interface Res {
  rows: Category[];
  total: number;
}
const visible = ref(false);
const loading = ref(false);
const pagination = ref({
  current: 1,
  pageSize: 4,
  total: 0,
});
const data = ref<Category[]>([]);
const addCalCom = ref<InstanceType<typeof AddCal> | null>(null);

async function getCategoryList(page: number, pageSize: number) {
  loading.value = true;
  try {
    const res = await getCategory<Res>({
      page,
      pageSize,
    });
    if (res.code === 0) {
      data.value = res?.data?.rows ?? [];
      pagination.value.total = res?.data?.total ?? 0;
      pagination.value.current = page;
    }
    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
}

onMounted(() => {
  getCategoryList(pagination.value.current, pagination.value.pageSize);
});
function afterVisibleChange() {
  addCalCom?.value?.resetForm();
}
function openDrawer() {
  visible.value = true;
}
const handleTableChange: TableProps['onChange'] = (pag) => {
  getCategoryList(pag.current as number, pag.pageSize as number);
};
const refresh = () => {
  getCategoryList(pagination.value.current, pagination.value.pageSize);
};
</script>
