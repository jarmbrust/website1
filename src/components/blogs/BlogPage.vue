<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import BlogPosts from '@/components/blogs/BlogPosts.vue';
import { useBlogStore } from '@/stores/blogStore';
import { type Blog } from '@/types/types';
import { onMounted, ref } from 'vue';

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
  <div class="blog-posts-container">
    <BlogPosts :all-blogs="allBlogs" />
  </div>
  <div class="blog-create">
    <BaseModal :button-name="`Post Blog Entry`" />
  </div>
</template>

<style lang="scss" scoped>
  .blog-posts-container {
    height: 70vh;
    overflow-y: auto;
  }
  .blog-create {
    margin-top: 15px;
  }
</style>
