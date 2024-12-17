import axios from 'axios';
import { type Blog } from '@/types/types';

export const getBlogs = async () => {
  const response = await axios.get('/.netlify/functions/getBlogs');
  return response.data.blogs;
};

export const getMaxBlogId = (blogs: Blog[]) => {
  let max = 0;
  for (const blog of blogs) {
    if (blog.blogId > max) {
      max = blog.blogId;
    }
  }
  return max;
};

export const postBlog = async (blogId: number, title: string, body: string, currentDate: string) => {
  const { data } = await axios.post('/.netlify/functions/postBlog', {
    blogId,
    title,
    body,
    currentDate,
  });
  return data;
};

export const currentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = String(date.getDate());
  return `${day} ${month} ${year}`;
};
