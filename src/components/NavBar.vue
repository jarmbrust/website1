<script setup lang="ts">
import { useLoginStore } from '@/stores/loginStore';
import { RouterLink } from 'vue-router';

const loginStore = useLoginStore();

const isLoggedIn = () => {
  return loginStore.isLoggedIn;
};
</script>

<template>
  <nav>
    <div class="my-name-and-pic">
      <img class="pic-of-me" src="../assets/james_armbrust_small.jpeg" alt="James Armbrust nav-pic" />
      <span class="my-name"><RouterLink to="/">James Armbrust</RouterLink></span>
    </div>
    <div class="routes">
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/resume">Resume</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">
        <span v-if="!isLoggedIn()">Login</span>
        <span v-else>Logout</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

nav {
  font-size: 22px;
  margin: 10px 0;
  min-height: 45px;
  display: flex;
  justify-content: space-between;
  @media (min-width: variables.$device-width) {
    .my-name-and-pic {
      font-weight: 700;
      font-size: 30px;
      display: flex;
      a {
        text-decoration: none;
        color: #f8f8f8;
      }
      .pic-of-me {
        height: 50px;
        width: 50px;
      }
      .my-name {
        padding: 0 10px;
      }
    }
    .routes {
      a.router-link-exact-active {
        color: #9cb6c9;
      }
      a:hover {
        color: #849faf;
      }
      a {
        padding: 0 12px;
        text-decoration: none;
        color: #f8f8f8;
      }
    }
  }
  @media (max-width: variables.$device-width) {
    flex-direction: column;
    .my-name-and-pic {
      font-weight: 700;
      font-size: 25px;
      display: flex;
      justify-content: center;
      a {
        text-decoration: none;
        color: #f8f8f8;
      }
      .pic-of-me {
        display: none;
      }
      .my-name {
        padding: 0 10px;
      }
    }
    .routes {
      display: flex;
      justify-content: center;
      font-size: 18px;
      a.router-link-exact-active {
        color: #9cb6c9;
      }
      a:hover {
        color: #849faf;
      }
      a, .login, .logout {
        padding: 10px 12px 0 12px;
        text-decoration: none;
        color: #f8f8f8;
      }
    }
  }
}
</style>
