import { z } from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .min(11, { message: "Phone number must be at least 11 digits" }),
    isActive: z.boolean().optional(),
    birthDate: z.string().optional(),
    profileImage: z.any().optional(),
    address: z.object({
      street: z.string().min(1, { message: "Street is required" }),
      street2: z.string().optional(),
      city: z.string().min(1, { message: "City is required" }),
      state: z.string().optional(),
      district: z.string().min(1, { message: "District is required" }),
      subdistrict: z.string().optional(),
      village: z.string().optional(),
      union: z.string().optional(),
      postalCode: z
        .string()
        .min(4, { message: "Postal code must be at least 4 characters" }),
      country: z.string().min(1, { message: "Country is required" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
