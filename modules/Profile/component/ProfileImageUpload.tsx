import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileImageUploadProps {
  file: File | null;
  disabled: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (e: React.FormEvent) => void;
}

export const ProfileImageUpload = ({
  file,
  disabled,
  onFileChange,
  onUpload,
}: ProfileImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          disabled={disabled}
          ref={fileInputRef}
          className="cursor-pointer"
          onChange={onFileChange}
          id="picture"
          type="file"
          accept="image/*"
        />
      </div>
      <Button
        type="button"
        disabled={!file || disabled}
        onClick={onUpload}
        className="bg-transparent text-white border-[1px] border-[#cbcbcb25] hover:bg-transparent hover:border-[#cbcbcbb0] cursor-pointer"
      >
        Upload
      </Button>
    </div>
  );
};
