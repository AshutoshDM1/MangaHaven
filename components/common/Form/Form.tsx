/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { FormField } from './FormField';
import { FormCheckbox } from './FormCheckbox';
import { SocialButton } from './SocialButton';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export type FormType = 'login' | 'signup';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface FormConfig {
  type: FormType;
  title: string;
  subtitle: React.ReactNode;
  fields: FormField[];
  submitButtonText: string;
  schema: z.ZodSchema;
  showTerms?: boolean;
  showForgotPassword?: boolean;
}

interface AuthFormProps {
  config: FormConfig;
}

const AuthForm: React.FC<AuthFormProps> = ({ config }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(
    config.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate single field on blur
    try {
      config.schema.parse(formData);
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.issues.find((err: z.ZodIssue) => err.path[0] === name);
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [name]: fieldError.message }));
        }
      }
    }
  };

  const validateForm = (): boolean => {
    try {
      config.schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        setTouched(config.fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}));
      }
      return false;
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoadingGoogle(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGithubSignIn = () => {
    setIsLoadingGithub(true);
    signIn('github', { callbackUrl: '/dashboard' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check terms for signup
    if (config.showTerms && !agreedToTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading(config.type === 'login' ? 'Logging in...' : 'Signing up...');

    try {
      const data: any = {
        email: formData.email,
        password: formData.password,
        action: config.type,
        redirect: true,
        callbackUrl: '/dashboard',
      };

      if (config.type === 'signup') {
        data.firstName = formData.firstName;
        data.lastName = formData.lastName;
      }

      const res = await signIn('credentials', data);

      toast.dismiss(toastId);

      if (res?.error) {
        toast.error(res.error);
      } else if (res?.status === 200 || res?.ok) {
        toast.success(config.type === 'login' ? 'Login successful!' : 'Signup successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center justify-center gap-2 my-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <img src="/favicon.webp" alt="logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-xl font-semibold text-white">MangaHaven</span>
      </div>

      {/* Title Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">{config.title}</h2>
        <p className="text-gray-400">{config.subtitle}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="space-y-4">
          {config.fields.map((field) => (
            <FormField
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors[field.name]}
              touched={touched[field.name]}
              required={field.required}
            />
          ))}
        </div>

        {/* Forgot Password Link */}
        {config.showForgotPassword && (
          <div className="flex items-start">
            <label className="text-sm text-gray-400">
              Forgot your password?{' '}
              <Link
                href="/reset-password"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Reset Password
              </Link>
            </label>
          </div>
        )}

        {/* Terms & Conditions */}
        {config.showTerms && (
          <FormCheckbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={setAgreedToTerms}
            label={
              <>
                By creating an account you agree to the{' '}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                  Terms & Conditions
                </Link>
              </>
            }
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : config.submitButtonText}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0D0D0D] text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Social Sign In Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            onClick={handleGoogleSignIn}
            disabled={isLoadingGoogle}
            isLoading={isLoadingGoogle}
            icon={<FcGoogle className="h-5 w-5" />}
            label="Google"
          />
          <SocialButton
            onClick={handleGithubSignIn}
            disabled={isLoadingGithub}
            isLoading={isLoadingGithub}
            icon={<FaGithub className="h-5 w-5" />}
            label="Github"
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
