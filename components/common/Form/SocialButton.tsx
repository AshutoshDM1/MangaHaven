'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface SocialButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon: React.ReactNode;
  label: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  label,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="outline"
      type="button"
      className="h-12 bg-zinc-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2 cursor-pointer"
    >
      {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : icon}
      {label}
    </Button>
  );
};

