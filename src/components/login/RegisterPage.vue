<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const userMessage = ref('');

// TODO: check if the username already exists and return an error if it does,
// or handle that in mongodb...
const register = async () => {
  error.value = null;
  userMessage.value = '';
  try {
    const response = await axios.post('/.netlify/functions/register', {
      username: username.value,
      password: password.value
    });
    if (response.data.success) {
      console.log('Registration successful!');
      userMessage.value = 'Registration successful!';
      resetInputs(true);
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    error.value = `An error occurred ${username.value}: ${err}`;
    resetInputs();
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
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username-register">Username: </label>
        <input id="username-register" type="text" v-model="username" required />
      </div>
      <div>
        <label for="pw-register">Password: </label>
        <input id="pw-register" type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="error">{{ error }}</div>
    <div v-else>{{ userMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
