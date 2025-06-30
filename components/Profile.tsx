import { useState, useRef, useEffect } from "react";
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
import { editProfile, getProfile, UploadImage } from "@/services/apiv2.user";
import { toast } from "sonner";

export default function Profile() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState(session?.user?.firstName || "");
  const [lastName, setLastName] = useState(session?.user?.lastName || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [disabled, setDisabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const fetchProfile = async () => {
    const response = await getProfile(session?.user?.email || "");
    if (response !== null && response !== undefined) {
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setImage(response.image);
      setDisabled(false);
      console.log("Response", response);
    }
    else {
      console.log("No response");
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
      toast.error("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      toast.loading("Updating profile...");
      const imageUrl = await UploadImage(formData);
      console.log(imageUrl.url);
      setImage(imageUrl.url);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  // Handle profile submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Updating profile...");
      await editProfile({
        email: session?.user?.email || "",
        firstName: firstName,
        lastName: lastName,
        image: image,
      });
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
                alt={firstName}
              />
              <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                disabled={disabled}
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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              disabled={disabled}
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              disabled={disabled}
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Profile Picture URL</Label>
            <Input id="image" value={image} readOnly />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" disabled={disabled}>
          {!disabled ? "save Profile" : "Google/Github Profile can't be edited"}
        </Button>
      </CardFooter>
    </Card>
  );
}
