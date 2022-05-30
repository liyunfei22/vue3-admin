// 需要鉴权的业务路由
import type { RouteRecordRaw } from 'vue-router';

const LAYOUT = import('@/layout/index.vue');

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/goods',
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      title: '用户管理',
      hideChildrenInMenu: true,
      icon: '',
    },
    component: LAYOUT,
    redirect: '/users/add',
    children: [
      {
        path: 'add',
        name: 'usersAdd',
        meta: {
          title: '添加用户',
        },
        component: () => import('@/views/users/index.vue'),
      },
    ],
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: '',
    },
    redirect: '/goods/add',
    component: LAYOUT,
    children: [
      {
        path: 'category',
        name: 'goodsCategory',
        meta: {
          title: '商品分类',
        },
        component: () => import('@/views/goods/category/index.vue'),
      },
      {
        path: 'add',
        name: 'goodsAdd',
        meta: {
          title: '添加商品',
        },
        component: () => import('@/views/goods/index.vue'),
      },
    ],
  },
];

export default asyncRoutes;
