# Auth Error Handling Guide

This guide explains how to handle authentication errors, specifically when fetching the current user fails, with several different approaches.

## Problem

Originally, your auth context was silently catching errors when `getCurrentUser()` failed:

```tsx
// Before - silently catches errors
try {
    await getCurrentUser();
} catch {
    // Silent error - user never knows what happened
}
```

## Solutions

### Option 1: Global Error Boundary (Recommended)

The simplest approach - wrap your entire app with an error boundary that automatically shows an error page when authentication fails.

**Setup:**
Your `app/layout.tsx` is already set up with this:

```tsx
import { AuthErrorBoundary } from "@/components/auth";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html>
        <body>
          <AuthErrorBoundary>
            {children}
          </AuthErrorBoundary>
        </body>
      </html>
    </AuthProvider>
  );
}
```

**What happens:**
- When `getCurrentUser()` fails, the auth context sets an `authError` state
- `AuthErrorBoundary` detects this error and shows the `AuthError` component
- User sees a professional error page with retry options
- No code changes needed in other components

### Option 2: Layout-Specific Error Handling

Show different error components in different parts of your app.

**Example - Dashboard-specific error:**

```tsx
// In your dashboard layout
import { AuthErrorBoundary, DashboardError } from "@/components/auth";

export default function DashboardLayout({ children }) {
  return (
    <AuthErrorBoundary fallback={DashboardError}>
      {children}
    </AuthErrorBoundary>
  );
}
```

### Option 3: Component-Level Error Handling

For fine-grained control, handle user data and errors in specific components.

**Example:**

```tsx
import { useCurrentUser } from '@/hooks/use-current-user';

function ProfileComponent() {
  const { userData, loading, error, retry } = useCurrentUser({
    onError: (error) => {
      // Custom error handling
      console.error('Profile load failed:', error);
    },
    retryOnError: true, // Auto retry
    retryDelay: 5000
  });

  if (loading) return <div>Loading profile...</div>;
  
  if (error) {
    return (
      <div className="error-state">
        <p>Failed to load profile: {error}</p>
        <button onClick={retry}>Try Again</button>
      </div>
    );
  }

  return <div>Profile data: {userData?.name}</div>;
}
```

### Option 4: Manual Retry Hook

For custom retry functionality anywhere in your app.

```tsx
import { useRefetchUser } from '@/hooks/use-refetch-user';

function CustomErrorComponent() {
  const { refetchUser, isRefetching } = useRefetchUser();

  return (
    <button 
      onClick={refetchUser} 
      disabled={isRefetching}
    >
      {isRefetching ? 'Retrying...' : 'Retry'}
    </button>
  );
}
```

## Components Available

### AuthError
Full-page error component with multiple actions:
- Retry button with loading state
- Sign out option
- Navigation to home
- Contact support link

### DashboardError
Lighter error component for dashboard pages:
- Focused on quick retry
- Less dramatic styling
- Dashboard-specific navigation

### AuthErrorBoundary
Wrapper component that detects auth errors and conditionally shows error UI:
- Supports custom fallback components
- Handles loading states
- Automatic error detection

## Current Implementation

With the changes made, your app now:

1. ✅ **Catches getCurrentUser errors** in the auth context
2. ✅ **Sets authError state** instead of silent catch
3. ✅ **Global error boundary** wraps your entire app
4. ✅ **Professional error page** shows when user fetch fails
5. ✅ **Retry functionality** with loading states
6. ✅ **Multiple fallback options** for different scenarios

## Testing

To test the error handling:

1. **Simulate network error**: Temporarily modify `getCurrentUser()` to throw an error
2. **Check error display**: Verify the error page appears
3. **Test retry**: Confirm the retry button works
4. **Test navigation**: Verify the "Go to Home" and "Sign Out" buttons work

## Best Practices

1. **Use global boundary for most cases** - Option 1 covers 90% of scenarios
2. **Add specific handling for critical flows** - Use Option 3 for important user actions
3. **Provide clear error messages** - Tell users what went wrong and how to fix it
4. **Always offer retry options** - Network issues are often temporary
5. **Log errors for debugging** - Keep console.error calls for development

## Migration Path

If you want to remove the global error boundary later:

1. Remove `<AuthErrorBoundary>` from `layout.tsx`
2. Add error handling to individual pages/components using Option 3
3. Use the `useCurrentUser` hook where you need user data

The modular approach means you can mix and match these solutions as needed.
