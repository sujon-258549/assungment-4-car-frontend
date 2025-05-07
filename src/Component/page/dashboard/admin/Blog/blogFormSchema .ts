// src/schemas/blog-form.ts
import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  excerpt: z.string().min(20, {
    message: "Excerpt must be at least 20 characters.",
  }),
  date: z.date(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  imageUrl: z.string().url().optional(),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters.",
  }),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
