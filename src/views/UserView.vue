<script setup lang="ts">
import LoginPage from '@/components/login/LoginPage.vue';
import logoutPage from '@/components/login/LogoutPage.vue';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();

</script>

<template>
  <div v-if="loginStore.isLoggedIn">
    <logoutPage />
  </div>
  <div v-else>
    <LoginPage/>
  </div>
</template>
