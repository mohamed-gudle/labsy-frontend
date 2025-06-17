"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  alt: string;
}

interface SocialAuthButtonsProps {
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
  onYouTubeClick?: () => void;
  onProviderClick?: (providerId: string) => void;
  providers?: SocialProvider[];
  isLoading?: boolean;
  loadingProvider?: string;
  className?: string;
}

const defaultProviders: SocialProvider[] = [

  {
    id: "google",
    name: "Google",
    icon: "/icons/google.svg",
    alt: "Google logo",
  }
];

/**
 * Social authentication buttons component
 * Provides OAuth login options for various social platforms
 */
export const SocialAuthButtons = ({
  onGoogleClick,
  onFacebookClick,
  onYouTubeClick,
  onProviderClick,
  providers = defaultProviders,
  isLoading = false,
  loadingProvider,
  className = "",
}: SocialAuthButtonsProps) => {
  const handleProviderClick = (providerId: string) => {
    if (isLoading) return;

    // Use specific handlers if provided, otherwise use generic handler
    switch (providerId) {
      case "google":
        onGoogleClick?.() || onProviderClick?.(providerId);
        break;
      case "facebook":
        onFacebookClick?.() || onProviderClick?.(providerId);
        break;
      case "youtube":
        onYouTubeClick?.() || onProviderClick?.(providerId);
        break;
      default:
        onProviderClick?.(providerId);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => handleProviderClick(provider.id)}
          disabled={isLoading}
        >
          {loadingProvider === provider.id ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
          ) : (
            <Image
              src={provider.icon}
              alt={provider.alt}
              width={20}
              height={20}
              className="mr-2 h-5 w-5"
              priority={false}
            />
          )}
          Continue with {provider.name}
        </Button>
      ))}
    </div>
  );
};
