import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { editProfile, UploadImage } from "@/services/api";
import { toast } from "sonner";

export default function Profile() {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Handle file upload to Cloudinary via your Next.js API route
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const imageUrl = await UploadImage(formData);
      setImage(imageUrl);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  // Handle profile submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Updating profile...");
      await editProfile(session?.user?.email || "", username, image);
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          View and edit your profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
            <Avatar className="h-fit w-[10vh] mx-auto object-cover ">
              <AvatarImage
                src={image || "https://github.com/shadcn.png"}
                alt={username}
              />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                ref={fileInputRef}
                onChange={handleFileChange}
                id="picture"
                type="file"
              />
            </div>
            <Button
              onClick={handleUpload}
              className="bg-transparent text-white border-[1px] border-[#cbcbcb25] hover:bg-transparent hover:border-[#cbcbcbb0]"
            >
              Upload
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Profile Picture URL</Label>
            <Input id="image" value={image} readOnly />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
