"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  Gift,
  Copy,
  Check,
  Share2,
  Trophy,
  ArrowRight,
  Wallet,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function InvitePage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "1Fi2026";
  const referralLink = "https://1Fi.app/invite/1Fi2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { referrals: 1, reward: "₹500", description: "Get ₹500 for each friend" },
    { referrals: 5, reward: "₹3,000", description: "Bonus ₹500 extra" },
    {
      referrals: 10,
      reward: "₹7,000",
      description: "VIP access + priority support",
    },
    {
      referrals: 25,
      reward: "₹20,000",
      description: "Dedicated relationship manager",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Share your link",
      description: "Share your unique referral link with friends",
      icon: <Share2 className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Friend signs up",
      description: "Your friend creates an account using your link",
      icon: <Users className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "You both earn",
      description: "Get ₹500 instantly when they complete verification",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Invite Friends
        </h1>
        <p className="text-gray-500 mt-1">
          Share the app and earn ₹500 for every friend
        </p>
      </div>

      {/* Referral Code Card */}
      <Card className="border-gray-100 shadow-sm bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-purple-100 text-sm mb-2">Your Referral Code</p>
              <p className="text-4xl font-bold tracking-wider">
                {referralCode}
              </p>
              <p className="text-purple-100 text-sm mt-2">
                Share this code or link to earn rewards
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="w-full bg-white text-[#712CDC] hover:bg-purple-50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-[#712CDC] mb-4">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-300 mt-4 rotate-90 sm:rotate-0 sm:mt-0 sm:absolute sm:right-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Tiers */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#712CDC]" />
            Rewards Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {rewards.map((tier) => (
              <div
                key={tier.referrals}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#712CDC] text-white">
                      {tier.referrals} Friends
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {tier.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#712CDC]">
                    {tier.reward}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500 mt-1">Friends Invited</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Wallet className="w-6 h-6 text-[#712CDC]" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹6,000</p>
            <p className="text-sm text-gray-500 mt-1">Total Earned</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹2,500</p>
            <p className="text-sm text-gray-500 mt-1">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Terms */}
      <Card className="border-gray-100 shadow-sm bg-gray-50">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600">
            <strong>Terms & Conditions:</strong> Rewards are credited after your
            referred friend completes their account verification. Maximum reward
            per friend is ₹500. For more details, contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
