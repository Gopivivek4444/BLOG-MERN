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
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv.js";
import { showToast } from "@/helpers/showToast.js";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {

    const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long").refine(data => data.password === data.confirmPassword, "Passwords must match"),
    
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

 async function onSubmit(values) {
    try {
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/Register`,{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        })

        const data = await response.json()

        if(!response.ok) {
            return showToast('error',data.message)
        }

        navigate(RouteSignIn); 
        showToast('success',data.message)
    } catch (error) {
        showToast('error',error.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-5 text-center">Sign Up</h1>
        <div>
            <GoogleLogin/>
            <div className="border  mt-6 flex justify-center items-center">
              <span className="absolute bg-white">or</span>
            </div>
        </div>
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
                      <Input placeholder="Enter Your Name" {...field} />
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
                      <Input placeholder="Enter Your Email" {...field} />
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
                      <Input type = "password" placeholder="Enter Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type = "password" placeholder="Enter Your Again" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div>
                <p className="text-sm text-center mt-3">
                  Already have an account?{" "}
                  <Link to={RouteSignIn} className="text-blue-500 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
