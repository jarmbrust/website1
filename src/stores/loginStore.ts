import { type LoginResponse } from '@/types/types';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

interface State {
  userPermissions: string[];
  token: string | undefined;
  loggedIn: boolean;
};

export const useLoginStore = defineStore('login', {
  state: (): State => ({
    userPermissions: [],
    token: '',
    loggedIn: false,
  }),
  actions: {
    async login(username: string, password: string): Promise<LoginResponse> {
      try {
        const response = await axios.post('/.netlify/functions/login', { username, password });
        this.token = this.getTokenFromCookie;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.loggedIn = true;
        return { error: '', message: response.data.message, token: this.token };
      } catch (error: unknown) {
        console.error('Error logging in:', error);
        const message = error instanceof AxiosError && error.response
          ? error.response?.data.error
          : 'An error occurred logging in.';
        return { error: (error as AxiosError).message, message: message, token: this.token }
      }
    },
    logout() {
      this.userPermissions = [];
      this.token = '';
      this.loggedIn = false;
      Cookies.remove('userPermissionsCookie', {
        domain: 'james3k.com',
        path: '/',
      });
      delete axios.defaults.headers.common['Authorization'];
    },
    setPermission(permission: string) {
      if (!this.userPermissions.includes(permission)) {
        this.userPermissions.push(permission);
      }
    },
    hasPermission(permission: string): boolean {
      return this.userPermissions.includes(permission);
    },
    async init() {
      this.token = this.getTokenFromCookie;
      if (this.token) {
        try {
          const decodedToken = jwtDecode<{ permissions: string[] }>(this.token);
          this.userPermissions = decodedToken.permissions;
          this.loggedIn = true;
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          this.loggedIn = false;
        }
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      const permissions = this.getPermissions;
      if (permissions?.length > 0) {
        this.loggedIn = true;
      }
      return this.loggedIn;
    },
    getPermissions(): string[] {
      if (!this.userPermissions) {
        const token = this.getTokenFromCookie;
        this.userPermissions = token ? jwtDecode<{ permissions: string[] }>(token)?.permissions : [];
      }
      return this.userPermissions;
    },
    getTokenFromCookie(): string | undefined {
      return Cookies.get('userPermissionsCookie');
    }
  },
});

