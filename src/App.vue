<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main class="margins">
      <RouterView />
    </main>
    <footer>
      <SiteFooter>
        © 2025 James Armbrust
      </SiteFooter>
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
  @media screen and (max-width: variables.$device-width) {
    main {
      margin: 0;
    }
  }
  @media screen and (min-width: variables.$device-width) {
    main {
      margin: variables.$content-margin;
    }
  }
  footer {
    margin-top: auto;
  }
}
</style>
