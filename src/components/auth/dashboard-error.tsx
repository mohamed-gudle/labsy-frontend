'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DashboardErrorProps {
    error: string;
    onRetry: () => void;
}

/**
 * Custom error component specifically for dashboard pages
 * Lighter styling, more focused on getting user back to working state
 */
export const DashboardError: React.FC<DashboardErrorProps> = ({ error, onRetry }) => {
    const router = useRouter();

    return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                        <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg font-medium text-gray-900">
                        Unable to Load Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                    <p className="text-sm text-gray-600 text-center">
                        {error}
                    </p>

                    <div className="flex flex-col space-y-2">
                        <Button onClick={onRetry} className="w-full">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Retry
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            onClick={() => router.push('/dashboard')}
                            className="w-full"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        If the problem persists, try refreshing the page or contact support.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
