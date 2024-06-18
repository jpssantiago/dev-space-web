import { twMerge } from "tailwind-merge"
import { Loader } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"

type LoadingButtonProps = ButtonProps & {
    loading: boolean
    className?: string
}

export function LoadingButton({ loading, className, ...rest }: LoadingButtonProps) {
    return (
        <Button 
            className={twMerge("flex gap-2 items-center", className)} 
            disabled={loading ?? rest.disabled} 
            {...rest}
        >
            {loading && <Loader className="animate-spin" />}

            {rest.children}
        </Button>
    )
}