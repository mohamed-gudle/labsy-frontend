import { AuthProvider } from '@/components/context/auth-context';
import { AuthGuard } from '@/components/auth-guard/auth-guard';
import React, { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span>Loading...</span></div>}>
                <AuthGuard mode="public">{children}</AuthGuard>
            </Suspense>
        </AuthProvider>
    );
}