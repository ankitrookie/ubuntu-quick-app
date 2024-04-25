import { z } from "zod";

export const signupValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signinValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const todoValidationSchema = z.object({
  title: z.string(),
  description: z.string()
})


export type signupParams = z.infer<typeof signupValidationSchema>;
export type signinParams = z.infer<typeof signinValidationSchema>;
export type todoValidationSchema = z.infer<typeof todoValidationSchema>;
