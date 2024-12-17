import { defineStore } from 'pinia';
import { getBlogs, getMaxBlogId, postBlog } from '@/utils/blogUtils';
import type { Blog } from '@/types/types';

interface State {
  blogs: Blog[];
};

export const useBlogStore = defineStore('blog', {
  state: (): State => ({
    blogs: [],
  }),
  actions: {
    async populateBlogs() {
      this.blogs = await getBlogs();
    },
    async postNewBlog(title: string, body: string, currentDate: string) {
      postBlog(this.getNewBlogId, title, body, currentDate);
    },
  },
  getters: {
    getNewBlogId(): number {
      const test = getMaxBlogId(this.blogs) + 1;
      console.log('test:', test);
      return test;
    },
  },
});
