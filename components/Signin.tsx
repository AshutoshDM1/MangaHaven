"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

const Signin: React.FC = () => {

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };
  const handleEmailSignIn = async () => {
    console.log(1)
    const res = await signIn("credentials", {
      email : "ashutosh@gmail.com", // Use the email state
      password : "asdfasdfasdf", // Use the password state
      redirect: true,
      callbackUrl: "/"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border border-zinc-200  ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Sign up
          </CardTitle>
          <CardDescription className="text-center ">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[45vh] w-full flex flex-col gap-3 ">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium ">
                Email
              </label>
              <Input id="email" placeholder="Enter your email" className="" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium ">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="border-zinc-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium ">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="border-zinc-300"
              />
            </div>
            <Button
              className="mt-4  "
              onClick={handleEmailSignIn}
            >
              Login with email
            </Button>

            <div className="mt-4">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full bg-blue-600 hover:bg-blue-400  "
              >
                Sign in with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm ">
              Already have an account?{" "}
              <a href="#" className="font-semibold hover:underline">
                Sign in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
