import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/blog', component: () => import('@/views/BlogView.vue'), },
  { path: '/resume', component: () => import('@/views/ResumeView.vue'), },
  { path: '/about', component: () => import('@/views/AboutView.vue'), },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
