import { z } from "zod";

import { CONTACT_METHODS, getHandleError } from "@/lib/contact-methods";

export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(120),
    method: z.enum(CONTACT_METHODS),
    handle: z.string().trim().max(254),
    message: z.string().trim().min(3, "Say something").max(4000),
    company: z.string().max(0).optional(),
    startedAt: z.number().int().positive().optional(),
  })
  .superRefine((data, ctx) => {
    const error = getHandleError(data.method, data.handle);
    if (error) ctx.addIssue({ code: "custom", path: ["handle"], message: error });
  });

export type ContactInput = z.infer<typeof contactSchema>;
