<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBlogStore } from '@/stores/blogStore';
import { useLoginStore } from '@/stores/loginStore';
import { type Blog } from '@/types/types';
import { currentDate } from '@/utils/blogUtils';

const blogStore = useBlogStore();
const loginStore = useLoginStore();

const title = ref('');
const body = ref('');
const todaysDate = ref('');
const allBlogs = ref<Blog[]>([]);
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

onMounted(async () => {
  if (!blogStore.blogs.length) {
    await blogStore.populateBlogs();
  }
  allBlogs.value = blogStore.blogs;
});
</script>

<template>
  <div class="blogs">
    <div v-show="allBlogs.length > 0">
      <div v-for="blog in allBlogs" :key="blog.blogId">
        <h2>{{ blog.title }}: <span class="blog-date">{{ blog.date }}</span></h2>
        <p class="blog-body">{{ blog.body }}</p>
        <div class="blog-divider"></div>
      </div>
    </div>
    <div v-show="allBlogs.length === 0">
      <p>Loading...</p>
    </div>
  </div>
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
.blogs {
  margin-bottom: 42px;
  .blog-date {
    font-size: 15px;
    font-style: italic;
    font-weight: 400;
  }
  .blog-body {
    font-size: 16px;
    line-height: 1.5;
    padding: 0 40px;
  }
  .blog-divider {
    border-bottom: #999 1px solid;
  }
}
.blog-post-fields {
  margin-top: 42px;
  .error-message {
    color: red;
    font-weight: bold;
    font-size: 22px;
  }
  textarea, input {
    font-size: 0.8rem;
    letter-spacing: 1px;
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
    margin: 10px 0;
    width: 500px;
  }
}
</style>
