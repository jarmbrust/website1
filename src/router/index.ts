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
      title: 'James Armbrust - Blog',
    }
  },
  {
    path: '/resume',
    component: () => import('@/views/ResumeView.vue'),
    meta: {
      title: 'James Armbrust - Resume',
    }
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'James Armbrust - About',
    }
  },
  {
    path: '/login',
    component: () => import('@/components/login/UserPage.vue'),
    meta: {
      title: 'James Armbrust - Login',
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'James Armbrust';
  next();
});

export default router;
