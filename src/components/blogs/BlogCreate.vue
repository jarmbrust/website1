<script setup lang="ts">
import { useBlogStore } from '@/stores/blogStore';
import { currentDate } from '@/utils/blogUtils';
import { inject, ref } from 'vue';

const blogStore = useBlogStore();
const title = ref('');
const body = ref('');
const todaysDate = ref('');

const errorMessage = ref<string | null>(null);

const postNewBlog = async () => {
  if (title.value && body.value) {
    todaysDate.value = currentDate();
    errorMessage.value = await blogStore.postNewBlog(title.value, body.value, todaysDate.value);
    title.value = '';
    body.value = '';
    todaysDate.value = '';
  } else {
    errorMessage.value = 'Please fill out all fields.';
  }
};

const closeModal = inject('closeModal');
</script>

<template>
<div class="blog-post-fields">
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  <form @submit.prevent="postNewBlog">
    <div class="title">Title:</div> <input class="title" type="text" v-model="title" required />
    <div class="content">Content:</div> <textarea rows="5" cols="42" v-model="body" required />
    <div><button class="submit-button" type="submit">Submit</button></div>
  </form>
  <button @click="closeModal=false">Close</button>
</div>
</template>

<style lang="scss" scoped>
.blog-post-fields {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .error-message {
    color: red;
    font-style: italic;
    font-size: 20px;
  }
  textarea, input {
    font-size: 18px;
    font-family: inherit;
    max-width: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin: 5px 0;
    width: 100%;
  }
  textarea {
    height: 100px
  }
  .submit-button {
    width: 100%;
  }
}
</style>
