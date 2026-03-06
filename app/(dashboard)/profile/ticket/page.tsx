"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Ticket,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Paperclip,
  User,
  Phone,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "pending" | "resolved";
  date: string;
  lastMessage: string;
}

export default function TicketPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      subject: "Unable to complete KYC verification",
      category: "KYC",
      status: "open",
      date: "2nd June 2026",
      lastMessage: "We have received your ticket and are working on it.",
    },
    {
      id: "2",
      subject: "Loan disbursement delayed",
      category: "Loan",
      status: "pending",
      date: "1st June 2026",
      lastMessage: "Please provide additional documents for verification.",
    },
    {
      id: "3",
      subject: "Transaction not reflected in account",
      category: "Transaction",
      status: "resolved",
      date: "28th May 2026",
      lastMessage: "Your issue has been resolved. Please check your account.",
    },
  ]);

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Open
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Resolved
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Raise a Ticket
          </h1>
          <p className="text-gray-500 mt-1">
            We're here to help. Submit your query
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#712CDC] hover:bg-[#5b24b5]">
              <Ticket className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>
                Fill in the details below and we'll get back to you within 1
                hour.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#712CDC]">
                  <option value="">Select a category</option>
                  <option value="kyc">KYC Verification</option>
                  <option value="loan">Loan Related</option>
                  <option value="transaction">Transaction Issue</option>
                  <option value="account">Account Settings</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue in detail..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Attachments (optional)</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-[#712CDC] transition-colors">
                  <Paperclip className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
              <Button className="w-full bg-[#712CDC] hover:bg-[#5b24b5]">
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Support Info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Response Time</p>
              <p className="text-sm text-gray-500">Within 1 hour</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Call Us</p>
              <p className="text-sm text-gray-500">+91 1800 123 4567</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#712CDC]" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Support</p>
              <p className="text-sm text-gray-500">support@1Fi.app</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Your Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        ticket.status === "open" && "bg-blue-100",
                        ticket.status === "pending" && "bg-yellow-100",
                        ticket.status === "resolved" && "bg-green-100",
                      )}
                    >
                      <Ticket
                        className={cn(
                          "w-5 h-5",
                          ticket.status === "open" && "text-blue-600",
                          ticket.status === "pending" && "text-yellow-600",
                          ticket.status === "resolved" && "text-green-600",
                        )}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">
                          {ticket.subject}
                        </h3>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {ticket.lastMessage}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">
                          {ticket.category}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {ticket.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#712CDC] transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tickets yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Create a new ticket to get help
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Help */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "How to complete KYC?", icon: User },
              { title: "Loan disbursement process", icon: Clock },
              { title: "Transaction failed", icon: AlertCircle },
              { title: "Account settings", icon: User },
            ].map((item) => (
              <Button
                key={item.title}
                variant="outline"
                className="justify-start h-auto py-3 text-left"
              >
                <item.icon className="w-4 h-4 mr-2 text-[#712CDC]" />
                <span className="text-sm">{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
