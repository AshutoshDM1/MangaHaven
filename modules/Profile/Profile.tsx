'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { editProfile, getProfile, UploadImage } from '@/services/apiv2.user';
import { toast } from 'sonner';
import { BackButton } from './component/BackButton';
import { ProfileAvatar } from './component/ProfileAvatar';
import { ProfileImageUpload } from './component/ProfileImageUpload';
import { ProfileFormFields } from './component/ProfileFormFields';

export default function Profile() {
  const { data: session } = useSession();
  
  // Form state
  const [firstName, setFirstName] = useState(session?.user?.firstName || '');
  const [lastName, setLastName] = useState(session?.user?.lastName || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [file, setFile] = useState<File | null>(null);
  const [disabled, setDisabled] = useState(true);
  
  // Original values for comparison
  const [originalFirstName, setOriginalFirstName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  
  // Track if file has been uploaded
  const [imageUploaded, setImageUploaded] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    // Reset upload status when new file is selected
    setImageUploaded(false);
  };

  const fetchProfile = async () => {
    const response = await getProfile(session?.user?.email || '');
    if (response !== null && response !== undefined) {
      const fetchedFirstName = response.firstName || '';
      const fetchedLastName = response.lastName || '';
      const fetchedImage = response.image || '';
      
      setFirstName(fetchedFirstName);
      setLastName(fetchedLastName);
      setImage(fetchedImage);
      
      // Store original values
      setOriginalFirstName(fetchedFirstName);
      setOriginalLastName(fetchedLastName);
      setOriginalImage(fetchedImage);
      
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  // Handle file upload to Cloudinary via your Next.js API route
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('No file selected for upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      toast.loading('Uploading image...');
      const imageUrl = await UploadImage(formData);
      toast.dismiss();
      if (imageUrl?.url) {
        setImage(imageUrl.url);
        setImageUploaded(true);
        // UploadImage service already shows success toast
      }
    } catch (error) {
      toast.dismiss();
      console.log('Failed to upload image:', error);
      toast.error('Failed to upload image');
    }
  };

  // Check if there are any changes
  const hasChanges = useMemo(() => {
    const nameChanged = firstName !== originalFirstName || lastName !== originalLastName;
    const imageChanged = image !== originalImage;
    return nameChanged || imageChanged;
  }, [firstName, lastName, image, originalFirstName, originalLastName, originalImage]);

  // Check if save should be disabled
  const isSaveDisabled = useMemo(() => {
    // If form is disabled (Google/Github profile), disable save
    if (disabled) return true;
    
    // If file is selected but not uploaded, disable save
    if (file && !imageUploaded) return true;
    
    // If no changes at all, disable save
    if (!hasChanges) return true;
    
    return false;
  }, [disabled, file, imageUploaded, hasChanges]);

  // Handle profile submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission if validation fails
    if (isSaveDisabled) {
      if (file && !imageUploaded) {
        toast.error('Please upload the selected image before saving');
      } else if (!hasChanges) {
        toast.error('No changes to save');
      }
      return;
    }

    try {
      toast.loading('Updating profile...');
      await editProfile({
        email: session?.user?.email || '',
        firstName: firstName,
        lastName: lastName,
        image: image,
      });
      // Reset file and upload status after successful save
      setFile(null);
      setImageUploaded(false);
      // Update original values to reflect saved state
      setOriginalFirstName(firstName);
      setOriginalLastName(lastName);
      setOriginalImage(image);
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.dismiss();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <BackButton />
      <Card className="w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View and edit your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <ProfileAvatar image={image} firstName={firstName} />
            <ProfileImageUpload
              file={file}
              disabled={disabled}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
            />
            <ProfileFormFields
              firstName={firstName}
              lastName={lastName}
              image={image}
              disabled={disabled}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={isSaveDisabled}
          >
            {!disabled ? 'Save Profile' : "Google/Github Profile can't be edited"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
