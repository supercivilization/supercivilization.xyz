import { z } from 'zod';

/**
 * Profile update form validation schema
 */
export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  location: z.string().max(100, 'Location is too long').optional(),
  avatarUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

/**
 * Profile preferences schema
 */
export const profilePreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  newsletterSubscription: z.boolean(),
  language: z.enum(['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja']),
  timezone: z.string(),
});

export type ProfilePreferencesData = z.infer<typeof profilePreferencesSchema>;
