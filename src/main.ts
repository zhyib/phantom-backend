import { createApp } from 'vue';
import './styles/element/index.scss';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/mock/mock';

const app = createApp(App).use(store).use(router).use(ElementPlus);
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component);
});
app.mount('#app');
