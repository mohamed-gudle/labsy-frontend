'use client';

import { useAuth } from '@/components/context/auth-context';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
    mode: 'protected' | 'public';
}

export function AuthGuard({ children, mode }: AuthGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (mode === 'protected' && !user) {
                router.replace('/auth/sign-in');
            } else if (mode === 'public' && user) {
                router.replace('/dashboard');
            }
        }
    }, [user, loading, mode, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
        );
    }

    if (mode === 'protected' && !user) return null;
    if (mode === 'public' && user) return null;

    return <>{children}</>;
}
