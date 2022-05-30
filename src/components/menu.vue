<template>
  <a-menu mode="inline" theme="dark" :inline-collapsed="false" @click="handleClick">
    <template v-for="item in list" :key="item.path">
      <a-menu-item v-if="item.meta.hideChildrenInMenu" :key="item.path">
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <a-sub-menu v-else :key="item!.path">
        <template #title>{{ item.meta.title }}</template>
        <a-menu-item v-for="child in item.children" :key="child.path">{{ child!.meta!.title }}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import { useRouter, START_LOCATION } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';

console.log('START_LOCATION', START_LOCATION);
const router = useRouter();

console.log('getRoutes', router.getRoutes());

const list = router
  .getRoutes()
  .filter((item) => item.meta && item.children.length)
  .map((item) => {
    const { name, path, children, meta } = item;
    return {
      name,
      path,
      meta,
      children,
    };
  });
const handleClick: MenuProps['onClick'] = ({ key, keyPath }) => {
  console.log(key, keyPath);
  if (keyPath) {
    const path = keyPath.join('/');
    console.log(path);
    router.push({
      path,
    });
  }
};
</script>
<style lang="scss" scoped></style>
