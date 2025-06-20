"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LayoutDashboard,
  Download,
  Users,
  Plus,
  BookImage,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
// Menu items.
const items = [
  {
    title: "Admin",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Add New Manga",
    url: "/admin/addmanga",
    icon: BookImage,
  },
  {
    title: "Add New Chapter",
    url: "/admin/addnewChapter",
    icon: BookOpen,
  },
  {
    title: "Download Manga",
    url: "/admin/downloadmanga",
    icon: Download,
  },
  {
    title: "Back to Dashboard",
    url: "/dashboard",
    icon: ArrowLeft,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-wrap text-2xl font-bold leading-[1.4] text-primary mb-3">
            MangaHaven{" "}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
