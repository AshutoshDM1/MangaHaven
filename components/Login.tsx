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
} from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const session = useSession();
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleEmailSignIn = async () => {
    if (credentials.email && credentials.password) {
      toast.loading("Login ...");
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        callbackUrl: "/",
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border border-zinc-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Log in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[40vh] w-full flex flex-col gap-3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                name="email"
                onChange={handleInputChange}
                id="email"
                placeholder="Enter your email"
                className=""
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                onChange={handleInputChange}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-zinc-300"
              />
            </div>
            <Button className="mt-4" onClick={handleEmailSignIn}>
              Log in
            </Button>

            <div className="mt-4">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full bg-blue-600 hover:bg-blue-400"
              >
                Login in with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-semibold hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
