"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PodiumSection from "@/components/leaderboard/PodiumSection"
import RankingsList from "@/components/leaderboard/RankingsList"

type Participant = {
    id: string,
    name: string,
    petName: string,
    photo: string,
    voteCount: number
}

export default function LeaderboardPage() {
    const [podiumWinners, setPodiumWinners] = useState<Participant[]>([])
    const [rankingPlayers, setRankingPlayers] = useState<Participant[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                // Fetch top 3 for podium
                const podiumResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_top_3`)
                if (!podiumResponse.ok) {
                    throw new Error("Failed to fetch podium data")
                }
                const podiumData = await podiumResponse.json()
                setPodiumWinners(podiumData)

                // Fetch top 50 for rankings
                const rankingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_top_50`)
                if (!rankingsResponse.ok) {
                    throw new Error("Failed to fetch rankings data")
                }
                const rankingsData = await rankingsResponse.json()
                setRankingPlayers(rankingsData)
            } catch (err) {
                console.error("Error fetching leaderboard data:", err)
                setError("Failed to load leaderboard data. Please try again later.")

                // Use dummy data as fallback when in development
                if (process.env.NODE_ENV === "development") {
                    setPodiumWinners([
                        {
                            id: "1",
                            name: "Naruto",
                            petName: "Kurama",
                            photo: "/placeholder.svg",
                            voteCount: 1470
                        },
                        {
                            id: "2",
                            name: "One Piece",
                            petName: "Luffy",
                            photo: "/placeholder.svg",
                            voteCount: 1340
                        },
                        {
                            id: "3",
                            name: "Keo",
                            petName: "Leo",
                            photo: "/placeholder.svg",
                            voteCount: 1200
                        }
                    ])

                    setRankingPlayers([
                        {
                            id: "1",
                            name: "Brooklyn Simmons",
                            petName: "Max",
                            photo: "/placeholder.svg",
                            voteCount: 54854099
                        },
                        {
                            id: "2",
                            name: "Kathryn Murphy",
                            petName: "Bella",
                            photo: "/placeholder.svg",
                            voteCount: 54784602
                        },
                        {
                            id: "3",
                            name: "Wade Warren",
                            petName: "Charlie",
                            photo: "/placeholder.svg",
                            voteCount: 51730764
                        },
                        {
                            id: "4",
                            name: "Theresa Webb",
                            petName: "Luna",
                            photo: "/placeholder.svg",
                            voteCount: 49645785
                        }
                    ])
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 p-4 mt-16 mb-20">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin h-10 w-10 border-4 border-amber-500 rounded-full border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center p-4 bg-red-50 text-red-500 rounded-md">
                        {error}
                    </div>
                ) : (
                    <>
                        <PodiumSection winners={podiumWinners.map((winner, index) => ({
                            name: winner.name,
                            petName: winner.petName,
                            points: winner.voteCount,
                            imageUrl: winner.photo,
                            position: (index + 1) as 1 | 2 | 3
                        }))} />

                        <RankingsList players={rankingPlayers.map((player, index) => ({
                            rank: index + 1,
                            name: player.name,
                            petName: player.petName,
                            score: player.voteCount,
                            imageUrl: player.photo
                        }))} />
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}
