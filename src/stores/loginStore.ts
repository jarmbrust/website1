import { defineStore } from 'pinia';

interface State {
  loggedIn: boolean;
  userPermissions: string[];
};

export const useLoginStore = defineStore('login', {
  state: (): State => ({
    loggedIn: false,
    userPermissions: [],
  }),
  actions: {
    login() {
      this.loggedIn = true;
      this.setAutoLogout();
    },
    logout() {
      this.removePermissions(true);
      this.loggedIn = false;
    },
    setPermission(permission: string) {
      if (!this.userPermissions.includes(permission)) {
        this.userPermissions.push(permission);
      }
    },
    removePermissions(all: boolean, permission?: string) {
      if (all) {
        this.userPermissions = [];
      } else if (permission) {
        this.userPermissions = this.userPermissions.filter((p) => p !== permission);
      }
    },
     // log the user out after one hour regardless of activity
    setAutoLogout() {
      setTimeout(() => {
        this.logout();
      }, 60 * 60 * 1000);
    },
    hasPermission(permission: string): boolean {
      return this.userPermissions.includes(permission);
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.loggedIn;
    },
    getPermissions(): string[] {
      return this.userPermissions;
    },
  },
});
