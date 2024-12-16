<script setup lang="ts">
// import IconStar from '@/components/icons/IconStar.vue';
// import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();

</script>

<template>
  <div>
    <div v-if="!loginStore.isLoggedIn()">
      <p>To see anything on this page, you will need to be logged in.  If you do not have
        the password to the account (ie. you do not have a copy of my resume already), please contact me and
        I can provide one to you.  You can contact me by email; which is "james" at the domain name.
      </p>
      <p>Click <RouterLink to="/login">here</RouterLink> to log in.</p>

    </div>
    <div v-else>
      <h1>Resume</h1>
      <p>My resume will be detailed here soon.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.star {
  width: 20px;
  height: 20px;
}
</style>
