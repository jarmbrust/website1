import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useLoginStore } from '@/stores/loginStore';

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
    component: () => import('@/views/UserView.vue'),
    meta: {
      title: 'James Armbrust - Login',
    }
  },
  {
    path: '/logout',
    component: () => import('@/components/login/LogoutPage.vue'),
    meta: {
      requiresAuth: true,
      title: 'James Armbrust - Logout',
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const loginStore = useLoginStore();
  document.title = (to.meta.title as string) || 'James Armbrust';
  if (to.meta.requiresAuth && !loginStore.isLoggedIn()) {
    next(false);
  } else {
    next();
  }
});

export default router;
