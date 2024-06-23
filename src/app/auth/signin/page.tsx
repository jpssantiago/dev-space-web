"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { emailOrUsernameSchema, passwordSchema } from "@/schemas/auth-schemas"
import { AuthForm } from "@/components/auth-form/auth-form"
import { AuthFormHeader } from "@/components/auth-form/auth-form-header"
import { AuthFormTitle } from "@/components/auth-form/auth-form-title"
import { AuthFormDescription } from "@/components/auth-form/auth-form-description"
import { AuthFormContent } from "@/components/auth-form/auth-form-content"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { UnderlineLink } from "@/components/underline-link"
import { LoadingButton } from "@/components/loading-button"

const signInSchema = z.object({
    emailOrUsername: emailOrUsernameSchema,
    password: passwordSchema
})

type SignInType = z.infer<typeof signInSchema>

export default function SignInPage() {
    const [loading, setLoading] = useState<boolean>(false)

    const { handleSubmit, register, formState } = useForm<SignInType>({
        resolver: zodResolver(signInSchema)
    })

    const hasErrors = formState.errors.emailOrUsername?.message || formState.errors.password?.message

    async function onSubmit({ emailOrUsername, password }: SignInType) {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <AuthForm>
                <AuthFormHeader>
                    <AuthFormTitle>Welcome back 👋</AuthFormTitle>
                    <AuthFormDescription>Sign in with your account to continue</AuthFormDescription>
                </AuthFormHeader>

                <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
                    {hasErrors && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {formState.errors.emailOrUsername?.message}
                            </AlertDescription>

                            <AlertDescription>
                                {formState.errors.password?.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Input
                        placeholder="Email or username"
                        {...register("emailOrUsername")}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        {...register("password")}
                    />

                    <UnderlineLink href="/auth/recover-password">Forgot your password?</UnderlineLink>

                    <LoadingButton loading={loading}>Sign in</LoadingButton>

                    <span className="text-center text-sm">
                        Don&apos;t have an account?
                        <UnderlineLink href="/auth/signup"> Create one</UnderlineLink>
                    </span>
                </AuthFormContent>
            </AuthForm>
        </div>
    )
}