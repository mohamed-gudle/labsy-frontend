'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, createUserWithEmailAndPassword, sendPasswordResetEmail, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
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
    };

    const signOut = async () => {
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
    };

    const signUp = async (email: string, password: string) => {
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
    };

    const resetPassword = async (email: string) => {
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
    };

    const contextValue = useMemo(() => ({ user, loading, error, signIn, signOut, signUp, resetPassword }), [user, loading, error]);

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
