"use client";

import { useState } from 'react';
import { PasswordInput } from './password-input';
import { SocialAuthButtons } from './social-auth-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [isHuman, setIsHuman] = useState(false);

  const handleSignIn = () => {
    if (!isHuman) {
      alert('Please verify you are not a robot.');
      return;
    }
    // Add Firebase sign-in logic here
    console.log('Sign-In:', { email });
  };

  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Login to Spring by Amaze.</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="recaptcha"
            checked={isHuman}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsHuman(e.target.checked)}
          />
          <Label htmlFor="recaptcha">I&apos;m not a robot</Label>
        </div>
        <Button onClick={handleSignIn} className="w-full">Log In</Button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        <a href="#" className="text-blue-500">Reset your password</a>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        New to Spring by Amaze? <a href="/auth/sign-up" className="text-blue-500">Create an account</a>
      </p>
      <div className="mt-6">
        <p className="text-center text-gray-500 mb-2">or</p>
        <SocialAuthButtons
          onGoogleClick={() => console.log('Google Sign-In')}
          onFacebookClick={() => console.log('Facebook Sign-In')}
          onYouTubeClick={() => console.log('YouTube Sign-In')}
        />
      </div>
    </div>
  );
};