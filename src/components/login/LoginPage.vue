<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { type ErrorData } from '@/types/types';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const userMessage = ref('');

// TODO: consider moving this logic to the store
const login = async () => {
  error.value = null;
  userMessage.value = '';
  loginStore.logout();
  try {
    const { data } = await axios.post('/.netlify/functions/login', {
      username: username.value,
      password: password.value,
    });
    if (data.success) {
      console.log('Login successful!');
      userMessage.value = 'Login successful!';
      loginStore.login();
      data.permission.forEach((perm: string) => {
        loginStore.setPermission(perm)
      });
      resetInputs(true);
    } else {
      userMessage.value = 'Invalid username or password';
    }
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as ErrorData;
      if (errorData && errorData?.error) {
        // TODO: don't surface all error messages...
        error.value = errorData.error;
        resetInputs();
      } else {
        error.value = 'An error occurred. Please try again.';
      }
    } else {
      error.value = 'An error occurred. Please try again.';
    }
  }
};

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
