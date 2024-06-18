import { Loader } from "lucide-react"

type LoadingContainerProps = {
    size?: number
}

export function LoadingContainer({ size = 48 }: LoadingContainerProps) {
    return (
        <div className="flex justify-center items-center size-full">
            <Loader size={size} className="text-blue-500 animate-spin" />
        </div>
    )
}