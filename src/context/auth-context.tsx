'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, createUserWithEmailAndPassword, sendPasswordResetEmail, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getCurrentUser } from '@/lib/api/users';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    authError: string | null; // New error state for authentication/user fetching errors
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getFirebaseToken: () => Promise<string | null>;
    refreshToken: () => Promise<string | null>;
    clearAuthError: () => void; // Function to clear auth errors
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setAuthError(null);

            if (firebaseUser) {
                // Skip API call if on onboarding pages to prevent infinite loops
                const isOnboardingPage = typeof window !== 'undefined' &&
                    window.location.pathname.includes('/onboarding');

                if (!isOnboardingPage) {
                    try {
                        await getCurrentUser();
                    } catch (err: unknown) {
                        console.error('Error fetching current user:', err);

                        // Set auth error for display
                        if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                            setAuthError((err as { message: string }).message);
                        } else {
                            setAuthError('Failed to load user profile. Please try refreshing the page or contact support if the issue persists.');
                        }
                    }
                }
            }

            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            console.error('Sign in error:', err);
            if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setError((err as { message: string }).message);
            } else {
                setError('Failed to sign in.');
            }

        } finally {
            setLoading(false);
        }
    }, []);

    const signInWithGoogle = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: unknown) {
            console.error('Google sign in error:', err);
            if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setError((err as { message: string }).message);
            } else {
                setError('Failed to sign in with Google.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            await firebaseSignOut(auth);
        } catch (err: unknown) {
            console.error('Sign out error:', err);
            if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setError((err as { message: string }).message);
            } else {
                setError('Failed to sign out.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const signUp = useCallback(async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            console.error('Sign up error:', err);
            if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setError((err as { message: string }).message);
            } else {
                setError('Failed to sign up.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        setError(null);
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err: unknown) {
            console.error('Reset password error:', err);
            if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setError((err as { message: string }).message);
            } else {
                setError('Failed to send reset email.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const getFirebaseToken = useCallback(async (): Promise<string | null> => {
        try {
            if (!user) return null;
            const token = await user.getIdToken();
            return token;
        } catch (error) {
            console.error('Error getting Firebase token:', error);
            return null;
        }
    }, [user]);

    const refreshToken = useCallback(async (): Promise<string | null> => {
        try {
            if (!user) return null;
            const token = await user.getIdToken(true); // Force refresh
            return token;
        } catch (error) {
            console.error('Error refreshing Firebase token:', error);
            return null;
        }
    }, [user]);

    const clearAuthError = useCallback(() => {
        setAuthError(null);
    }, []);

    const contextValue = useMemo(() => ({
        user,
        loading,
        error,
        authError,
        signIn,
        signInWithGoogle,
        signOut,
        signUp,
        resetPassword,
        getFirebaseToken,
        refreshToken,
        clearAuthError
    }), [user, loading, error, authError, signIn, signInWithGoogle, signOut, signUp, resetPassword, getFirebaseToken, refreshToken, clearAuthError]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
