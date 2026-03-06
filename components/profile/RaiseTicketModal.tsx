"use client";

import { useState } from "react";

interface RaiseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { category: string; description: string }) => void;
}

const categories = [
  "Transaction/Payment/KYC",
  "Credit Card",
  "Bonds",
  "Others",
];

export default function RaiseTicketModal({
  isOpen,
  onClose,
  onSubmit,
}: RaiseTicketModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Generate random ticket number
    const generatedTicket = Math.floor(
      1000000 + Math.random() * 9000000,
    ).toString();
    setTicketNumber(generatedTicket);
    setStep("success");
    onSubmit?.({ category, description });
  };

  const handleClose = () => {
    setStep("form");
    setCategory("");
    setDescription("");
    setTicketNumber("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden animate-slide-up"
        style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
      >
        {step === "form" ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Raise Ticket
              </h2>
              <button
                onClick={handleClose}
                className="w-5 h-5 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
              {/* Category Selection */}
              <div className="mb-5">
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        category === cat
                          ? "border-[#712CDC] bg-white"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          category === cat ? "text-[#712CDC]" : "text-gray-700"
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Details of your issue
                </label>
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your message here"
                    rows={8}
                    maxLength={2000}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#712CDC] transition-colors resize-none text-sm"
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-gray-500">
                    {description.length}/2000
                  </span>
                </div>
              </div>

              {/* Attach Image */}
              <div className="mb-6">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  Attach a image
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!category || !description}
                className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    category && description ? "#712CDC" : "#9CA3AF",
                }}
              >
                Raise ticket
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div
              className="flex flex-col px-8 pt-8 pb-4"
              style={{ backgroundColor: "#f9fafb" }}
            >
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClose}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-30 h-30 rounded-full bg-green-100 flex items-center justify-center"
                  style={{ width: "122px", height: "122px" }}
                >
                  <svg
                    className="w-16 h-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Ticket raised successfully
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our team will respond to your query as soon as possible.
                  Please check your email for updates on this ticket
                </p>
              </div>

              {/* Ticket Number */}
              <div
                className="flex justify-between items-center px-4 py-3 bg-white rounded-lg mb-4"
                style={{ border: "1px solid #e6e6e6" }}
              >
                <span className="text-base font-medium text-gray-500">
                  Ticket number
                </span>
                <span className="text-base font-medium text-gray-800">
                  {ticketNumber}
                </span>
              </div>

              {/* Understood Button */}
              <div className="px-5" style={{ backgroundColor: "#f9fafb" }}>
                <button
                  onClick={handleClose}
                  className="w-full h-14 rounded-full text-white font-medium transition-colors"
                  style={{ backgroundColor: "#712CDC" }}
                >
                  Understood
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
