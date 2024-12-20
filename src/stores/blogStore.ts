import { defineStore } from 'pinia';
import { getBlogs, getMaxBlogId, postBlog } from '@/utils/blogUtils';
import type { Blog } from '@/types/types';

interface State {
  blogs?: Blog[];
};

export const useBlogStore = defineStore('blog', {
  state: (): State => ({
    blogs: [],
  }),
  actions: {
    async populateBlogs() {
      this.blogs = (await getBlogs()).body || null;
    },
    async postNewBlog(title: string, body: string, currentDate: string) {
      if (!this.getNewBlogId) {
        // TODO: make an error message for this.
        return;
      }
      postBlog(this.getNewBlogId, title, body, currentDate);
    },
  },
  getters: {
    getNewBlogId(): number | null {
      if (!this.blogs) {
        return null;
      }
      return getMaxBlogId(this.blogs);
    },
  },
});
