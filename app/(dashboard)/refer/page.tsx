"use client";

import {
  Check,
  CheckCircle2,
  Copy,
  Gift,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

export default function ReferPage() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const user = session?.user;
  const referralCode = `1FI${user?.id?.slice(0, 6).toUpperCase() || "2026ABC"}`;
  const referralLink = `https://1fi.app/invite/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join 1Fi and earn rewards!",
          text: `Use my referral code ${referralCode} to sign up on 1Fi and we both earn ₹500!`,
          url: referralLink,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  const rewards = [
    {
      referrals: 1,
      reward: "₹500",
      description: "Get ₹500 for each friend who joins",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      referrals: 5,
      reward: "₹3,000",
      description: "Bonus ₹500 extra on 5 referrals",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      referrals: 10,
      reward: "₹7,000",
      description: "VIP status + priority support",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      referrals: 25,
      reward: "₹20,000",
      description: "Dedicated relationship manager",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Share your code",
      description: "Send your unique referral code or link to friends",
      icon: <Share2 className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Friend signs up",
      description: "They create an account using your referral code",
      icon: <Users className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Both earn ₹500",
      description: "You both get ₹500 after they complete verification",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Refer & Earn
        </h1>
        <p className="text-gray-500 mt-1">
          Invite friends and earn ₹500 for each successful referral
        </p>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Earn ₹500 Per Friend
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Share your referral code and both you and your friend earn ₹500
                when they sign up and complete verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleShare}
                  className="bg-white text-[#712CDC] hover:bg-purple-50 font-semibold"
                  size="lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Now
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Gift className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <p className="text-3xl font-bold tracking-wider text-[#712CDC]">
                  {referralCode}
                </p>
                <Button
                  onClick={handleCopyCode}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                >
                  {copiedCode ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Share this code with your friends
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500">Friends Invited</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <Wallet className="w-6 h-6 text-[#712CDC]" />
                </div>
                <p className="text-2xl font-bold text-gray-900">₹6,000</p>
                <p className="text-xs text-gray-500">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <Badge className="mb-2 bg-purple-100 text-[#712CDC]">
                  Step {item.step}
                </Badge>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#712CDC]" />
            Rewards Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {rewards.map((tier, index) => (
              <div
                key={tier.referrals}
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-100 hover:border-purple-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] flex items-center justify-center text-white flex-shrink-0">
                  {tier.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#712CDC] text-white">
                      {tier.referrals} Friend{tier.referrals > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {tier.description}
                  </p>
                  <p className="text-xl font-bold text-[#712CDC]">
                    {tier.reward}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Important Terms
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • Rewards are credited after friend completes account
                  verification
                </li>
                <li>• Maximum reward per successful referral is ₹500</li>
                <li>• Referral code can be used by new users only</li>
                <li>• Rewards are credited within 24-48 hours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
