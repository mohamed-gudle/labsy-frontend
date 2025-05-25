"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth?.() || {};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);
        try {
            if (!email) {
                setError("Email is required.");
                setLoading(false);
                return;
            }
            if (resetPassword) {
                await resetPassword(email);
                setMessage("If an account exists for this email, a reset link has been sent.");
            } else {
                setError("Reset password function not available.");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md mx-auto mt-16">
            <h1 className="text-2xl font-semibold mb-6 text-center">Reset your password</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>
                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send reset link"}
                </Button>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center">
                Remembered your password?{' '}
                <Link href="/auth/sign-in" className="text-blue-500">Log In</Link>
            </p>
        </div>
    );
}
