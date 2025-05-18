## [Unreleased]
### Added
- Implemented `AuthProvider` and `useAuth` hook in `src/components/context/auth-context.tsx` for global authentication state and actions using Firebase Auth.
- Implemented AuthGuard client component for auth-based rerouting in Next.js App Router.

### Changed
- Wrapped the app in `AuthProvider` in `src/app/layout.tsx` to provide authentication context throughout the app.
- Refactored `SignInForm` (`src/app/auth/components/sign-in-form.tsx`) to use `useAuth` for sign-in, loading, and error states, removing direct Firebase usage.
- Refactored `SignUpForm` (`src/app/auth/components/sign-up-form.tsx`) to use `useAuth` for sign-up, loading, and error states, removing direct Firebase usage.
- Updated `src/app/auth/components/social-auth-buttons.tsx` to use SVG icons from `public/icons/` (Google, YouTube, Facebook) via Next.js Image component instead of lucide-react icons.
- Wrapped `/dashboard` and `/auth` layouts in AuthGuard and Suspense for protected/public route enforcement.

### Added
- Implemented Firebase Auth sign-up in `src/app/auth/components/sign-up-form.tsx` with error/loading state, user profile update, and UI feedback.

### Notes
- All authentication logic is now centralized in the context for maintainability and scalability.
- Local validation and error handling are preserved in both forms.
