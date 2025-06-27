import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import {decode} from 'entities';
import Loading from "@/components/Loading";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const {
    data: categoryData
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/getAllCategory`, {
    method: "get",
    credentials: "include",
  });

  const { data: blogData, loading: blogLoading} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/editBlog/${blogId}`, {
    method: "get",
    credentials: "include",
  },[blogId]);

  console.log(blogData);

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const formSchema = z.object({
    category: z.string().min(1, "Category is required"),
    title: z.string().min(3, "Name must be at least 3 character long"),
    slug: z.string().min(3, "Slug must be at least 3 character long"),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      blogContent: "",
      title: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (blogData) {
      form.setValue("category", blogData.blog.category._id);
      form.setValue("title", blogData.blog.title);
      form.setValue("slug", blogData.blog.slug);
      form.setValue("blogContent", decode(blogData.blog.blogContent));
      setFilePreview(blogData.blog.featuredImage);
    }  
  },[ blogData])

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  }

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    try {
          
          const formData = new FormData();
          formData.append("file", file);
          formData.append("data", JSON.stringify(values));
    
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/blog/updateBlog/${blogId}`,
            {
              method: "put",
              credentials: "include",
              body: formData,
            }
          );
    
          const data = await response.json();
    
          if (!response.ok) {
            return showToast("error", data.message);
          }
          form.reset()
          setFilePreview()
          setFile()
          navigate(RouteBlog)
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message);
        }
  }

   const handleFileSelection = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  if (blogLoading) return <Loading/>

  return (
    <div>
      <Card className="pt-5 ">
        <CardContent>
          <h1 className="text-2xl font-bold mb-5 text-center">Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}  value = {field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.categories.length > 0 &&
                              categoryData.categories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Blog Title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <span className="mb-2 block">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="w-36 h-28 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <img src={filePreview}/>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Editor props={{initialData: field.value, onChange: handleEditorData}}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
