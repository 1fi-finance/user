"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function ProfileDetailsPage() {
  const { data: session, isPending } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const user = session?.user;
  let userName = user?.name || "";

  // Check if name is a phone number (temporary name from phone signup)
  const isPhoneAsName = /^\+?\d{10,15}$/.test(userName.replace(/\s/g, ""));
  if (isPhoneAsName) {
    userName = "";
  }

  const nameParts = userName.split(" ").filter(Boolean);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  const userInitials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // Handle phone number formatting - remove +91 if already present
  const formatPhone = (phone: string | null | undefined) => {
    if (!phone) return "";
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneWithoutCountry = cleanPhone.startsWith("91")
      ? cleanPhone.slice(2)
      : cleanPhone;
    return phoneWithoutCountry ? `+91${phoneWithoutCountry}` : "";
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || "",
    phone: formatPhone(user?.phoneNumber),
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editedData, setEditedData] = useState<FormData>(formData);

  const handleSave = () => {
    setFormData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(formData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Profile Details
          </h1>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#712CDC] hover:bg-[#5b24b5]"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#712CDC] hover:bg-[#5b24b5]"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
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
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 bg-[#712CDC] hover:bg-[#5b24b5]"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-gray-500 mt-1">{formData.email}</p>
              <p className="text-gray-500">{formData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-[#712CDC]" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">
                First Name
              </Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={editedData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {formData.firstName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">
                Last Name
              </Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={editedData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {formData.lastName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {formData.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {formData.phone}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-gray-700">
                Date of Birth
              </Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={editedData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formData.dateOfBirth}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#712CDC]" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="address" className="text-gray-700">
                Street Address
              </Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editedData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {formData.address}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700">
                City
              </Label>
              {isEditing ? (
                <Input
                  id="city"
                  value={editedData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {formData.city}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-gray-700">
                State
              </Label>
              {isEditing ? (
                <Input
                  id="state"
                  value={editedData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {formData.state}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-gray-700">
                Pincode
              </Label>
              {isEditing ? (
                <Input
                  id="pincode"
                  value={editedData.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {formData.pincode}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card className="border-gray-100 shadow-sm bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Account Verified</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your account is fully verified. You have access to all features
                including withdrawals and credit facilities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
