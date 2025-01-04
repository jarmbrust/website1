import { useLoginStore } from '@/stores/loginStore';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'James Armbrust',
      description: 'This is the home page.',
      keywords: 'home page, landing page, James Armbrust home page',
    }
  },
  {
    path: '/blog',
    component: () => import('@/views/BlogView.vue'),
    meta: {
      title: 'James Armbrust - Blog',
      description: 'This is a blog page.',
      keywords: 'blog, blogs',
    }
  },
  {
    path: '/resume',
    component: () => import('@/views/ResumeView.vue'),
    meta: {
      requiresLogin: true,
      title: 'James Armbrust - Resume',
      description: 'This is a resume page.',
      keywords: 'resume',
    }
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'James Armbrust - About',
      description: 'This my about page.',
      keywords: 'about me, about, personal information',
    }
  },
  {
    path: '/login',
    component: () => import('@/views/UserView.vue'),
    meta: {
      title: 'James Armbrust - Login',
      description: 'This is a login page.',
      keywords: 'login',
    }
  },
  {
    path: '/logout',
    component: () => import('@/components/login/LogoutPage.vue'),
    meta: {
      requiresLogin: true,
      title: 'James Armbrust - Logout',
      description: 'This is a logout page.',
      keywords: 'logout',
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const loginStore = useLoginStore();
  document.title = (to.meta.title as string) || 'James Armbrust';
  if (to.meta.requiresLogin && !loginStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
