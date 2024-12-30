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
      if (!loginStore.isLoggedIn || !loginStore.hasPermission('me')) {
        errorMessage.value = 'You do not have permission to post a new blog.';
        return;
      }
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
