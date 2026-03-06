"use client";

import {
  ChevronRight,
  Gift,
  HelpCircle,
  Home,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import AccordionItem, {
  AccordionGroup,
} from "@/components/shared/AccordionItem";
import BottomNav, { type NavItem } from "@/components/shared/BottomNav";
import MerchantCard from "@/components/shared/MerchantCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: (isActive) => <Home className="w-6 h-6" />,
  },
  {
    id: "offers",
    label: "Offers",
    icon: (isActive) => <Gift className="w-6 h-6" />,
  },
  {
    id: "account",
    label: "Account",
    icon: (isActive) => <Wallet className="w-6 h-6" />,
    href: "/account",
  },
  {
    id: "profile",
    label: "Profile",
    icon: (isActive) => <User className="w-6 h-6" />,
    href: "/profile",
  },
];

const faqData = [
  {
    id: "faq-1",
    question: "What is 1Fi and how does it work?",
    answer:
      "1Fi is a smart savings platform that helps you save money on everyday purchases. Shop at partner merchants and get instant cashback and rewards.",
  },
  {
    id: "faq-2",
    question: "How do I earn cashback?",
    answer:
      "Simply shop at any of our partner merchants using your linked account. Cashback is automatically credited to your wallet within 24-48 hours.",
  },
  {
    id: "faq-3",
    question: "How can I withdraw my savings?",
    answer:
      "You can withdraw your savings directly to your bank account. Minimum withdrawal amount is ₹500. Processing time is 2-3 business days.",
  },
  {
    id: "faq-4",
    question: "Are there any fees for using 1Fi?",
    answer:
      "No, 1Fi is completely free to use. There are no hidden charges or membership fees.",
  },
];

const dealsData = [
  {
    id: "1",
    title: "Flat 20% off on Electronics",
    merchant: "Croma",
    image: "/api/placeholder/80/80",
    discount: "20%",
    validTill: "Mar 15",
  },
  {
    id: "2",
    title: "Buy 1 Get 1 Free on Fashion",
    merchant: "Lifestyle",
    image: "/api/placeholder/80/80",
    discount: "BOGO",
    validTill: "Mar 20",
  },
  {
    id: "3",
    title: "₹500 Cashback on Groceries",
    merchant: "BigBasket",
    image: "/api/placeholder/80/80",
    discount: "₹500",
    validTill: "Mar 18",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className=" mx-auto">
        <div className="bg-white h-6 sticky top-0 z-50" />

        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] text-white font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] -z-10 opacity-30" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back</p>
                <h1 className="text-lg font-semibold text-gray-900">
                  Hello, {userName}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <Card className="bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] border-0 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white/80 text-sm mb-1">Total Savings</p>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    ₹12,450
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-green-300" />
                    <span className="text-sm text-green-300">
                      +15% this month
                    </span>
                  </div>
                  <Button className="bg-white text-[#712CDC] hover:bg-gray-100 font-semibold">
                    View Details
                  </Button>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Wallet className="w-12 h-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Why 1fi?</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Instant Cashback
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  200+ Merchants
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Best Rewards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] flex items-center justify-center flex-shrink-0">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Invite Friends & Earn
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Get ₹100 for every friend who joins
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#712CDC] text-[#712CDC] hover:bg-purple-50"
                  >
                    Invite Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Hottest Deals
            </h2>
            <Button
              variant="ghost"
              className="text-[#712CDC] text-sm font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {dealsData.map((deal) => (
              <Card
                key={deal.id}
                className="border-0 shadow-sm overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {deal.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {deal.merchant}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-[#712CDC]/10 text-[#712CDC] text-xs"
                        >
                          {deal.discount} OFF
                        </Badge>
                        <span className="text-xs text-gray-400">
                          Valid till {deal.validTill}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <Card className="bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white mb-2">
                    Limited Time
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Refer & Earn ₹500
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Share your referral code and earn rewards
                  </p>
                  <Button className="bg-white text-[#712CDC] hover:bg-gray-100 font-semibold">
                    Share Now
                  </Button>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Gift className="w-12 h-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <AccordionGroup>
            {({ toggle, isOpen }) => (
              <>
                {faqData.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    id={faq.id}
                    title={faq.question}
                    isOpen={isOpen(faq.id)}
                    onToggle={() => toggle(faq.id)}
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionItem>
                ))}
              </>
            )}
          </AccordionGroup>
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Nearby Merchants
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <MerchantCard
              name="Croma Electronics"
              address="Tower C, UNITECH CYBER PARK"
              category="Electronics"
              rating={4.5}
              onDirectionsClick={() => console.log("Directions clicked")}
            />
            <MerchantCard
              name="Lifestyle Store"
              address="DLF Mall of India"
              category="Fashion"
              rating={4.3}
              onDirectionsClick={() => console.log("Directions clicked")}
            />
            <MerchantCard
              name="BigBasket"
              address="Sector 18, Noida"
              category="Groceries"
              rating={4.7}
              onDirectionsClick={() => console.log("Directions clicked")}
            />
          </div>
        </div>
      </div>

      <BottomNav
        items={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        maxWidth="393px"
      />
    </div>
  );
}
