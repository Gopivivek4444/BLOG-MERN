import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/user/user.slice.js";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";

const Profile = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  // Fetch user data
  const user = useSelector((state) => state.user);
  const {
    data: userData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/getUser/${user.user._id}`, {
    method: "get",
    credentials: "include",
  });
  // console.log(userData);
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(1, "Name field required"),
    email: z.string().email(),
    bio: z.string().optional(),
    password: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/updateUser/${user.user._id}`,
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
      dispatch(setUser(data.user));
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

  if (loading) return <Loading />;
  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex items-center justify-center mt-10">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-32 h-32 relative group" >
                  <AvatarImage
                    src={filePreview ? filePreview : userData?.user?.avatar} 
                  />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 justify-center items-center bg-black/20 border-2 border-white rounded-full hidden group-hover:flex cursor-pointer">
                    <IoCameraOutline color="white" size={25} />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Your Bio Here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
