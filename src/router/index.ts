import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import GameInfo from '@/views/GameInfo.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/gameInfo', name: 'GameInfo', component: GameInfo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
