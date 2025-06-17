import { z } from "zod";

/**
 * User intent schema
 * Validates user intent selection
 */
export const userIntentSchema = z.enum(
  ["creator", "one-off-purchaser", "factory"],
  {
    errorMap: () => ({ message: "Please select a valid user type" }),
  }
);

/**
 * Intent survey schema
 * Validates intent survey form data
 */
export const intentSurveySchema = z.object({
  intent: userIntentSchema,

  goals: z
    .array(z.string().min(1, "Goal cannot be empty"))
    .optional()
    .default([]),

  referralSource: z
    .string()
    .min(1, "Referral source is required")
    .max(100, "Referral source must be less than 100 characters")
    .optional(),

  completedAt: z.date().default(() => new Date()),
});

/**
 * Personal info schema for creator onboarding
 */
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s.-]+$/, {
      message:
        "Name can only contain letters, spaces, dots, and hyphens (Arabic and English supported)",
    }),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Please provide a valid phone number with country code (e.g., +1234567890)"
    )
    .optional(),

  preferredLanguage: z
    .enum(["ar", "en"], {
      errorMap: () => ({
        message:
          "Preferred language must be either 'ar' (Arabic) or 'en' (English)",
      }),
    })
    .optional(),
});

/**
 * Business info schema for creator onboarding
 */
export const businessInfoSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters long")
    .max(150, "Business name cannot exceed 150 characters"),

  businessDescription: z
    .string()
    .min(10, "Business description must be at least 10 characters long")
    .max(500, "Business description cannot exceed 500 characters")
    .optional(),

  socialMediaLinks: z
    .object({
      instagram: z
        .string()
        .optional()
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message: "Instagram URL must be a valid URL",
        })
        .refine(
          (val) =>
            !val ||
            /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(val),
          {
            message: "Instagram URL must be a valid Instagram profile URL",
          }
        ),
      twitter: z
        .string()
        .optional()
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message: "Twitter URL must be a valid URL",
        })
        .refine(
          (val) =>
            !val ||
            /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/?$/.test(val),
          {
            message: "Twitter URL must be a valid Twitter/X profile URL",
          }
        ),
      tiktok: z
        .string()
        .optional()
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message: "TikTok URL must be a valid URL",
        })
        .refine(
          (val) =>
            !val ||
            /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._]+\/?$/.test(val),
          {
            message: "TikTok URL must be a valid TikTok profile URL",
          }
        ),
      youtube: z
        .string()
        .optional()
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message: "YouTube URL must be a valid URL",
        })
        .refine(
          (val) =>
            !val ||
            /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|user\/)?[a-zA-Z0-9._-]+\/?$/.test(
              val
            ),
          {
            message: "YouTube URL must be a valid YouTube channel URL",
          }
        ),
      website: z
        .string()
        .optional()
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message: "Website URL must be a valid URL",
        }),
    })
    .optional(),
});

/**
 * Complete creator onboarding schema
 */
export const creatorOnboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema,
  intentData: intentSurveySchema,
  completedAt: z.date().optional(),
});

/**
 * Company address schema
 */
export const companyAddressSchema = z.object({
  street: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(200, "Street address must be less than 200 characters"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be less than 50 characters"),

  zipCode: z.string().regex(/^[\d\-\s]+$/, "Please enter a valid zip code"),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters"),
});

/**
 * Company info schema for factory onboarding
 */
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  registrationNumber: z
    .string()
    .max(50, "Registration number must be less than 50 characters")
    .optional(),

  taxId: z
    .string()
    .max(50, "Tax ID must be less than 50 characters")
    .optional(),

  address: companyAddressSchema,

  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),

  yearsInBusiness: z
    .number()
    .int("Years in business must be a whole number")
    .min(0, "Years in business cannot be negative")
    .max(200, "Years in business seems unrealistic")
    .optional(),
});

/**
 * Factory contact info schema
 */
export const factoryContactInfoSchema = z.object({
  contactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be less than 50 characters"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Please provide a valid phone number with country code (e.g., +1234567890)"
    )
    .optional(),

  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(50, "Position must be less than 50 characters"),
});

/**
 * Factory capabilities schema
 */
export const factoryCapabilitiesSchema = z.object({
  productTypes: z
    .array(z.string())
    .min(1, "Please select at least one product type"),

  techniques: z
    .array(z.string())
    .min(1, "Please select at least one manufacturing technique"),

  minimumOrders: z
    .record(z.string(), z.number().int().min(1))
    .refine(
      (data) => Object.keys(data).length > 0,
      "Please specify minimum order quantities"
    ),

  monthlyCapacity: z
    .number()
    .int("Monthly capacity must be a whole number")
    .min(1, "Monthly capacity must be at least 1")
    .optional(),

  certifications: z.array(z.string()).optional(),

  materials: z.array(z.string()).optional(),
});

/**
 * Factory verification schema
 */
export const factoryVerificationSchema = z.object({
  businessLicense: z.instanceof(File).optional(),
  taxCertificate: z.instanceof(File).optional(),
  insurance: z.instanceof(File).optional(),
  qualityCerts: z.array(z.instanceof(File)).optional(),
  status: z.enum(["pending", "verified", "rejected"]).default("pending"),
});

/**
 * Complete factory onboarding schema
 */
export const factoryOnboardingSchema = z.object({
  companyInfo: companyInfoSchema,
  contactInfo: factoryContactInfoSchema,
  capabilities: factoryCapabilitiesSchema,
  verification: factoryVerificationSchema,
  intentData: intentSurveySchema,
  completedAt: z.date().optional(),
});

/**
 * One-off purchaser personal info schema
 */
export const oneOffPurchaserPersonalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Please provide a valid phone number with country code (e.g., +1234567890)"
    )
    .optional(),

  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
});

/**
 * One-off purchaser preferences schema
 */
export const oneOffPurchaserPreferencesSchema = z.object({
  productInterests: z
    .array(z.string())
    .min(1, "Please select at least one product type"),

  occasions: z.array(z.string()).optional(),

  frequency: z.enum(["one-time", "occasional", "regular"]).optional(),

  budgetRange: z.string().optional(),

  contactPreference: z.enum(["email", "phone", "sms"]).optional(),
});

/**
 * Complete one-off purchaser onboarding schema
 */
export const oneOffPurchaserOnboardingSchema = z.object({
  personalInfo: oneOffPurchaserPersonalInfoSchema,
  preferences: oneOffPurchaserPreferencesSchema,
  intentData: intentSurveySchema,
  completedAt: z.date().optional(),
});

/**
 * Onboarding step schema
 */
export const onboardingStepSchema = z.object({
  id: z.string().min(1, "Step ID is required"),
  title: z.string().min(1, "Step title is required"),
  description: z.string(),
  completed: z.boolean().default(false),
  active: z.boolean().default(false),
  icon: z.string().optional(),
});

/**
 * Export type inference helpers
 */
export type IntentSurveyFormData = z.infer<typeof intentSurveySchema>;
export type CreatorOnboardingFormData = z.infer<typeof creatorOnboardingSchema>;
export type OneOffPurchaserOnboardingFormData = z.infer<
  typeof oneOffPurchaserOnboardingSchema
>;
export type FactoryOnboardingFormData = z.infer<typeof factoryOnboardingSchema>;
export type OnboardingStepData = z.infer<typeof onboardingStepSchema>;
