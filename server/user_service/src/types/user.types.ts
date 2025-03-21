import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email({message : "Email is required"}),
    name: z.string().min(4 , {message : "Name must have 4 characters"}),
    password: z.string().min(6 , {message : "please enter a strong password"}),
  });
  