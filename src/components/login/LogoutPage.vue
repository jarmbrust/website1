<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
const message = ref('');

const logout = () => {
  loginStore.logout();
  if (!loginStore.isLoggedIn) {
    message.value = 'You have been logged out.';
  }
}
</script>

<template>
  <div>
    <h1>Logout</h1>
    <form @submit.prevent="logout">
      <button type="submit">Logout</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>
