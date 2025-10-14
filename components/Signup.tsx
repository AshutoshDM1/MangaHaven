"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { Loader, Apple, ArrowLeft } from "lucide-react";
import { ShinyButton } from "./ui/ShinyButton";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

const Signup: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = () => {
    setIsLoadingGoogle(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubSignIn = () => {
    setIsLoadingGithub(true);
    signIn("github", { callbackUrl: "/dashboard" });
  };

  const handleEmailSignIn = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    if (
      formData.password !== "" &&
      formData.password === formData.confirmPassword
    ) {
      setIsLoading(true);
      toast.loading("Signing up...");
      const data = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        action: "signup",
        redirect: true,
        callbackUrl: "/dashboard",
      };
      const res = await signIn("credentials", data);
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.status === 200) {
        toast.success("Signup successful");
      }
    } else {
      toast.error("Passwords do not match");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#0D0D0D]">
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800"></div>

        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/woman-contemplates-mountainous-landscape_23-2151984542.jpg?uid=R161799923&semt=ais_hybrid&w=740')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/MangaHaven Logo.png" alt="logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-semibold">MangaHaven</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Capturing Moments,
            </h1>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Creating Memories
            </h1>

            <div className="flex space-x-2">
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-1 bg-gray-300/50 rounded-full"></div>
              <div className="w-2 h-1 bg-gray-300/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex items-center justify-center p-8 bg-[#0D0D0D] relative">
        <button
          onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 transition-all duration-200 w-fit absolute top-4 right-4 px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-600 backdrop-blur-sm bg-[#1a1a1a] shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </button>
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-semibold text-white">
              MangaHaven
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              Create an account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Log in
              </button>
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-300"
                >
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="h-12 bg-zinc-800 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-300"
                >
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  onChange={handleInputChange}
                    placeholder="Last name"
                    className="h-12 bg-zinc-800 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                onChange={handleInputChange}
                type="email"
                placeholder="Email"
                className="h-12 bg-zinc-800 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Enter your password
              </label>
              <Input
                id="password"
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
                className="h-12 bg-zinc-800 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                type="password"
                placeholder="Confirm Password"
                className="h-12 bg-zinc-800 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-start space-x-3">
              <label
                htmlFor="terms"
                className="text-sm text-gray-400"
              >
                By creating an account you agree to the{" "}
                <button className="text-purple-400 hover:text-purple-300 underline">
                  Terms & Conditions
                </button>
              </label>
            </div>

            <Button
              onClick={handleEmailSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoadingGoogle}
                variant="outline"
                className="h-12 bg-zinc-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2"
              >
                {isLoadingGoogle ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <FcGoogle className="h-5 w-5" />
                )}
                Google
              </Button>
              <Button
                onClick={handleGithubSignIn}
                disabled={isLoadingGithub}
                variant="outline"
                className="h-12 bg-zinc-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2"
              >
                {isLoadingGithub ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <FaGithub className="h-5 w-5" />
                )}
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
