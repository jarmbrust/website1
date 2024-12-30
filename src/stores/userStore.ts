import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import axios from 'axios';

interface State {
  isAuthenticated: boolean;
  userPermissions: string[];
};

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isAuthenticated: false,
    userPermissions: [],
  }),
  actions: {
    async verifyToken() {
      const token = Cookies.get('userPermissionsCookie');
      try {
        const decodedToken = token ? await this.verifyTokenOnServer(token) : null;
        if (decodedToken) {
          this.userPermissions = decodedToken.permissions;
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error verifying JWT token:', error);
        this.isAuthenticated = false;
      }
    },
    async verifyTokenOnServer(token: string) {
      try {
        const response = await axios.post('/.netlify/functions/verifyToken', { token });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
