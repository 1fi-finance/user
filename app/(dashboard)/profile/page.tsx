"use client";

import {
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  Shield,
  Star,
  Ticket,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

function MenuItem({
  title,
  subtitle,
  icon,
  href,
  onClick,
  badge,
}: MenuItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all cursor-pointer group",
      )}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#712CDC] group-hover:bg-purple-100 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-gray-900 truncate">
            {title}
          </h3>
          {badge && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-[#712CDC] text-xs"
            >
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 truncate">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#712CDC] transition-colors" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [completionPercentage] = useState(100);

  const user = session?.user;
  const userName = user?.name || "User";
  const userPhone = user?.phoneNumber || "";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const menuItems = [
    {
      id: "profile-details",
      title: "Profile details",
      subtitle: "Update your info easily.",
      icon: <User className="w-6 h-6" />,
      href: "/profile/details",
    },
    {
      id: "kyc-verification",
      title: "KYC Verification",
      subtitle: "Complete your KYC for all features.",
      icon: <Shield className="w-6 h-6" />,
      href: "/profile/kyc",
      badge: "Required",
    },
    {
      id: "invite-friends",
      title: "Invite friends",
      subtitle: "Share the app, spread the benefits.",
      icon: <Users className="w-6 h-6" />,
      href: "/profile/invite",
      badge: "Earn ₹500",
    },
    {
      id: "raise-ticket",
      title: "Raise a ticket",
      subtitle: "We typically response within 1h",
      icon: <Ticket className="w-6 h-6" />,
      href: "/profile/ticket",
    },
    {
      id: "support",
      title: "Support and FAQs",
      subtitle: "Find solutions to your queries",
      icon: <HelpCircle className="w-6 h-6" />,
      href: "/profile/support",
    },
    {
      id: "rate-us",
      title: "Rate us on Play Store",
      subtitle: "Love the app? Leave a review.",
      icon: <Star className="w-6 h-6" />,
      onClick: () => console.log("Rate us clicked"),
    },
    {
      id: "statement",
      title: "Statement",
      subtitle: "Keep an eye on every transaction",
      icon: <FileText className="w-6 h-6" />,
      href: "/profile/statement",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Profile
        </h1>
        <p className="text-gray-500 mt-1">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-purple-100">
                <AvatarImage src={user?.image || ""} alt={userName} />
                <AvatarFallback className="bg-purple-100 text-[#712CDC] text-2xl font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              {completionPercentage === 100 && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {userName}
                </h2>
                {completionPercentage === 100 && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-500 mt-1">
                {userPhone
                  ? `+91${userPhone.replace(/\d(?=\d{4})/g, "*")}`
                  : "Phone not set"}
              </p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Profile completion
                  </span>
                  <span className="text-sm font-medium text-[#712CDC]">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#712CDC] to-[#9B6BFF] rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="outline"
              className="border-purple-200 text-[#712CDC] hover:bg-purple-50 hover:border-purple-300"
            >
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 px-1">
          Quick Actions
        </h3>
        <div className="grid gap-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              href={item.href}
              onClick={item.onClick}
              badge={item.badge}
            />
          ))}
        </div>
      </div>

      {/* App Info */}
      <Card className="border-gray-100 shadow-sm bg-gray-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">1Fi App</p>
                <p className="text-sm text-gray-500">Version 1.0.0</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-[#712CDC]">
              Check for updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
