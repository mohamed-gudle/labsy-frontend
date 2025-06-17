'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { AuthError } from './auth-error';

interface AuthErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: string; onRetry: () => void }>;
}

/**
 * AuthErrorBoundary component that wraps your app and shows an error page
 * when there's an authentication error (like failing to fetch current user)
 */
export const AuthErrorBoundary: React.FC<AuthErrorBoundaryProps> = ({
    children,
    fallback: FallbackComponent
}) => {
    const { authError, loading } = useAuth();

    // Don't show error during initial loading
    if (loading) {
        return <>{children}</>;
    }

    // Show error if there's an auth error
    if (authError) {
        const handleRetry = () => {
            // Retry by refreshing the page
            window.location.reload();
        };

        if (FallbackComponent) {
            return <FallbackComponent error={authError} onRetry={handleRetry} />;
        }

        return <AuthError error={authError} onRetry={handleRetry} />;
    }

    return <>{children}</>;
};
