/**
 * User-related TypeScript interfaces and types
 * Centralized type definitions for user management, profiles, and preferences
 */

/**
 * Basic user interface
 * Essential user information
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
}

/**
 * User profile interface
 * Complete user profile information
 */
export interface UserProfile {
    /** Unique user identifier */
    id: string;
    /** User's email address */
    email: string;
    /** User's display name */
    name: string;
    /** User's first name */
    firstName?: string;
    /** User's last name */
    lastName?: string;
    /** User's avatar/profile image URL */
    avatar?: string;
    /** User's bio/description */
    bio?: string;
    /** User's location */
    location?: string;
    /** User's website URL */
    website?: string;
    /** User's phone number */
    phone?: string;
    /** User's date of birth */
    dateOfBirth?: Date;
    /** User's preferred language */
    language: string;
    /** User's timezone */
    timezone: string;
    /** Account creation timestamp */
    createdAt: Date;
    /** Last profile update timestamp */
    updatedAt: Date;
    /** Last login timestamp */
    lastLoginAt?: Date;
    /** Whether the user's email is verified */
    emailVerified: boolean;
    /** Whether the user's phone is verified */
    phoneVerified: boolean;
    /** User's role in the system */
    role: 'user' | 'admin' | 'moderator';
    /** Whether the user's account is active */
    isActive: boolean;
    /** Whether the user's account is suspended */
    isSuspended: boolean;
}

/**
 * User preferences interface
 * User's application preferences and settings
 */
export interface UserPreferences {
    /** Theme preference */
    theme: 'light' | 'dark' | 'system';
    /** Language preference */
    language: string;
    /** Timezone preference */
    timezone: string;
    /** Email notification preferences */
    emailNotifications: boolean;
    /** Push notification preferences */
    pushNotifications: boolean;
    /** Marketing email preferences */
    marketingEmails: boolean;
    /** Whether two-factor authentication is enabled */
    twoFactorEnabled: boolean;
    /** Privacy settings */
    privacy: {
        /** Profile visibility */
        profileVisibility: 'public' | 'private' | 'friends';
        /** Show online status */
        showOnlineStatus: boolean;
        /** Allow search engines to index profile */
        searchEngineIndexing: boolean;
    };
    /** Notification preferences */
    notifications: {
        /** Email notifications for orders */
        orderUpdates: boolean;
        /** Email notifications for design feedback */
        designFeedback: boolean;
        /** Email notifications for new features */
        productUpdates: boolean;
        /** SMS notifications */
        sms: boolean;
    };
}

/**
 * User settings update interface
 * Data for updating user settings
 */
export interface UserSettingsUpdate {
    /** Updated name */
    name?: string;
    /** Updated bio */
    bio?: string;
    /** Updated location */
    location?: string;
    /** Updated website */
    website?: string;
    /** Updated phone number */
    phone?: string;
    /** Updated preferences */
    preferences?: Partial<UserPreferences>;
    /** Updated avatar file */
    avatar?: File;
}

/**
 * User activity interface
 * Represents user activity events
 */
export interface UserActivity {
    /** Activity identifier */
    id: string;
    /** User who performed the activity */
    userId: string;
    /** Type of activity */
    type: 'login' | 'logout' | 'profile_update' | 'password_change' | 'design_upload' | 'order_placed' | 'product_created';
    /** Activity description */
    description: string;
    /** Activity timestamp */
    timestamp: Date;
    /** IP address where activity occurred */
    ipAddress?: string;
    /** User agent string */
    userAgent?: string;    /** Additional activity metadata */
    metadata?: Record<string, unknown>;
}

/**
 * User statistics interface
 * User engagement and usage statistics
 */
export interface UserStatistics {
    /** Total number of designs created */
    designsCreated: number;
    /** Total number of products created */
    productsCreated: number;
    /** Total number of orders placed */
    ordersPlaced: number;
    /** Total amount spent */
    totalSpent: number;
    /** Number of days since last login */
    daysSinceLastLogin: number;
    /** Most used features */
    topFeatures: string[];
    /** Favorite product categories */
    favoriteCategories: string[];
}

/**
 * User search parameters interface
 * Parameters for searching and filtering users
 */
