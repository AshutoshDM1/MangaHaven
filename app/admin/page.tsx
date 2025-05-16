import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster } from "sonner";

const AdminPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <Toaster />
        <h1 className="text-3xl font-bold mb-8 text-center">
          Manga Admin Panel
        </h1>
      </div>
    </>
  );
};

export default AdminPage;
