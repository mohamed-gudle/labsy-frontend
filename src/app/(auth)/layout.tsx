import { AuthProvider } from '@/context/auth-context';
import { AuthGuard } from '@/guards/auth-guard';
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="text-center">
                            <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" />
                            <p className="text-gray-600">Loading...</p>
                        </div>
                    </div>
                }
            >
                <AuthGuard mode="public">{children}</AuthGuard>
            </Suspense>
        </AuthProvider>
    );
}