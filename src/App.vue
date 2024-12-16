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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  header {
    line-height: 1.5;
    border-bottom:rgb(195, 201, 220) 1px solid;
  }
  footer {
    margin-top: auto;
  }
}
</style>
