import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { useLoginStore } from '@/stores/loginStore'
import { useUserStore } from '@/stores/userStore'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const loginStore = useLoginStore();
const userStore = useUserStore();

userStore.verifyToken();
loginStore.init();

app.mount('#app');
