'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useRefetchUser } from '@/hooks/use-refetch-user';

interface AuthErrorProps {
    error: string;
    onRetry?: () => void;
}

export const AuthError: React.FC<AuthErrorProps> = ({ error, onRetry }) => {
    const { clearAuthError, signOut } = useAuth();
    const router = useRouter();
    const { refetchUser, isRefetching } = useRefetchUser();

    const handleRetry = async () => {
        if (onRetry) {
            onRetry();
        } else {
            // Use the refetch hook for more reliable retry
            await refetchUser();
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/sign-in');
        } catch (err) {
            console.error('Error signing out:', err);
            // Force redirect if sign out fails
            window.location.href = '/sign-in';
        }
    };

    const handleGoHome = () => {
        clearAuthError();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-lg w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-gray-900">
                        Authentication Error
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        We encountered an issue while loading your profile
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <p className="text-sm font-medium">Error Details:</p>
                            <p className="text-sm text-gray-700 mt-1">{error}</p>
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col space-y-3">
                        <Button onClick={handleRetry} className="w-full" disabled={isRefetching}>
                            <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                            {isRefetching ? 'Retrying...' : 'Try Again'}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="w-full"
                        >
                            Sign Out & Try Different Account
                        </Button>

                        <Button
                            variant="ghost"
                            onClick={handleGoHome}
                            className="w-full"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go to Home
                        </Button>
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-500">
                            If this problem persists, please{' '}
                            <a
                                href="mailto:support@labsy.com"
                                className="text-blue-600 hover:underline"
                            >
                                contact support
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
