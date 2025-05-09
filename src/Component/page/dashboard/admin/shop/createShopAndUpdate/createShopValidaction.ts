/* eslint-disable no-useless-escape */
import { z } from "zod";

// Helper schemas
const nonEmptyString = z.string().min(1, { message: "Required" });
const urlSchema = z.string().url({ message: "Invalid URL" }).or(z.literal(""));
const phoneSchema = z
  .string()
  .regex(/^\+?[0-9\s\-]+$/, { message: "Invalid phone number" });

// Days of week enum (matches your backend expectations)
const daysOfWeekSchema = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

// Payment methods (should match what your backend expects)
const paymentMethodsSchema = z.enum([
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Leasing",
]);

// Services offered (should match backend)
const servicesSchema = z.enum([
  "Sales",
  "Repairs",
  "Maintenance",
  "Parts",
  "Detailing",
]);

export const carShopValidationSchema = z.object({
  shopName: nonEmptyString.max(100),
  shopAddress: nonEmptyString.max(200),
  description: nonEmptyString.max(1000),
  phoneNumber: phoneSchema,
  website: urlSchema.optional(),
  ownerName: nonEmptyString.max(100),
  establishedYear: z
    .string()
    .regex(/^\d{4}$/)
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: `Year must be between 1900 and ${new Date().getFullYear()}`,
      }
    ),

  // Array fields - converted from {value: string}[] to string[] in onSubmit
  carBrands: z
    .array(z.object({ value: nonEmptyString }))
    .min(1, "At least one car brand is required"),

  servicesOffered: z
    .array(servicesSchema)
    .min(1, "At least one service is required"),

  shopFeatures: z
    .array(z.object({ value: nonEmptyString }))
    .min(1, "At least one feature is required"),

  // Social media (all optional)
  socialMediaLinks: z
    .object({
      facebook: urlSchema.optional(),
      instagram: urlSchema.optional(),
      twitter: urlSchema.optional(),
      linkedin: urlSchema.optional(),
    })
    .optional(),

  operatingHours: z.object({
    open: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    close: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    daysOpen: z.array(daysOfWeekSchema).min(1),
  }),

  paymentMethods: z
    .array(paymentMethodsSchema)
    .min(1, "At least one payment method is required"),

  // Optional fields
  customerServiceContact: phoneSchema.optional(),
  serviceAreas: z.array(z.object({ value: nonEmptyString })).optional(),
  certifications: z.array(z.object({ value: nonEmptyString })).optional(),
  warrantyOffered: z.boolean().optional(),

  // Fields that exist in form but not in TCarShop
  isActive: z.boolean().optional(), // Only if needed for frontend
  rating: z.number().min(0).max(5).optional().default(0), // Only if needed
});

// Type that matches both Zod schema and TCarShop
export type CarShopFormValues = Omit<
  z.infer<typeof carShopValidationSchema>,
  "carBrands" | "shopFeatures" | "serviceAreas" | "certifications"
> & {
  carBrands: string[];
  shopFeatures: string[];
  serviceAreas?: string[];
  certifications?: string[];
};
