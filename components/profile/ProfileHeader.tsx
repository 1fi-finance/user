"use client";

interface ProfileHeaderProps {
  name: string;
  phone: string;
  completionPercentage?: number;
  avatarUrl?: string;
}

export default function ProfileHeader({
  name,
  phone,
  completionPercentage = 100,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Avatar with completion badge */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-4xl font-medium"
              style={{ backgroundColor: "#712CDC" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {/* Completion badge */}
        {completionPercentage < 100 && (
          <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-[#712CDC] flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {completionPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* User info */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-medium text-gray-900">{name}</h2>
        <p className="text-sm text-gray-500">{phone}</p>
      </div>
    </div>
  );
}
