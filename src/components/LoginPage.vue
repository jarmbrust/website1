<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const registerUsername = ref('');
const registerPassword = ref('');
const error = ref<string | null>(null);
const registerError = ref<string | null>(null);

const login = async () => {
  try {
    console.log('username.value: ', username.value);
    const response = await axios.post('/.netlify/functions/login', {
      username: username.value,
      password: password.value,
    });
    if (response.data.success) {
      console.log('Login successful!!!');
    } else {
      error.value = 'Invalid email or password';
    }
  } catch (err) {
    error.value = `An error occurred ${username.value}. Please try again: ${err}`;
  }
}

const register = async () => {
  try {
    const response = await axios.post('/.netlify/functions/register', {
      username: registerUsername.value,
      password: registerPassword.value
    });
    if (response.data.success) {
      console.log('Registration successful!!!');
    } else {
      registerError.value = 'Invalid username or password';
    }
  } catch (err) {
    registerError.value = `An error occurred ${registerUsername.value}. Please try again: ${err}`;
  }
}
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
    <div v-else>Loading...</div>
  </div>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username-register">Username: </label>
        <input id="username-register" type="text" v-model="registerUsername" required />
      </div>
      <div>
        <label for="pw-register">Password: </label>
        <input id="pw-register" type="password" v-model="registerPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="registerError">{{ registerError }}</div>
    <div v-else-if="!registerUsername || !registerPassword">Please enter a username and password</div>
    <div v-else>Loading...</div>
  </div>
</template>
