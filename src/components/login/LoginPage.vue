<script setup lang="ts">
import { useLoginStore } from '@/stores/loginStore';
import { useUserStore } from '@/stores/userStore';
import { type LoginResponse } from '@/types/types';
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  if (!response.error) {
    userMessage.value = response.message;
    userStore.verifyToken();
    userStore.userPermissions = response.token && userStore.isAuthenticated
      ? jwtDecode<{ permissions: string[] }>(response.token)?.permissions
      : [];
    // route to main page on successful login
    router.push({ path: '/' });
  } else if (response.error) {
    error.value = response.message;
  }
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
    <p>Logging in with the "guest" account will not give you access to anything special right now
      (other than show you as logged in, and storing a cookie which will be removed after 1 hour
      or when you logout).</p>
    <p>The password for the "guest" account is located in the README on GitHub. The link is on the
      resume page.</p>
    <p class="note">You will be redirected to the home page after a successful login.</p>
    <form @submit.prevent="login" class="login-form">
      <div class="error" v-if="error">{{ error }}</div>
      <div class="success" v-else>{{ userMessage }}</div>
      <div class="username">
        <label for="username-login">Username: </label>
        <input id="username-login" type="text" v-model="username" required />
      </div>
      <div class="password">
        <label for="pw-login">Password: </label>
        <input id="pw-login" type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>

</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

.note {
  font-style: italic;
  font-size: 14px;
  margin-bottom: 30px;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  padding: 20px;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .error, .success {
    font-size: 18px;
    font-style: italic;
  }
  .error {
    color: red;
  }
  .username, .password {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: variables.$device-width) {
      flex-direction: column;
    }
    @media screen and (min-width: variables.$device-width) {
      input {
        max-width: 250px;
        width: 100%;
      }
    }
  }
}
</style>
