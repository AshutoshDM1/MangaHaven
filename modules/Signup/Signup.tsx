"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { Loader, Apple, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import FormLayout from "@/components/common/FormLayout/FormLayout";

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
    <FormLayout>
    </FormLayout>
  );
};

export default Signup;
