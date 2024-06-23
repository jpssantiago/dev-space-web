import { z } from "zod"

export const usernameSchema = z.string().regex(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message: "Your username can only contain letters, numbers, dots and underscores. It cannot start or end with a dot or an underscore"
})

export const emailOrUsernameSchema = z.string().email({ 
    message: "Invalid email or username" 
}).or(usernameSchema)

export const passwordSchema = z.string().trim().min(8, { 
    message: "Your password needs to have at least 8 characters" 
})