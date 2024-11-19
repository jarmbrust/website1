<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<style lang="scss" scoped>
#app {
  header {
    line-height: 1.5;
    border-bottom:rgb(195, 201, 220) 1px solid;
  }
}
</style>
