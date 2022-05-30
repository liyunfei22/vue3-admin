<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="flex-shrink-0 h-60px w-screen bg-sky-600">
      <div class="flex px-2 h-full md:px-6">
        <div></div>
        <div class="h-full text-white text-xl leading-60px">hello admin</div>
        <div></div>
      </div>
    </div>
    <div class="flex flex-1">
      <div class="w-200px dark:bg-slate-900">
        <Menu></Menu>
      </div>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/menu.vue';
</script>

<style lang="scss" scoped></style>
