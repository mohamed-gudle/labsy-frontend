"use client";

import { useState } from 'react';
import { PasswordInput } from './password-input';
import { SocialAuthButtons } from './social-auth-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/context/auth-context';

export const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const { signUp, loading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLocalError(null);
    if (!isHuman) {
      setLocalError('Please verify you are not a robot.');
      return;
    }
    if (!name || !email || !password) {
      setLocalError('All fields are required.');
      return;
    }
    await signUp(email, password);
    // Optionally: update displayName after signUp if needed
  };

  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create with Spring by Amaze. Sell on social.</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Your name or Brand name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Minimum 6 characters"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
        {localError && <p className="text-red-500 text-sm">{localError}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleSignUp} className="w-full" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        By creating your account, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Already have an account? <a href="/auth/sign-in" className="text-blue-500">Log In</a>
      </p>
      <div className="mt-6">
        <p className="text-center text-gray-500 mb-2">or</p>
        <SocialAuthButtons
          onGoogleClick={() => console.log('Google Sign-Up')}
          onFacebookClick={() => console.log('Facebook Sign-Up')}
          onYouTubeClick={() => console.log('YouTube Sign-Up')}
        />
      </div>
    </div>
  );
};