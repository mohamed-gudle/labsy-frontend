"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { PasswordInput } from "@/components/auth";
import { SocialAuthButtons } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle, loading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLocalError(null);
    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }
    await signIn(email, password);
  };

  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
      <h1 className="font-poppins text-2xl font-semibold mb-6">
        Login to Labsy
      </h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        {localError && <p className="text-red-500 text-sm">{localError}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleSignIn} className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        <a href="/reset-password" className="text-blue-500">
          Reset your password
        </a>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        New to Labsy?{" "}
        <a href="/sign-up" className="text-blue-500">
          Create an account
        </a>
      </p>
      <div className="mt-6">
        <p className="text-center text-gray-500 mb-2">or</p>
        <SocialAuthButtons onGoogleClick={() => signInWithGoogle()} />
      </div>
    </div>
  );
};
