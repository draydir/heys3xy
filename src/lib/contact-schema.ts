import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(254),
  message: z.string().trim().min(3, "Say something").max(4000),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
