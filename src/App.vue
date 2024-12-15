<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <RouterView />
    <footer>
      <SiteFooter />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

#app {
  height: 100vh;
  background-color: variables.$background-color;
  z-index: 98;
  header {
    line-height: 1.5;
    border-bottom:rgb(195, 201, 220) 1px solid;
    // position: sticky;
    top: 0;
    z-index: 100;
  }
  footer {
    display: flex;
    flex-direction: column;
    // position: sticky;
    bottom: 0;
    height: 100vh;
    z-index: 99;
  }
}
</style>
