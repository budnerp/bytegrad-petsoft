import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().trim().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image Url must be a valid url" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive({ message: "Age must be positive" })
      .max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  // in case getValues are called in onSubmit below would work
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().trim().email({ message: "Email is required" }).max(100),
  password: z.string().trim(),
});

export type TAuth = z.infer<typeof authSchema>;
