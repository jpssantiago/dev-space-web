"use client"

import { ReactNode, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { usernameSchema } from "@/schemas/auth-schemas"
import { useUser } from "@/contexts/user-context"
import { useProfile } from "@/contexts/profile-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { EditAvatarPopover } from "@/components/popovers/edit-avatar-popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingButton } from "@/components/loading-button"

const editProfileSchema = z.object({
    username: usernameSchema,
    name: z.string().trim().min(1, { message: "The name does not appear to be valid" }).max(50),
    description: z.string().trim().min(1).max(150).nullable()
})

type EditProfileType = z.infer<typeof editProfileSchema>

type EditProfileDialogProps = {
    children?: ReactNode
}

export function EditProfileDialog({ children }: EditProfileDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const { user, editUser } = useUser()
    const { profile, setProfile } = useProfile()
    const { push } = useRouter()
    const { handleSubmit, register, formState, reset } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: user?.username,
            name: user?.name,
            description: user?.description
        }
    })

    const hasErrors =
        error ||
        formState.errors.username?.message ||
        formState.errors.name?.message ||
        formState.errors.description?.message

    useEffect(() => {
        setAvatar(user?.avatar)
    }, [])

    function handleOpenChange(status: boolean) {
        if (loading) return

        if (!status) {
            reset({
                username: user?.username,
                name: user?.name,
                description: user?.description
            })
            setAvatar(user?.avatar)
            setError("")
        }

        setOpen(status)
    }

    async function onSubmit({ username, name, description }: EditProfileType) {
        setLoading(true)
        const response = await editUser(username, name, description ?? undefined, avatar)
        setLoading(false)

        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        if (profile && profile.id == user?.id) {
            setProfile({
                ...profile,
                username,
                name,
                description: description ?? undefined,
                avatar
            })
        }

        setOpen(false)
        reset({
            username: response.user?.username,
            name: response.user?.name,
            description: response.user?.description
        })
        setAvatar(response.user?.avatar)
        setError("")
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your profile</DialogTitle>
                </DialogHeader>

                {hasErrors && (
                    <Alert variant="destructive" className="dark:border-red-600 dark:text-red-600">
                        <AlertDescription>
                            {error}
                        </AlertDescription>

                        <AlertDescription>
                            {formState.errors.username?.message}
                        </AlertDescription>

                        <AlertDescription>
                            {formState.errors.name?.message}
                        </AlertDescription>

                        <AlertDescription>
                            {formState.errors.description?.message ? "The description can't be longer than 150 characters." : ""}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Username"
                            {...register("username")}
                        />

                        <EditAvatarPopover
                            onRemove={() => setAvatar(undefined)}
                            onUpload={setAvatar}
                        >
                            <Avatar className="cursor-pointer size-12">
                                <AvatarImage
                                    src={avatar}
                                    alt=""
                                />

                                <AvatarFallback>
                                    {user?.name.slice(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                        </EditAvatarPopover>
                    </div>

                    <Input
                        placeholder="Name"
                        {...register("name")}
                    />

                    <Input
                        placeholder="Description"
                        {...register("description")}
                    />

                    <LoadingButton loading={loading}>
                        Save
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}