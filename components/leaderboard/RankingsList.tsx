import Image from "next/image"

interface RankingPlayer {
    rank: number
    name: string
    petName: string
    score: number
    imageUrl: string
}

interface RankingsListProps {
    players: RankingPlayer[]
}

export default function RankingsList({ players }: RankingsListProps) {
    const formatScore = (score: number) => {
        return new Intl.NumberFormat().format(score)
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Leaderboard Rankings</h2>

            {players.map((player) => (
                <div key={player.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className={`w-6 text-lg font-medium ${player.rank <= 3 ? 'text-amber-500' : 'text-gray-500'
                        }`}>
                        {player.rank}
                    </span>

                    <div className="relative w-12 h-12">
                        <Image
                            src={player.imageUrl || "/placeholder.svg"}
                            alt={player.name}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>

                    <div className="flex-1">
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-gray-500">Pet: {player.petName}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-medium text-orange-500">{formatScore(player.score)}</p>
                        <p className="text-xs text-gray-400">votes</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
