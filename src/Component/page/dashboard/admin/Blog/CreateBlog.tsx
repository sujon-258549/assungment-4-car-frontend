/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useCreateBlogMutation } from "@/redux/features/auth/Admin/blogs";
import { useNavigate } from "react-router-dom";

// Define categories as constants
const CAR_PROJECT_CATEGORIES = [
  "Technology",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Performance",
  "Classic",
  "Electric",
  "Off-Road",
  "Luxury",
  "Custom",
];
const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  date: z.string().min(1, "Please select a date"),
  category: z.string().min(1, "Please select a category"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function CreateBlog() {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
      category: "",
      slug: "",
    },
  });
  const navigate = useNavigate();
  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };
  const [createBlogs] = useCreateBlogMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (payloadData) => {
    const toastId = toast.loading("Creating blog post...");
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payloadData));
      if (files.length > 0) {
        formData.append("file", files[0]);
      } else {
        throw new Error("Provider image is required");
      }
      const result = await createBlogs(formData);
      if (result?.data?.success) {
        toast.success(
          result.data?.message || "Blog post created successfully",
          {
            id: toastId,
          }
        );
        navigate("/dashboard/all-blog");
      } else {
        toast.error(result?.data?.message || "Failed to create blog post", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .substring(0, 50); // Limit length
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card style={{ boxShadow: "1px 1px 20px" }}>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Blog Post</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your amazing blog post title"
                        onChange={(e) => {
                          field.onChange(e);
                          if (!form.getValues("slug")) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="your-blog-post-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        {...field}
                        placeholder="A short description of your blog post..."
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAR_PROJECT_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-900 mt-6"
                size="lg"
              >
                Publish Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
