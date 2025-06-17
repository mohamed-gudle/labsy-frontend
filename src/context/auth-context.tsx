"use client";

import { getCurrentUser } from "@/lib/api/users";
import { auth } from "@/lib/firebase/config";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  authError: string | null; // New error state for authentication/user fetching errors
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsAuthenticated(!!firebaseUser);
      console.log(!!firebaseUser ? "User is authenticated" : "User is not authenticated");
      setAuthError(null);
      if (firebaseUser) {
        try {
          const response = await getCurrentUser();
          console.log("Fetched user data:", response);
          setUser(response);
        } catch (err: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (
            err.response?.data?.message === "User not found in database" &&
            !window.location.pathname.startsWith("/onboarding")
          ) {
            console.warn("User not found in database, redirecting to onboarding");
            window.location.href = "/onboarding";
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
      console.error("Sign in error:", err);
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to sign in.");
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
      console.error("Google sign in error:", err);
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to sign in with Google.");
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
      console.error("Sign out error:", err);
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to sign out.");
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
      console.error("Sign up error:", err);
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to sign up.");
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
      console.error("Reset password error:", err);
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to send reset email.");
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
      console.error("Error getting Firebase token:", error);
      return null;
    }
  }, [user]);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      if (!user) return null;
      const token = await user.getIdToken(true); // Force refresh
      return token;
    } catch (error) {
      console.error("Error refreshing Firebase token:", error);
      return null;
    }
  }, [user]);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      authError,
      isAuthenticated,
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      resetPassword,
      getFirebaseToken,
      refreshToken,
      clearAuthError,
    }),
    [
      user,
      loading,
      error,
      authError,
      isAuthenticated,
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      resetPassword,
      getFirebaseToken,
      refreshToken,
      clearAuthError,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
