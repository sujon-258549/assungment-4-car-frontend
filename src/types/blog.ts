import { TUser } from "./user";

export type TBlog = {
  _id: string;
  title: string;
  excerpt: string;
  id: TUser;
  date: string;
  authorId: string;
  category: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
