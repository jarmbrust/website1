<script setup lang="ts">
import type { Blog } from '@/types/types';

const props = defineProps<{ allBlogs: Blog[] }>();
</script>

<template>
<div class="blogs">
  <div v-show="props.allBlogs?.length > 0">
    <div v-for="blog in props.allBlogs" :key="blog.blogId">
      <h2><span class="blog-title">{{ blog.title }}: </span>
        <span class="blog-date">{{ blog.date }}</span>
      </h2>
      <p class="blog-body">{{ blog.body }}</p>
      <div class="blog-divider"></div>
    </div>
  </div>
  <div  v-if="!props.allBlogs">
    <p>No results returned.</p>
  </div>
  <div v-else-if="props.allBlogs.length === 0">
    <p>Loading...</p>
  </div>
</div>
</template>

<style lang="scss" scoped>
.blogs {
  margin-bottom: 42px;
  .blog-title {
    font-size: 20px;
    font-weight: 600;
  }
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
</style>
