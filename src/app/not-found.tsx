import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <div className="flex flex-col gap-2">
                <span className="font-bold text-9xl">404</span>
                <span>Ooooops, this page does not exist.</span>
            </div>

            <Link href="/app/feed">
                <Button className="w-64">Go back to home</Button>
            </Link>
        </div>
    )
}