"use client";

import {
  ChevronLeft,
  FileText,
  HelpCircle,
  LogOut,
  Shield,
  Star,
  Ticket,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/shared/MobileNav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Wallet,
  },
  {
    title: "Refer & Earn",
    href: "/refer",
    icon: Users,
  },
  {
    title: "Account",
    href: "/account",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Profile details",
    href: "/profile/details",
    icon: User,
    parent: "/profile",
  },
  {
    title: "KYC Verification",
    href: "/profile/kyc",
    icon: Shield,
    parent: "/profile",
  },
  {
    title: "Invite friends",
    href: "/profile/invite",
    icon: Users,
    parent: "/profile",
  },
  {
    title: "Raise a ticket",
    href: "/profile/ticket",
    icon: Ticket,
    parent: "/profile",
  },
  {
    title: "Support and FAQs",
    href: "/profile/support",
    icon: HelpCircle,
    parent: "/profile",
  },
  {
    title: "Statement",
    href: "/profile/statement",
    icon: FileText,
    parent: "/profile",
  },
  {
    title: "Rate us",
    href: "#",
    icon: Star,
    parent: "/profile",
  },
];

function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const userName = user?.name || "User";
  const userPhone = user?.phoneNumber || "";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isActive = (href: string) => {
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const mainItems = navItems.filter((item) => !item.parent);
  const profileItems = navItems.filter((item) => item.parent);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] text-sidebar-primary-foreground">
                  <span className="text-white font-bold text-sm">1fi</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg">1Fi</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Profile Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
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

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-purple-100">
                <User className="size-5 text-[#712CDC]" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  {userPhone
                    ? `+91${userPhone.replace(/\d(?=\d{4})/g, "*")}`
                    : "Phone not set"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-8 pb-24 lg:pb-8">
          {children}
        </main>
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
