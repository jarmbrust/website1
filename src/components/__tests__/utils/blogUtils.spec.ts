import { getBlogs, getMaxBlogId, postBlog } from '@/utils/blogUtils'; //, , postBlog, currentDate,
import axios from 'axios';
import { describe, expect, it, Mock, vi } from 'vitest';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('getBlogs', () => {
  it('should return a successful response with blogs', async () => {
    const mockBlogs = [
      { blogId: 1, title: 'Blog 1', body: 'This is blog 1', date: '1 December 2024' },
      { blogId: 2, title: 'Blog 2', body: 'This is blog 2', date: '2 December 2024' },
    ];

    (axios.get as Mock).mockResolvedValue({ data: { blogs: mockBlogs } });

    const result = await getBlogs();
    expect(result).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: mockBlogs,
    });

    (axios.get as Mock).mockReset();
  });


  it('should return an error response if axios fails', async () => {
    const mockError = new Error('Mock error');

    (axios.get as Mock).mockRejectedValue(mockError);

    const result = await getBlogs();
    expect(result).toEqual({
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
  });
});

describe('getMaxBlogId', () => {
  it('should return the maximum blog ID plus 1', () => {
    const blogs = [{ blogId: 1 }, { blogId: 2 }, { blogId: 3 }];
    const result = getMaxBlogId(blogs);
    expect(result).toBe(4);
  });

  it('should return 1 if no blogs are provided', () => {
    const result = getMaxBlogId([]);
    expect(result).toBe(1);
  });
});

describe('postBlog', () => {
  it('should post a new blog and return the response', async () => {
    const response = { data: { blogId: 1, title: 'New Blog' } };
    (axios.post as Mock).mockResolvedValue(response);

    const result = await postBlog(1, 'New Blog', 'This is a new blog', '2 December 2024');
    expect(result).toEqual({ blogId: 1, title: 'New Blog' });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/.netlify/functions/postBlog', {
      blogId: 1,
      title: 'New Blog',
      body: 'This is a new blog',
      currentDate: '2 December 2024',
    });

    (axios.post as Mock).mockReset();
  });

  it('should throw an error if axios fails', async () => {
    const error = new Error('Mock error');
    (axios.post as Mock).mockRejectedValue(error);

    await expect(postBlog(1, 'New Blog', 'This is a new blog', '3 December 2024')).rejects.toThrowError(
      error,
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/.netlify/functions/postBlog', {
      blogId: 1,
      title: 'New Blog',
      body: 'This is a new blog',
      currentDate: '3 December 2024',
    });

    (axios.post as Mock).mockReset();
  });
});


