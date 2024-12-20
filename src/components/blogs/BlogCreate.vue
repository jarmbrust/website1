<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import { useBlogStore } from '@/stores/blogStore';
import { currentDate } from '@/utils/blogUtils';

const loginStore = useLoginStore();
const blogStore = useBlogStore();
const title = ref('');
const body = ref('');
const todaysDate = ref('');

const errorMessage = ref<string | null>(null);

const postNewBlog = async () => {
  if (!loginStore.isLoggedIn || !loginStore.hasPermission('me')) {
    errorMessage.value = 'You do not have permission to post a new blog.';
    return;
  }
  todaysDate.value = currentDate();
  await blogStore.postNewBlog(title.value, body.value, todaysDate.value);
  title.value = '';
  body.value = '';
  todaysDate.value = '';
};
</script>

<template>
<div class="blog-post-fields">
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  <form @submit.prevent="postNewBlog">
    <div class="title">Title:</div> <input class="title" type="text" v-model="title" required />
    <div class="content">Content:</div> <textarea rows="5" cols="42" v-model="body" required />
    <div><button type="submit">Submit</button></div>
  </form>
</div>
</template>

<style lang="scss" scoped>
.blog-post-fields {
  .error-message {
    color: red;
    font-weight: bold;
    font-size: 22px;
  }
  textarea, input {
    font-size: 18px;
    font-family: inherit;
    padding: 10px;
    max-width: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin: 5px 0;
    width: 100%;
  }
  textarea {
    height: 100px
  }
}
</style>
