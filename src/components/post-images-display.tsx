import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"

type PostImagesDisplayProps = {
    files: string[]
}

export function PostImagesDisplay({ files }: PostImagesDisplayProps) {
    if (files.length == 0) return <></>

    if (files.length == 1) {
        return (
            <div className="relative flex">
                <img
                    src={files[0]}
                    alt=""
                    className="border rounded-lg max-w-[516px] max-h-[516px] cursor-pointer object-contain"
                    onClick={() => alert("big image")}
                />
            </div>
        )
    }

    return (
        <Carousel>
            <CarouselContent>
                {files.map((file, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                        <div className="relative h-[290px]">
                            <img
                                src={file}
                                className="border rounded-lg cursor-pointer object-cover size-full"
                                alt=""
                                onClick={() => alert("big image")}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            
            {files.length > 2 && (
                <>
                    <CarouselPrevious className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 translate-x-8" />
                    <CarouselNext className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 -translate-x-8" />
                </>
            )}
        </Carousel>
    )
}