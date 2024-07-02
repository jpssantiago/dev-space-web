import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function RecoverPasswordPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <div className="flex flex-col gap-2">
                <span>Work in progress!</span>
            </div>

            <Link href="/feed">
                <Button className="w-64">Go back to feed</Button>
            </Link>
        </div>
    )
}