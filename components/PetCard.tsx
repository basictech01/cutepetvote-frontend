import Image from "next/image"
import { Trophy, MoreHorizontal } from "lucide-react"

interface PetCardProps {
    name: string
    imageUrl: string
    votes: number
    rank?: number
    description?: string
    isNewParticipant?: boolean
    showHeader?: boolean
}

export default function PetCard({
    name,
    imageUrl,
    votes,
    rank,
    description,
    isNewParticipant,
    showHeader = false,
}: PetCardProps) {
    return (
        <div className="bg-white rounded-xl border border-black overflow-hidden">
            {showHeader && (
                <div className="p-2 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black rounded-full"></div>
                        <span className="font-medium">PawVote</span>
                    </div>
                    <button className="text-gray-500">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            )}

            <div className="relative w-full aspect-square">
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${name} - a cute pet`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                {isNewParticipant && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded-md">
                        New participant
                    </div>
                )}
            </div>

            <div className="p-3">
                <div className="flex justify-between items-center">
                    <p className="text-xl">{name}</p>
                    {rank ? (
                        <div className="flex items-center gap-1">
                            <Trophy size={16} className="text-amber-500" />
                            <span className="text-sm font-medium">
                                {rank}
                                <sup>rd</sup>
                            </span>
                            <span className="text-lg text-black ml-2">{votes} votes</span>
                        </div>
                    ) : (
                        <p className="text-lg text-black">{votes} votes</p>
                    )}
                </div>
                {description && <p className="text-sm text-gray-600 mt-2 leading-snug">{description}</p>}
            </div>
        </div>
    )
}

