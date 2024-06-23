import { z } from "zod"

export const emailOrUsernameSchema = z.string().email({ 
    message: "Invalid email or username" 
}).or(z.string().regex(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/))

export const passwordSchema = z.string().trim().min(8, { 
    message: "Your password needs to have at least 8 characters" 
})