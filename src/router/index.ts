import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/blog',
    component: () => import('@/views/BlogView.vue'),
    meta: {
      redirectOnRefresh: '/'
    }
  },
  {
    path: '/resume',
    component: () => import('@/views/ResumeView.vue'),
    meta: {
      redirectOnRefresh: '/'
    }
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      redirectOnRefresh: '/'
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
