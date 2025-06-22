/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Authentication-related TypeScript interfaces and types
 * Centralized type definitions for user authentication, authorization, and security
 */

/**
 * User role enumeration
 * Defines the different user roles in the system
 */
export type UserRole = 'user' | 'admin' | 'moderator';

/**
 * Authentication provider enumeration
 * Supported authentication providers
 */
export type AuthProvider = 'email' | 'google' | 'facebook' | 'github' | 'apple';

/**
 * User interface
 * Represents a user account in the system
 */
export interface User {
    /** Unique user identifier */
    id: string;
    /** User's email address */
    email: string;
    /** User's display name */
    name: string;
    /** User's avatar/profile image URL */
    avatar?: string;
    /** User's role in the system */
    role: UserRole;
    /** Whether the user's email is verified */
    emailVerified: boolean;
    /** Whether two-factor authentication is enabled */
    twoFactorEnabled: boolean;
    /** User's preferred language */
    language?: string;
    /** User's timezone */
    timezone?: string;
    /** Account creation timestamp */
    createdAt: Date;
    /** Last update timestamp */
    updatedAt: Date;
    /** Last login timestamp */
    lastLoginAt?: Date;
    /** Authentication provider used */
    provider: AuthProvider;
    /** User's bio/description */
    bio?: string;
}

/**
 * Authentication state interface
 * Represents the current authentication state
 */
export interface AuthState {
    /** Currently authenticated user */
    user: User | null;
    /** Whether authentication is currently loading */
    isLoading: boolean;
    /** Whether user is authenticated */
    isAuthenticated: boolean;
    /** Current authentication error */
    error: string | null;
    /** Authentication token */
    token: string | null;
    /** Token expiration timestamp */
    tokenExpiry: Date | null;
}

/**
 * Sign in credentials interface
 * Data required for email/password authentication
 */
export interface SignInCredentials {
    /** User's email address */
    email: string;
    /** User's password */
    password: string;
    /** Whether to remember the user */
    rememberMe?: boolean;
}

/**
 * Sign up data interface
 * Data required for user registration
 */
export interface SignUpData {
    /** User's full name */
    name: string;
    /** User's email address */
    email: string;
    /** User's chosen password */
    password: string;
    /** Password confirmation */
    confirmPassword: string;
    /** Whether user agrees to terms */
    agreeToTerms: boolean;
    /** Optional referral code */
    referralCode?: string;
}

/**
 * Password reset request interface
 * Data for password reset requests
 */
export interface PasswordResetRequest {
    /** Email address for password reset */
    email: string;
}

/**
 * Password change data interface
 * Data required for password changes
 */
export interface PasswordChangeData {
    /** Current password */
    currentPassword: string;
    /** New password */
    newPassword: string;
    /** New password confirmation */
    confirmNewPassword: string;
}

/**
 * Two-factor authentication setup interface
 * Data for setting up 2FA
 */
export interface TwoFactorSetup {
    /** 2FA secret key */
    secret: string;
    /** QR code data URL */
    qrCodeUrl: string;
    /** Backup codes */
    backupCodes: string[];
}

/**
 * Two-factor authentication verification interface
 * Data for verifying 2FA tokens
 */
export interface TwoFactorVerification {
    /** 6-digit authentication token */
    token: string;
    /** Whether this is a backup code */
    isBackupCode?: boolean;
}

/**
 * Social authentication data interface
 * Data received from social authentication providers
 */
export interface SocialAuthData {
    /** Provider identifier */
    provider: Exclude<AuthProvider, 'email'>;
    /** Provider user ID */
    providerId: string;
    /** User's email from provider */
    email: string;
    /** User's name from provider */
    name: string;
    /** User's avatar from provider */
    avatar?: string;
    /** Access token from provider */
    accessToken: string;
    /** Refresh token if available */
    refreshToken?: string;
}

/**
 * Authentication error interface
 * Standardized error format for authentication failures
 */
export interface AuthError {
    /** Error code */
    code: string;
    /** Human-readable error message */
    message: string;
    /** Additional error details */
    details?: Record<string, any>;
    /** Field-specific errors */
    fieldErrors?: Record<string, string>;
}

/**
 * Authentication session interface
 * Represents an active user session
 */
export interface AuthSession {
    /** Session identifier */
    id: string;
    /** User ID */
    userId: string;
    /** Session creation timestamp */
    createdAt: Date;
    /** Session expiration timestamp */
    expiresAt: Date;
    /** Last activity timestamp */
    lastActivityAt: Date;
    /** IP address of the session */
    ipAddress?: string;
    /** User agent string */
    userAgent?: string;
    /** Whether this is the current session */
    isCurrent: boolean;
}

/**
 * Authentication preferences interface
 * User's authentication and security preferences
 */
export interface AuthPreferences {
    /** Whether to require 2FA for login */
    requireTwoFactor: boolean;
    /** Whether to send login notifications */
    loginNotifications: boolean;
    /** Whether to log out on browser close */
    logoutOnClose: boolean;
    /** Session timeout in minutes */
    sessionTimeout: number;
    /** Allowed authentication providers */
    allowedProviders: AuthProvider[];
}

/**
 * JWT token payload interface
 * Structure of JWT authentication tokens
 */
export interface JWTPayload {
    /** Subject (user ID) */
    sub: string;
    /** User's email */
    email: string;
    /** User's role */
    role: UserRole;
    /** Issued at timestamp */
    iat: number;
    /** Expiration timestamp */
    exp: number;
    /** Token issuer */
    iss: string;
    /** Token audience */
    aud: string;
}

/**
 * Account verification interface
 * Data for email verification process
 */
export interface AccountVerification {
    /** Verification token */
    token: string;
    /** User's email address */
    email: string;
    /** Token expiration timestamp */
    expiresAt: Date;
}

/**
 * Authentication configuration interface
 * Configuration options for authentication system
 */
export interface AuthConfig {
    /** Enabled authentication providers */
    enabledProviders: AuthProvider[];
    /** Whether registration is enabled */
    registrationEnabled: boolean;
    /** Whether email verification is required */
    emailVerificationRequired: boolean;
    /** Password requirements */
    passwordRequirements: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
    };
    /** Session configuration */
    session: {
        maxAge: number;
        renewalThreshold: number;
        maxConcurrentSessions: number;
    };
    /** Rate limiting configuration */
    rateLimiting: {
        maxLoginAttempts: number;
        lockoutDuration: number;
        resetTimeWindow: number;
    };
}
