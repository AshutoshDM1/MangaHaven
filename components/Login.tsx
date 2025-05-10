"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, LogIn, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ShinyButton } from "./ui/ShinyButton";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const guestLogin = () => {
    console.log("guest login");
    setCredentials({
      email: "guestMangaHaven@gmail.com",
      password: "guestMangaHaven",
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = () => {
    setIsLoadingGoogle(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleEmailSignIn = async () => {
    if (credentials.email && credentials.password) {
      setIsLoading(true);
      toast.loading("Login ...");
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        callbackUrl: "/dashboard",
        action: "login",
      });
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.status === 200) {
        toast.success("Login successful");
      }
    } else {
      toast.error("Please enter your email and password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 [background:radial-gradient(circle,rgba(86,6,156,1)_1%,rgba(13,13,13,0.8)_77%)] ">
      <Card className="w-full max-w-md border border-zinc-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-center text-white">
            Login To{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ml-2">
              MangaHaven
            </span>
          </CardTitle>
          <CardDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col gap-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-zinc-500" />
                Email
              </label>
              <Input
                value={credentials.email}
                name="email"
                onChange={handleInputChange}
                id="email"
                placeholder="Enter your email"
                className="rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-zinc-500" />
                Password
              </label>
              <Input
                value={credentials.password}
                onChange={handleInputChange}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </a>
            </div>
            <Button
              disabled={isLoading}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 py-5 rounded-md transition-all"
              onClick={handleEmailSignIn}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <div className="relative my-2">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white dark:bg-zinc-900 px-2 text-xs text-zinc-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoadingGoogle}
              variant="outline"
              className="w-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 py-5 rounded-md transition-all"
            >
              {isLoadingGoogle ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <FcGoogle className="h-5 w-5" />
              )}
              Sign in with Google
            </Button>
            <ShinyButton onClick={guestLogin} className="">
              use guest Email & Password
            </ShinyButton>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-all"
            >
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
