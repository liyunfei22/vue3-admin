// 路由
import router from '@/router/index';
// pinia
import store from '@/store';
import App from './App.vue';

import 'virtual:windi.css';
// Devtools: https://windicss.org/integrations/vite.html#design-in-devtools
// 哦，别担心最终的包，在生产中构建 virtual:windi-devtools 将是一个空模块，你不必做任何事情
import 'virtual:windi-devtools';
import '@/assets/styles/index.scss';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');
