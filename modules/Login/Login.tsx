'use client';
import React from 'react';
import FormLayout from '@/components/common/FormLayout/FormLayout';
import { AuthForm, loginSchema } from '@/components/common/Form';
import Link from 'next/link';

const Login: React.FC = () => {
  const loginConfig = {
    type: 'login' as const,
    title: 'Login to your account',
    subtitle: (
      <>
        Don&apos;t have an account?{' '}  
        <Link
          href="/signup"
          className="text-purple-400 hover:text-purple-300"
        >
          Sign up
        </Link>
      </>
    ),
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        name: 'password',
        label: 'Enter your password',
        type: 'password',
        placeholder: 'Password',
        required: true,
      },
    ],
    submitButtonText: 'Create account',
    schema: loginSchema,
    showTerms: false,
    showForgotPassword: true,
  };

  return (
    <FormLayout
      image="/images/from-layout/login.webp"
      imageTexts={[
        {
          text: 'Capturing Moments,',
          className: 'text-4xl lg:text-5xl font-bold leading-tight',
        },
        {
          text: 'Creating Memories.',
          className: 'text-4xl lg:text-5xl font-bold leading-tight',
        },
      ]}
      breadcrumb={[
        { text: 'Home', href: '/' },
        { text: 'Dashboard', href: '/dashboard' },
        { text: 'Login', href: '/login' },
      ]}
    >
      <AuthForm config={loginConfig} />
    </FormLayout>
  );
};

export default Login;
