import { defineStore } from 'pinia';
import axios, { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { type LoginResponse } from '@/types/types';

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
        console.log('Login successful!');
        this.token = this.getTokenFromCookie;
        return isAxiosError(response)
        ? { error: (response as AxiosError).message, message: 'Invalid username or password.', token: this.token  }
        : { error: '', message: 'Login successful!', token: this.token };
      } catch (error: unknown) {
        console.error('Error logging in:', error);
        return { error: (error as AxiosError).message, message: 'Error Logging In.', token: this.token }
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
    getTokenFromCookie() {
      return Cookies.get('userPermissionsCookie');
    }
  },
});

