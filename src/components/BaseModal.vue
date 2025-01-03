<script setup lang="ts">
import BlogModalContent from '@/components/blogs/BlogModalContent.vue';
import { provide, ref } from 'vue';

const open = ref(false)
const props = defineProps<{ buttonName: string }>();

provide('closeModal', open);
</script>

<template>
  <button @click="open=true">{{ props.buttonName }}</button>
  <Teleport to="body">
    <BlogModalContent v-if="open" :closeModal="open" class="modal"/>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

@media screen and (min-width: variables.$device-width) {
  .modal {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    background-color: #222;
  }
}
@media screen and (max-width: variables.$device-width) {
  .modal {
    position: fixed;
    top: 15%;
    left: 0%;
    width: 100%;
    background-color: #222;
  }
}
</style>
