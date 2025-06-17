/**
 * Authentication Components
 * Centralized exports for authentication-related components
 */

export { SocialAuthButtons } from './social-auth-buttons';
export { PasswordInput } from './password-input';
export { AuthError } from './auth-error';
export { AuthErrorBoundary } from './auth-error-boundary';

// Re-export auth types for convenience
export type { User } from '@/lib/types/auth';
