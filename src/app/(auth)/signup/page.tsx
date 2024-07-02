"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { passwordSchema, usernameSchema } from "@/schemas/auth-schemas"
import { useAuth } from "@/contexts/auth-context"
import { AuthForm } from "@/components/auth-form/auth-form"
import { AuthFormHeader } from "@/components/auth-form/auth-form-header"
import { AuthFormTitle } from "@/components/auth-form/auth-form-title"
import { AuthFormDescription } from "@/components/auth-form/auth-form-description"
import { AuthFormContent } from "@/components/auth-form/auth-form-content"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"
import { UnderlineLink } from "@/components/underline-link"

const signUpSchema = z.object({
    email: z.string().email({ message: "Your email is not valid" }),
    username: usernameSchema,
    name: z.string().trim().min(1, { message: "Your display name needs to have at least 1 character" }),
    password: passwordSchema
})

type SignUpType = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const { push } = useRouter()

    const { handleSubmit, register, formState } = useForm<SignUpType>({
        resolver: zodResolver(signUpSchema)
    })
    const { signUp } = useAuth()

    const hasErrors = 
        formState.errors.email?.message ||
        formState.errors.username?.message ||
        formState.errors.password?.message ||
        formState.errors.name?.message

    async function onSubmit({ email, username, name, password }: SignUpType) {
        if (loading) return

        setLoading(true)
        const response = await signUp(email, username, name, password)
        setLoading(false)

        if (response.err) {
            return toast.error(response.err)
        }

        push("/feed")
    }

    return (
        <div className="flex justify-center items-center px-5 w-full h-screen">
            <AuthForm>
                <AuthFormHeader>
                    <AuthFormTitle>Hey, welcome 👋</AuthFormTitle>
                    <AuthFormDescription>Create a free account to continue</AuthFormDescription>
                </AuthFormHeader>

                <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
                    {hasErrors && (
                        <Alert variant="destructive" className="dark:border-red-600 dark:text-red-600">
                            <AlertDescription>
                                {formState.errors.email?.message}
                            </AlertDescription>
                            
                            <AlertDescription>
                                {formState.errors.username?.message}
                            </AlertDescription>
                            
                            <AlertDescription>
                                {formState.errors.name?.message}
                            </AlertDescription>

                            <AlertDescription>
                                {formState.errors.password?.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Input
                        placeholder="Email"
                        {...register("email")}
                    />

                    <Input
                        placeholder="Username"
                        {...register("username")}
                    />

                    <Input
                        placeholder="Display name"
                        {...register("name")}
                    />

                    <Input
                        placeholder="Password"
                        {...register("password")}
                        type="password"
                    />

                    <LoadingButton loading={loading}>Create an account</LoadingButton>

                    <span className="text-center text-sm">
                        Already have an account?
                        <UnderlineLink href="/signin"> Sign in</UnderlineLink>
                    </span>
                </AuthFormContent>
            </AuthForm>
        </div>
    )
}