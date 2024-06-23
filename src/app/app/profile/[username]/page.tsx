type UserProfilePageProps = {
    params: {
        username: string
    }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    return (
        <div>{params.username}&apos;s Profile</div>
    )
}