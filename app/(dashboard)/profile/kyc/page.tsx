"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
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
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface FormData {
  email: string;
  panNumber: string;
  fullName: string;
  dateOfBirth: string;
}

interface FormErrors {
  email?: string;
  panNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
}

// PAN card format validation: 5 letters, 4 numbers, 1 letter (AAAAA1234A)
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KYCPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    panNumber: "",
    fullName: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!EMAIL_REGEX.test(value)) return "Invalid email format";
        break;
      case "panNumber":
        if (!value) return "PAN number is required";
        if (!PAN_REGEX.test(value.toUpperCase()))
          return "Invalid PAN format (e.g., AAAAA1234A)";
        break;
      case "fullName":
        if (!value) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        break;
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const dob = new Date(value);
        if (isNaN(dob.getTime())) return "Invalid date format";
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        let calculatedAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          calculatedAge--;
        }
        if (calculatedAge < 18) return "You must be at least 18 years old";
        break;
    }
    return undefined;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate on change if field has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const fields: (keyof FormData)[] = [
      "email",
      "panNumber",
      "fullName",
      "dateOfBirth",
    ];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      email: true,
      panNumber: true,
      fullName: true,
      dateOfBirth: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          panNumber: formData.panNumber.toUpperCase(),
          fullName: formData.fullName,
          dateOfBirth: formData.dateOfBirth,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "KYC submitted successfully!");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.message || "Failed to submit KYC");
      }
    } catch (error) {
      console.error("KYC Submit Error:", error);
      setSubmitStatus("error");
      setSubmitMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate max date (must be 18 years ago)
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            KYC Verification
          </h1>
          <p className="text-gray-500 mt-1">
            Complete your KYC to access all features
          </p>
        </div>
      </div>

      {/* KYC Form Card */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-[#712CDC]" />
            KYC Details
          </CardTitle>
          <CardDescription>
            Please provide your details as per your PAN card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email ID <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={cn(
                    "pl-10 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]",
                    errors.email &&
                      touched.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* PAN Number Field */}
            <div className="space-y-2">
              <Label htmlFor="panNumber" className="text-gray-700">
                PAN Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="panNumber"
                  type="text"
                  placeholder="Enter PAN number (e.g., AAAAA1234A)"
                  value={formData.panNumber}
                  onChange={(e) =>
                    handleChange("panNumber", e.target.value.toUpperCase())
                  }
                  onBlur={() => handleBlur("panNumber")}
                  maxLength={10}
                  className={cn(
                    "pl-10 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC] uppercase",
                    errors.panNumber &&
                      touched.panNumber &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                />
              </div>
              {errors.panNumber && touched.panNumber && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.panNumber}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Format: 5 letters, 4 numbers, 1 letter (e.g., AAAAA1234A)
              </p>
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name (as per PAN) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name as per PAN card"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  className={cn(
                    "pl-10 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]",
                    errors.fullName &&
                      touched.fullName &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                />
              </div>
              {errors.fullName && touched.fullName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-gray-700">
                Date of Birth (as per PAN){" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  onBlur={() => handleBlur("dateOfBirth")}
                  max={maxDate}
                  className={cn(
                    "pl-10 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]",
                    errors.dateOfBirth &&
                      touched.dateOfBirth &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                />
              </div>
              {errors.dateOfBirth && touched.dateOfBirth && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* Submit Status */}
            {submitStatus !== "idle" && (
              <div
                className={cn(
                  "p-4 rounded-lg flex items-start gap-3",
                  submitStatus === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700",
                )}
              >
                {submitStatus === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {submitStatus === "success" ? "Success!" : "Error"}
                  </p>
                  <p className="text-sm mt-1">{submitMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#712CDC] hover:bg-[#5b24b5] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit KYC"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-gray-100 shadow-sm bg-purple-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#712CDC] flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                Why is KYC required?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                KYC (Know Your Customer) is required by regulatory guidelines to
                verify your identity. This helps us ensure secure transactions
                and comply with legal requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
