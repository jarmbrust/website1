<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { type ErrorData } from '@/types/types';

const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const userMessage = ref('');

const login = async () => {
  error.value = null;
  try {
    const response = await axios.post('/.netlify/functions/login', {
      username: username.value,
      password: password.value,
    });
    if (response.data.success) {
      console.log('Login successful!');
      userMessage.value = 'Login successful!';
    } else {
      error.value = 'Invalid email or password, please try again.';
    }
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as ErrorData;
      if (errorData && errorData?.error) {
        // TODO: don't surface all error messages for security reasons.
        error.value = errorData.error;
      } else {
        error.value = 'An error occurred. Please try again.';
      }
    } else {
      error.value = 'An error occurred. Please try again.';
    }
  }
};
</script>

<template>
  <div class="login">
    <h1>Login</h1>
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
    <div v-else-if="!username || !password">Please enter a username and password</div>
    <div v-else>{{ userMessage }}</div>
  </div>

</template>
