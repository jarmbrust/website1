import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  const loggedIn = ref(false);

  const login = () => {
    loggedIn.value = true;
    // Set a timeout to log the user out after one hour
    // regardless of activity
    setTimeout(() => {
      logout();
    }, 60 * 60 * 1000);
  };

  const logout = () => {
    loggedIn.value = false;
  };

  const isLoggedIn = () => {
    return loggedIn.value;
  }

  return { loggedIn, login, logout, isLoggedIn };
})
