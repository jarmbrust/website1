<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <div class="myname">James Armbrust</div>
    <div class="routes">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/resume">Resume</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  font-size: 22px;
  margin: 10px 0;
  height: 45px;
  display: flex;
  justify-content: space-between;
  .myname {
    font-weight: 700;
    font-size: 30px;
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
