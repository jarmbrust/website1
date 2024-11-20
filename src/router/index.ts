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
      redirectOnRefresh: '/blog'
    }
  },
  {
    path: '/resume',
    component: () => import('@/views/ResumeView.vue'),
    meta: {
      redirectOnRefresh: '/resume'
    }
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      redirectOnRefresh: '/about'
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
