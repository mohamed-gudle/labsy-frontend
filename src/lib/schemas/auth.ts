import { z } from "zod";

/**
 * Sign in schema
 * Validates user login credentials
 */
export const signInSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z.string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),

    rememberMe: z.boolean().optional(),
});

/**
 * Sign up schema
 * Validates user registration data
 */
export const signUpSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),

    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string()
        .min(1, "Please confirm your password"),

    agreeToTerms: z.boolean()
        .refine(val => val === true, "You must agree to the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

/**
 * Reset password schema
 * Validates password reset requests
 */
export const resetPasswordSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
});

/**
 * Change password schema
 * Validates password change requests
 */
export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, "Current password is required"),

    newPassword: z.string()
        .min(1, "New password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),

    confirmNewPassword: z.string()
        .min(1, "Please confirm your new password"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
});

/**
 * Update profile schema
 * Validates profile update data
 */
export const updateProfileSchema = z.object({
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

    avatar: z.instanceof(File)
        .refine(file => !file || file.size <= 5 * 1024 * 1024, "Avatar must be less than 5MB")
        .refine(
            file => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Avatar must be a JPEG, PNG, or WebP image"
        )
        .optional(),
});

/**
 * Two-factor authentication setup schema
 */
export const twoFactorSetupSchema = z.object({
    secret: z.string().min(1, "Secret is required"),
    token: z.string()
        .min(6, "Token must be 6 digits")
        .max(6, "Token must be 6 digits")
        .regex(/^\d{6}$/, "Token must be 6 digits"),
});

/**
 * Two-factor authentication verification schema
 */
export const twoFactorVerificationSchema = z.object({
    token: z.string()
        .min(6, "Token must be 6 digits")
        .max(6, "Token must be 6 digits")
        .regex(/^\d{6}$/, "Token must be 6 digits"),
});

// Export type inference
export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type TwoFactorSetupData = z.infer<typeof twoFactorSetupSchema>;
export type TwoFactorVerificationData = z.infer<typeof twoFactorVerificationSchema>;
