export type Blog = {
  blogId: number,
  title: string,
  body: string,
  date: Date,
};

export interface LoginResponse {
  error: string;
  message: string;
  token: string | undefined;
}

export type GetBlogsResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: Blog[];
};
