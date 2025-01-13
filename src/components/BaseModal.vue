<script setup lang="ts">
import BlogCreate from '@/components/blogs/BlogCreate.vue';
import { provide, ref } from 'vue';

const open = ref(false)
const props = defineProps<{ buttonName: string }>();

provide('closeModal', open);
</script>

<template>
  <div :class="{ 'modal-open': open }" />
  <button @click="open=true">{{ props.buttonName }}</button>
  <Teleport to="body">
    <BlogCreate v-if="open" :closeModal="open" class="modal"/>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';
$modal-width-small: 250px;

.modal-open {
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
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
    left: 45%;
    width: $modal-width-small;
    margin-left: calc(($modal-width-small / 2) * -1);
    background-color: #222;
  }
}
</style>
