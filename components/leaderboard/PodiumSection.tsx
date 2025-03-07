import Image from "next/image"

interface PodiumWinner {
    name: string
    petName: string
    points: number
    imageUrl: string
    position: 1 | 2 | 3
}

const podiumColors = {
    1: "bg-red-500",
    2: "bg-amber-400",
    3: "bg-teal-500",
}

const podiumHeights = {
    1: "h-44",
    2: "h-36",
    3: "h-32",
}

const podiumOrder = {
    2: "order-1",
    1: "order-2",
    3: "order-3",
}

interface PodiumSectionProps {
    winners: PodiumWinner[]
}

export default function PodiumSection({ winners }: PodiumSectionProps) {
    // Sort winners by position to ensure correct order
    const sortedWinners = [...winners].sort((a, b) => a.position - b.position)

    return (
        <div className="relative h-72 flex items-end justify-center gap-4 mb-12">
            {sortedWinners.map((winner) => (
                <div key={winner.position} className={`w-24 flex flex-col items-center ${podiumOrder[winner.position]}`}>
                    <div className="relative w-20 h-20 mb-2">
                        <Image
                            src={winner.imageUrl || "/placeholder.svg"}
                            alt={winner.name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div
                        className={`w-full ${podiumColors[winner.position]} rounded-t-lg ${podiumHeights[winner.position]} px-2 pt-2 text-center`}
                    >
                        <div className="bg-white/20 rounded px-1 py-0.5 mb-1">
                            <p className="text-white font-medium text-sm truncate">{winner.name}</p>
                        </div>
                        <p className="text-white/90 text-xs mb-1">Pet: {winner.petName}</p>
                        <p className="text-white/90 text-xs font-bold">{winner.points.toLocaleString()} votes</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
