## [Unreleased]
### Added
- Implemented `AuthProvider` and `useAuth` hook in `src/components/context/auth-context.tsx` for global authentication state and actions using Firebase Auth.
- Implemented AuthGuard client component for auth-based rerouting in Next.js App Router.
- User menu component (`src/components/ui/user-menu.tsx`) with profile, settings, subscription, and logout options, using Shadcn UI, lucide-react, and Tailwind.
- Integrated user menu at the bottom of the desktop sidebar in `src/components/ui/sidebar.tsx`.
- Added `category-dropdown.tsx` component for category selection dropdown using Radix UI, Shadcn UI, and Tailwind.
- Added `filter.tsx` to wrap the dropdown and manage selected state.
- Updated `page.tsx` to use the new filter and display filtered products, matching the dropdown menu UI/UX from the provided screenshot.
- Created `ProductListItem` component in `src/app/(dashboard)/base-products/components/product-list-item.tsx` for product card UI matching design reference.
- Created a global Axios instance in `src/lib/fetcher.ts` for API requests, with default headers and TypeScript support.

### Changed
- Wrapped the app in `AuthProvider` in `src/app/layout.tsx` to provide authentication context throughout the app.
- Refactored `SignInForm` (`src/app/auth/components/sign-in-form.tsx`) to use `useAuth` for sign-in, loading, and error states, removing direct Firebase usage.
- Refactored `SignUpForm` (`src/app/auth/components/sign-up-form.tsx`) to use `useAuth` for sign-up, loading, and error states, removing direct Firebase usage.
- Updated `src/app/auth/components/social-auth-buttons.tsx` to use SVG icons from `public/icons/` (Google, YouTube, Facebook) via Next.js Image component instead of lucide-react icons.
- Wrapped `/dashboard` and `/auth` layouts in AuthGuard and Suspense for protected/public route enforcement.

### Fixed
- Resolved `Module not found: Can't resolve 'canvas'` error from `konva`/`react-konva` in Next.js by aliasing 'canvas' to an empty module in `next.config.ts`.

### Added
- Implemented Firebase Auth sign-up in `src/app/auth/components/sign-up-form.tsx` with error/loading state, user profile update, and UI feedback.

### Notes
- All authentication logic is now centralized in the context for maintainability and scalability.
- Local validation and error handling are preserved in both forms.
- Logout functionality clears localStorage and redirects to `/auth/sign-in`.

## [1.0.0] - 2025-06-01
### Added
- Created `ProductListItem` component in `src/app/(dashboard)/base-products/components/product-list-item.tsx` for product card UI matching design reference.
