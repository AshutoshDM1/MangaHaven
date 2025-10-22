'use client';
import React from 'react';
import FormLayout from '@/components/common/FormLayout/FormLayout';
import { AuthForm, signupSchema } from '@/components/common/Form';
import Link from 'next/link';

const Signup: React.FC = () => {
  const signupConfig = {
    type: 'signup' as const,
    title: 'Create an account',
    subtitle: (
      <>
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-purple-400 hover:text-purple-300"
        >
          Log in
        </Link>
      </>
    ),
    fields: [
      {
        name: 'firstName',
        label: 'First name',
        type: 'text',
        placeholder: 'First name',
        required: true,
      },
      {
        name: 'lastName',
        label: 'Last name',
        type: 'text',
        placeholder: 'Last name',
        required: true,
      },
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
      {
        name: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Confirm Password',
        required: true,
      },
    ],
    submitButtonText: 'Create account',
    schema: signupSchema,
    showTerms: true,
    showForgotPassword: false,
  };

  return (
    <FormLayout
      image="/images/from-layout/signup.webp"
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
        { text: 'Signup', href: '/signup' },
      ]}
    >
      <AuthForm config={signupConfig} />
    </FormLayout>
  );
};

export default Signup;
