export default function FeedPage() {
    return (
        <div>
            {Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="bg-blue-100 m-5 h-[300px]"></div>
            ))}
        </div>
    )
}