<script setup lang="ts">
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
</script>

<template>
  <Transition appear name="fade1" mode="out-in">
    <h2>Welcome to my website</h2>
  </Transition>
  <Transition appear name="fade2" mode="out-in">
    <p>This tiny site is a work in progress and will be updated relatively consistently as time permits.</p>
  </Transition>
  <Transition appear name="fade3" mode="out-in">
    <div>
      <p>To see some of the pages you will need to login with the password I provided
        either in my resume or in other correspondence.  Currently, the resume section is
        not complete, but if you are here, chances are you have a copy of it already.  Of
        course, if you do not have that password, please contact me and I can provide it!
      </p>
      <p>Your current status is:
        <span class="login-status">{{ loginStore.isLoggedIn ? 'logged in.' : 'not logged in.' }}</span>
      </p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.fade1-enter-from,
.fade2-enter-from,
.fade3-enter-from {
  opacity: 0;
  transform: translateY(-500px);
}
// not using this one for now
.fade4-enter-from {
  opacity: 0;
  transform: translateX(-1000px);
}

.fade1-enter-active {
  transition: all 0.5s ease-out;
}
.fade2-enter-active {
  transition: all 1.0s ease-out;
}
.fade3-enter-active {
  transition: all 1.5s ease-out;
}
.fade4-enter-active {
  transition: all 2.0s ease-out;
}

.fade1-enter-to,
.fade2-enter-to,
.fade3-enter-to,
.fade4-enter-to {
  opacity: 1;
}
.login-status {
  font-weight: 700;
}
</style>
