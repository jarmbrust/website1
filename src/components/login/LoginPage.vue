<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const userMessage = ref('');

const login = async () => {
  try {
    console.log('username.value: ', username.value);
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
  } catch (err) {
    error.value = `An error occurred ${username.value}. Please try again: "${err}"`;
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
