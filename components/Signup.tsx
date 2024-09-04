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

const Signup: React.FC = () => {
  const [email, setEmail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail((prev) => ({ ...prev, [name]: value }));
  };

  const session = useSession();
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleEmailSignIn = async () => {
    if (email.password !== "" && email.password === email.confirmPassword) {
      const res = await signIn("credentials", {
        email: email.email, // Use the email state
        password: email.password, // Use the password state
        name: email.name,
        redirect: true,
        callbackUrl: "/",
        action: "signup",
      });
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.status === 200) {
        toast.success("Signup successful");
      }
    } else {
      toast.error("Password do not match");
    }
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
          <div className="h-[55vh] w-full flex flex-col gap-3 ">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium ">
                User Name
              </label>
              <Input
                name="name"
                onChange={handleInputChange}
                id="name"
                placeholder="Enter your username"
                className=""
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium ">
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
              <label htmlFor="password" className="text-sm font-medium ">
                Password
              </label>
              <Input
                onChange={handleInputChange}
                name="password"
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
                onChange={handleInputChange}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="border-zinc-300"
              />
            </div>
            <Button className="mt-4  " onClick={handleEmailSignIn}>
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
              Already have an account ?{" "}
              <a href="/login" className="font-semibold hover:underline">
                Login
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
