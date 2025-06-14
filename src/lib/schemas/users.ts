import { z } from "zod";

/**
 * User profile schema
 * Validates user profile data
 */
export const userProfileSchema = z.object({
    id: z.string(),
    name: z.string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),

    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    bio: z.string()
        .max(500, "Bio must be less than 500 characters")
        .optional(),

    avatar: z.string().url().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isVerified: z.boolean().default(false),
    role: z.enum(['user', 'admin', 'moderator']).default('user'),
});

/**
 * User preferences schema
 * Validates user preference settings
 */
export const userPreferencesSchema = z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    language: z.string().default('en'),
    timezone: z.string().default('UTC'),
    emailNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
    twoFactorEnabled: z.boolean().default(false),
});

/**
 * User settings update schema
 * Validates user settings updates
 */
export const userSettingsUpdateSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .optional(),

    bio: z.string()
        .max(500, "Bio must be less than 500 characters")
        .optional(),

    preferences: userPreferencesSchema.partial().optional(),

    avatar: z.instanceof(File)
        .refine(file => !file || file.size <= 5 * 1024 * 1024, "Avatar must be less than 5MB")
        .refine(
            file => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Avatar must be a JPEG, PNG, or WebP image"
        )
        .optional(),
});

/**
 * User search schema
 * Validates user search and filter parameters
 */
export const userSearchSchema = z.object({
    query: z.string().optional(),
    role: z.enum(['user', 'admin', 'moderator']).optional(),
    isVerified: z.boolean().optional(),
    createdAfter: z.date().optional(),
    createdBefore: z.date().optional(),
    limit: z.number().min(1).max(100).default(20),
    offset: z.number().min(0).default(0),
});

/**
 * User account deletion schema
 * Validates account deletion requests
 */
export const userAccountDeletionSchema = z.object({
    confirmEmail: z.string()
        .min(1, "Email confirmation is required")
        .email("Please enter a valid email address"),

    password: z.string()
        .min(1, "Password is required"),

    reason: z.string()
        .max(500, "Reason must be less than 500 characters")
        .optional(),

    confirmDeletion: z.boolean()
        .refine(val => val === true, "You must confirm account deletion"),
});

/**
 * User invitation schema
 * Validates user invitation data
 */
export const userInvitationSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    role: z.enum(['user', 'admin', 'moderator']).default('user'),

    message: z.string()
        .max(500, "Message must be less than 500 characters")
        .optional(),
});

/**
 * User role update schema
 * Validates user role changes (admin only)
 */
export const userRoleUpdateSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    role: z.enum(['user', 'admin', 'moderator']),
    reason: z.string()
        .max(500, "Reason must be less than 500 characters")
        .optional(),
});

// Export type inference
export type UserProfileData = z.infer<typeof userProfileSchema>;
export type UserPreferencesData = z.infer<typeof userPreferencesSchema>;
export type UserSettingsUpdateData = z.infer<typeof userSettingsUpdateSchema>;
export type UserSearchData = z.infer<typeof userSearchSchema>;
export type UserAccountDeletionData = z.infer<typeof userAccountDeletionSchema>;
export type UserInvitationData = z.infer<typeof userInvitationSchema>;
export type UserRoleUpdateData = z.infer<typeof userRoleUpdateSchema>;
