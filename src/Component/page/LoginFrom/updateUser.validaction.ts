import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" }),
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
});
