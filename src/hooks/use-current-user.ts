import { useAuth } from '@/context/auth-context';
import { getCurrentUser } from '@/lib/api/users';
import { useCallback, useEffect, useState } from 'react';

interface UseCurrentUserOptions {
    /** Skip initial fetch if user data isn't needed immediately */
    skip?: boolean;
    /** Custom error handler */
    onError?: (error: Error) => void;
    /** Auto retry on error */
    retryOnError?: boolean;
    /** Retry delay in ms */
    retryDelay?: number;
}

/**
 * Hook to manage current user data with error handling
 * Alternative to global error handling - gives you component-level control
 */
export const useCurrentUser = (options: UseCurrentUserOptions = {}) => {
    const { skip = false, onError, retryOnError = false, retryDelay = 3000 } = options;
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        if (skip) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getCurrentUser();
            if (response.success) {
                setUserData(response.user);
            } else {
                throw new Error(response.message || 'Failed to fetch user data');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);

            if (onError) {
                onError(err instanceof Error ? err : new Error(errorMessage));
            }

            // Auto retry if enabled
            if (retryOnError) {
                setTimeout(fetchUser, retryDelay);
            }
        } finally {
            setLoading(false);
        }
    }, [skip, onError, retryOnError, retryDelay]);

    const retry = useCallback(() => {
        fetchUser();
    }, [fetchUser]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        if (user && !skip) {
            fetchUser();
        }
    }, [user, fetchUser, skip]);

    return {
        userData,
        loading,
        error,
        retry,
        clearError
    };
};
