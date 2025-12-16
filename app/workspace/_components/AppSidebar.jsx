"use client";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SidebarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning ",
    icon: Book,
    path: "/workspace/my-learning",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];
const AppSidebar = () => {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          {/* Educational SVG Logo */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-600"
          >
            <path
              d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z"
              fill="currentColor"
            />
            <path
              d="M5 13.18V17.18C5 18.84 8.58 20 12 20C15.42 20 19 18.84 19 17.18V13.18L12 17L5 13.18Z"
              fill="currentColor"
            />
          </svg>

          {/* Text */}
          <h1 className="text-xl font-bold tracking-wide text-gray-900">
            EduNova
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button>Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-5">
                    <Link
                      href={item.path}
                      className={`text-[17px] ${path.includes(item.path) && "text-primary bg-purple-100"
                        }`}
                    >
                      <item.icon className="h-7 w-7"></item.icon>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
