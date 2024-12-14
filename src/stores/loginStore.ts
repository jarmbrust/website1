import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  const loggedIn = ref(false);

  const login = () => {
    loggedIn.value = true;
  };

  const logout = () => {
    loggedIn.value = false;
  };

  return { loggedIn, login, logout };
})