export interface UserSearchParams {
    /** Search query */
    query?: string;
    /** Filter by role */
    role?: 'user' | 'admin' | 'moderator';
    /** Filter by verification status */
    emailVerified?: boolean;
    /** Filter by active status */
    isActive?: boolean;
    /** Filter by suspension status */
    isSuspended?: boolean;
    /** Filter by creation date range */
    createdAfter?: Date;
    /** Filter by creation date range */
    createdBefore?: Date;
    /** Sort field */
    sortBy?: 'name' | 'email' | 'createdAt' | 'lastLoginAt';
    /** Sort direction */
    sortOrder?: 'asc' | 'desc';
    /** Page number */
    page?: number;
    /** Items per page */
    limit?: number;
}

/**
 * User list response interface
 * Response format for user list requests
 */
export interface UserListResponse {
    /** Array of users */
    users: UserProfile[];
    /** Total number of users */
    total: number;
    /** Current page */
    page: number;
    /** Items per page */
    limit: number;
    /** Total number of pages */
    totalPages: number;
}

/**
 * User invitation interface
 * Data for inviting new users
 */
export interface UserInvitation {
    /** Invitation identifier */
    id: string;
    /** Email address to invite */
    email: string;
    /** Role to assign to invited user */
    role: 'user' | 'admin' | 'moderator';
    /** Invitation message */
    message?: string;
    /** User who sent the invitation */
    invitedBy: string;
    /** Invitation creation timestamp */
    createdAt: Date;
    /** Invitation expiration timestamp */
    expiresAt: Date;
    /** Whether invitation has been accepted */
    accepted: boolean;
    /** Acceptance timestamp */
    acceptedAt?: Date;
}

/**
 * User role update interface
 * Data for updating user roles (admin only)
 */
export interface UserRoleUpdate {
    /** User ID */
    userId: string;
    /** New role */
    role: 'user' | 'admin' | 'moderator';
    /** Reason for role change */
    reason?: string;
    /** User making the change */
    updatedBy: string;
}

/**
 * User account deletion interface
 * Data for account deletion requests
 */
export interface UserAccountDeletion {
    /** Email confirmation */
    confirmEmail: string;
    /** Password confirmation */
    password: string;
    /** Reason for deletion */
    reason?: string;
    /** Whether user confirms deletion */
    confirmDeletion: boolean;
    /** Scheduled deletion date */
    scheduledFor?: Date;
}

/**
 * User notification interface
 * Represents a user notification
 */
export interface UserNotification {
    /** Notification identifier */
    id: string;
    /** User ID */
    userId: string;
    /** Notification type */
    type: 'info' | 'warning' | 'error' | 'success';
    /** Notification title */
    title: string;
    /** Notification message */
    message: string;
    /** Whether notification has been read */
    read: boolean;
    /** Notification creation timestamp */
    createdAt: Date;
    /** Action URL if applicable */
    actionUrl?: string;
    /** Action button text */
    actionText?: string;    /** Additional notification metadata */
    metadata?: Record<string, unknown>;
}

/**
 * User session interface
 * Represents an active user session
 */
export interface UserSession {
    /** Session identifier */
    id: string;
    /** User ID */
    userId: string;
    /** Device information */
    device: {
        /** Device type */
        type: 'desktop' | 'mobile' | 'tablet';
        /** Operating system */
        os: string;
        /** Browser name */
        browser: string;
    };
    /** Location information */
    location?: {
        /** Country */
        country: string;
        /** City */
        city: string;
        /** IP address */
        ip: string;
    };
    /** Session creation timestamp */
    createdAt: Date;
    /** Last activity timestamp */
    lastActivityAt: Date;
    /** Whether this is the current session */
    isCurrent: boolean;
}

/**
 * User quota interface
 * User's usage limits and quotas
 */
export interface UserQuota {
    /** Maximum number of designs */
    maxDesigns: number;
    /** Current number of designs */
    currentDesigns: number;
    /** Maximum number of products */
    maxProducts: number;
    /** Current number of products */
    currentProducts: number;
    /** Maximum storage in bytes */
    maxStorage: number;
    /** Current storage usage in bytes */
    currentStorage: number;
    /** Quota reset date */
    resetDate: Date;
}
