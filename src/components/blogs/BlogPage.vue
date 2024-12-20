<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBlogStore } from '@/stores/blogStore';
import BlogPosts from '@/components/blogs/BlogPosts.vue';
import BlogCreate from '@/components/blogs/BlogCreate.vue';
import { type Blog } from '@/types/types';

const blogStore = useBlogStore();
const allBlogs = ref<Blog[]>([]);

onMounted(async () => {
  if (!blogStore.blogs?.length) {
    await blogStore.populateBlogs();
  }
  allBlogs.value =
    !blogStore.blogs?.length
    ? []
    : blogStore.blogs;
  allBlogs.value.sort((a, b) => b.blogId - a.blogId);
});
</script>

<template>
  <BlogPosts :all-blogs="allBlogs" />
  <BlogCreate />
</template>
