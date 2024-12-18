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
};
</script>

<template>
  <div>
    <h2>Logout</h2>
    <p>Thanks for visiting my site!  There will be more soon, and if you have any suggestions
      on content you would like to see, please let me know.
    </p>
    <form @submit.prevent="logout">
      <button type="submit">Logout</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>
