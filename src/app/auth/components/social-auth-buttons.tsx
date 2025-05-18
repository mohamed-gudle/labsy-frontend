"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface SocialAuthButtonsProps {
  onGoogleClick: () => void;
  onFacebookClick: () => void;
  onYouTubeClick: () => void;
}

export const SocialAuthButtons = ({
  onGoogleClick,
  onFacebookClick,
  onYouTubeClick,
}: SocialAuthButtonsProps) => {
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={onYouTubeClick}
      >
        <Image
          src="/icons/youtube.svg"
          alt="YouTube logo"
          width={20}
          height={20}
          className="mr-2 h-5 w-5"
          priority={false}
        />
        Continue with YouTube
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={onGoogleClick}
      >
        <Image
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2 h-5 w-5"
          priority={false}
        />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={onFacebookClick}
      >
        <Image
          src="/icons/facebook.svg"
          alt="Facebook logo"
          width={20}
          height={20}
          className="mr-2 h-5 w-5"
          priority={false}
        />
        Continue with Facebook
      </Button>
    </div>
  );
};