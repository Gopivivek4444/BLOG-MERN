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
import { set, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice.js";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/images/logo-white.png";

const SignIn = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password field required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/Login`,{
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(values),
            })
    
            const data = await response.json()
    
            if(!response.ok) {
                return showToast('error',data.message)
            }
            dispatch(setUser(data.user));
            navigate(RouteIndex); 
            showToast('success',data.message)
        } catch (error) {
            showToast('error',error.message)
        }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5 shadow-lg">
        <div className="flex justify-center items-center ">
          <Link to={RouteIndex} >
          <img src={logo} /> 
        </Link>
        </div>
        <h1 className="text-2xl font-bold mb-0.5 text-center">Sign In</h1>

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
                      <Input type="password" placeholder="Enter Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                SignIn
              </Button>
              <div>
                <p className="text-sm text-center mt-3">
                  Don't have an account?{" "}
                  <Link to={RouteSignUp} className="text-blue-500 hover:underline">
                    Sign Up
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

export default SignIn;
