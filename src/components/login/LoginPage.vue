<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { useLoginStore } from '@/stores/loginStore';
import { useUserStore } from '@/stores/userStore';
import { type LoginResponse } from '@/types/types';

const loginStore = useLoginStore();
const userStore = useUserStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const userMessage = ref('');

const login = async () => {
  error.value = null;
  userMessage.value = '';
  loginStore.logout();

  const response: LoginResponse = await loginStore.login(username.value, password.value);
  resetInputs(!response.error);
  if (response.token && !response.error) {
    error.value = response.error;
    userMessage.value = response.message;
    userStore.verifyToken();
    userStore.userPermissions = response.token && userStore.isAuthenticated
      ? jwtDecode<{ permissions: string[] }>(response.token)?.permissions
      : [];
    setTimeout(() => {
      router.push({ path: '/' });
    }, 1000);
  };
};

// If there is an error, reset the password, but keep the username so the user can try again.
// On a successful login, reset all inputs.
const resetInputs = (resetAll = false) => {
  if (resetAll) {
    username.value = '';
  }
  password.value = '';
};
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <p class="note">(you will be automatically logged out after one hour, or you can log out manually)</p>
    <form @submit.prevent="login">
      <div>
        <label for="username-login">Username: </label>
        <input id="username-login" type="text" v-model="username" required />
      </div>
      <div>
        <label for="pw-login">Password: </label>
        <input id="pw-login" type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
    <div v-else>{{ userMessage }}</div>
  </div>

</template>

<style lang="scss" scoped>
.note {
  font-style: italic;
  font-size: 14px;
  margin: 0 0 30px 0;
}
</style>
