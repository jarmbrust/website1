<script setup lang="ts">
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
</script>

<template>
  <h1>Welcome!</h1>
  <h2>My name is James Armbrust and I am a software developer based in sunny Colorado!</h2>
  <p>I've been working as a software engineer for over 10 years, and have contributed on a wide variety of projects
    from large enterprise financial applications, to small startups and independent companies.
    My experience includes frontend, backend and database development using a variety of technologies.
  </p>
  <p>As eluded to above, this tiny corner of the web is a work in progress. However, feel free to check it out!
    Everything here was written with Vue 3, TypeScript, and SCSS, with Node.js and Mongodb as the serverless backend.
  </p>

  <Transition appear name="fade" mode="out-in">
    <p>Your current status is:
      <span class="login-status">{{ loginStore.isLoggedIn ? 'logged in.' : 'not logged in.' }}</span>
    </p>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateX(-1000px);
}

.fade-enter-active {
  transition: all 2.0s ease-out;
}
.fade-enter-to {
  opacity: 1;
}
.login-status {
  font-weight: 700;
}
.italic {
  font-style: italic;
}
</style>
