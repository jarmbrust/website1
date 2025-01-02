import { useLoginStore } from '@/stores/loginStore';
import type { Blog } from '@/types/types';
import { getBlogs, getMaxBlogId, postBlog } from '@/utils/blogUtils';
import { defineStore } from 'pinia';

const loginStore = useLoginStore();
interface State {
  blogs?: Blog[];
};

export const useBlogStore = defineStore('blog', {
  state: (): State => ({
    blogs: [],
  }),
  actions: {
    async populateBlogs(): Promise<void> {
      this.blogs = (await getBlogs()).body || null;
    },
    async postNewBlog(title: string, body: string, currentDate: string): Promise<string | null> {
      let errorMessage: string | null =  null;
      if (!this.getNewBlogId) {
        errorMessage = 'An error occurred creating a new blog.';
      } else if (loginStore.isLoggedIn && loginStore.hasPermission('me')) {
        await postBlog(this.getNewBlogId, title, body, currentDate);
      } else {
        errorMessage = 'You do not have permission to post a new blog.';
      }
      return errorMessage;
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
