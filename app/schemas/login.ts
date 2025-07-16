import { object, string, type InferType } from "yup";

export const loginSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

export type LoginSchema = InferType<typeof loginSchema>;
