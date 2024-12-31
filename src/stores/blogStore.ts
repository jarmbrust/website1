import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getBlogs, getMaxBlogId, postBlog } from '@/utils/blogUtils';
import type { Blog } from '@/types/types';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
interface State {
  blogs?: Blog[];
};
const errorMessage = ref<string | null>(null);

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
        errorMessage.value = 'An error occurred creating a new blog.';
        return;
      } else if (loginStore.isLoggedIn && loginStore.hasPermission('me')) {
        postBlog(this.getNewBlogId, title, body, currentDate);
        return;
      } else {
        errorMessage.value = 'You do not have permission to post a new blog.';
        return;
      }
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
