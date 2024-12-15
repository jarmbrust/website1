<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();

const isLoggedIn = () => {
  return loginStore.isLoggedIn();
}


</script>

<template>
  <nav>
    <div class="my-name-and-pic">
      <img class="pic-of-me" src="../assets/james_edit4.jpeg" alt="me" />
      <span class="my-name"><RouterLink to="/">James Armbrust</RouterLink></span>
    </div>
    <div class="routes">
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/resume">Resume</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <span v-if="!isLoggedIn()" class="login"><RouterLink to="/login">Login</RouterLink></span>
      <span v-else class="logout"><RouterLink to="/logout">Logout</RouterLink></span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '../assets/_variables.scss';

nav {
  font-size: 22px;
  margin: 10px 0;
  min-height: 45px;
  display: flex;
  justify-content: space-between;
  @media (max-width: variables.$device-width) {
    flex-direction: column;
  }
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
    a:last-of-type {
      padding: 0 0 0 18px;
    }
    a {
      padding: 0 18px;
      text-decoration: none;
      color: #f8f8f8;
    }
  }
}
</style>
