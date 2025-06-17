import { useAuth } from '@/context/auth-context';
import { getCurrentUser } from '@/lib/api/users';
import { useState, useCallback } from 'react';

/**
 * Hook to manually refetch user data and handle errors
 * Useful for retry functionality in error components
 */
export const useRefetchUser = () => {
    const [isRefetching, setIsRefetching] = useState(false);
    const { clearAuthError } = useAuth();

    const refetchUser = useCallback(async () => {
        setIsRefetching(true);
        clearAuthError();

        try {
            await getCurrentUser();
            // Success - the auth context will update automatically
        } catch (error) {
            // Error will be handled by auth context
            console.error('Failed to refetch user:', error);
        } finally {
            setIsRefetching(false);
        }
    }, [clearAuthError]);

    return {
        refetchUser,
        isRefetching
    };
};
