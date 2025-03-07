import ParticipantCard from "./participant-card"

interface Participant {
    id: string
    name: string
    photo: string
    voteCount: number
    petName: string
    participantId: string
}

interface ParticipantListProps {
    participants: Participant[]
}

export default function ParticipantList({ participants }: ParticipantListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {participants.map((participant) => (
                <ParticipantCard
                    key={participant.id}
                    name={participant.name}
                    photo={participant.photo}
                    voteCount={participant.voteCount}
                    petName={participant.petName}
                    participantId={participant.id}
                />
            ))}
        </div>
    )
}

