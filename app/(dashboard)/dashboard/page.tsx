"use client";

import {
  ChevronRight,
  Gift,
  HelpCircle,
  Home,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

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
    discount: "20%",
    validTill: "Mar 15",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "2",
    title: "Buy 1 Get 1 Free on Fashion",
    merchant: "Lifestyle",
    discount: "BOGO",
    validTill: "Mar 20",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    id: "3",
    title: "₹500 Cashback on Groceries",
    merchant: "BigBasket",
    discount: "₹500",
    validTill: "Mar 18",
    gradient: "from-blue-400 to-blue-500",
  },
];

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("home");

  const user = session?.user;
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        <div className=" bg-white" />

        <div className="px-5  pb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Welcome back</p>
              <h1 className="text-xl font-semibold text-gray-900">
                Hello, {userName}
              </h1>
            </div>
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-purple-100">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] text-white text-xl font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] -z-10 opacity-20" />
            </div>
          </div>
        </div>

        <div className="px-5 mb-6">
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

        <div className="px-5 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why 1fi?</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-xs font-medium text-gray-900">
                  Instant Cashback
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-xs font-medium text-gray-900">
                  200+ Merchants
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-xs font-medium text-gray-900">
                  Best Rewards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-5 mb-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] flex items-center justify-center">
                  <Gift className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Start Your Journey Today
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Open your account in minutes and enjoy seamless banking
                  </p>
                  <Button className="w-full bg-gradient-to-r from-[#8c27fc] to-[#4f12ad] hover:from-[#7c27e6] hover:to-[#4a12a0] text-white font-semibold">
                    Get Started
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-5 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Hottest Deals
          </h2>
          <div className="space-y-3">
            {dealsData.map((deal) => (
              <Card
                key={deal.id}
                className="border border-gray-200 shadow-sm overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-24 h-24 rounded-lg bg-gradient-to-br ${deal.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <ShoppingBag className="w-10 h-10 text-white" />
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

        <div className="px-5 mb-6">
          <Card className="bg-gradient-to-br from-[#8c27fc] to-[#4f12ad] border-0 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Refer & Earn ₹500
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Invite friends and earn rewards for each successful referral
                  </p>
                  <Button className="bg-white text-[#712CDC] hover:bg-gray-100 font-semibold rounded-full px-6">
                    Invite Now
                  </Button>
                </div>
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-10 h-10 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqData.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
