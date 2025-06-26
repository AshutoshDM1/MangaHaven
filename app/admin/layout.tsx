"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { addManga } from "@/services/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import SideNav from "@/components/Dashboard/SideNav";
import NavbarMain from "@/components/NavBar/NavbarMain";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarMain />
      {children}
    </>
  );
};

export default AdminLayout;
