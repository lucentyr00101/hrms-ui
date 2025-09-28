import type { InferType } from 'yup';

// Auth form types
export interface LoginFormData {
  email: string;
  password: string;
}

// Re-export schema types that might be needed
export type { InferType };