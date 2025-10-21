'use client';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface FormCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
  touched?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  label,
  error,
  touched,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-end space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={cn(
            'mt-0.5',
            error && touched && 'border-red-500 cursor-pointer'
          )}
        />
        <label
          htmlFor={id}
          className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && touched && (
        <p className="text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

