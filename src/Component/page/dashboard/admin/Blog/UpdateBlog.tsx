/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
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
import { FileUpload } from "@/components/ui/file-upload";
import {
  useGetSingleBlogsQuery,
  useUpdateBlogMutation,
} from "@/redux/features/auth/Admin/blogs";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/Component/Utils/Loader";

const BLOG_CATEGORIES = [
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
] as const;

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  date: z.string().min(1, "Please select a date"),
  category: z.enum(BLOG_CATEGORIES),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function UpdateBlog() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: blogData, isLoading } = useGetSingleBlogsQuery(id as string);
  const [updateBlogMutation] = useUpdateBlogMutation();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      date: "",
      category: "Technology",
      slug: "",
    },
  });

  useEffect(() => {
    if (blogData) {
      form.reset({
        title: blogData.title,
        excerpt: blogData.excerpt,
        date: blogData.date,
        category: blogData.category,
        slug: blogData.slug,
      });
    }
  }, [blogData, form]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (payloadData) => {
    console.log(id, payloadData);
    setIsSubmitting(true);
    const toastId = toast.loading("Updating blog post...");

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payloadData));

      if (files.length > 0) {
        formData.append("file", files[0]);
      }
      const modifyData = {
        id: blogData._id,
        data: formData,
      };
      const result = await updateBlogMutation(modifyData);

      if (result?.data.success) {
        toast.success(result.data.message || "Blog post updated successfully", {
          id: toastId,
        });
        navigate("/dashboard/all-blog");
      } else {
        toast.error(
          // @ts-expect-error data
          result?.error?.data?.message || "Failed to update blog post",
          {
            id: toastId,
          }
        );
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update blog post", {
        id: toastId,
      });
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card style={{ boxShadow: "1px 1px 20px" }}>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Update Blog Post</h2>

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
                          if (!form.getValues("title")) {
                            form.setValue(
                              "title",
                              generateSlug(e.target.value)
                            );
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
                          {BLOG_CATEGORIES.map((category) => (
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
                className="w-full mt-6"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
