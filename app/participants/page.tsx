"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ParticipantList from "@/components/participants/participant-list"
import Footer from "@/components/footer"
import Header from "@/components/header"

// Define the participant type
type Participant = {
    id: string
    name: string
    photo: string
    voteCount: number
    petName: string
}

export default function ParticipantPage() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("search")

    // This function fetches participants data
    const fetchParticipants = async (query?: string) => {
        setIsLoading(true)
        setError(null)

        try {
            let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search`

            // Add query parameter if it exists
            if (query) {
                url += `?query=${encodeURIComponent(query)}`
            }

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Failed to fetch participants")
            }

            const data = await response.json()
            setParticipants(data)
        } catch (err) {
            console.error("Error fetching participants:", err)
            setError("Failed to load participants. Please try again later.")

            // Use dummy data as fallback when in development
            if (process.env.NODE_ENV === "development") {
                setParticipants([
                    {
                        id: "1",
                        name: "Alex Johnson",
                        photo: "/placeholder.svg?height=400&width=300",
                        voteCount: 157,
                        petName: "Whiskers",
                    },
                    {
                        id: "2",
                        name: "Sarah Wilson",
                        photo: "/placeholder.svg?height=400&width=300",
                        voteCount: 143,
                        petName: "Luna",
                    },
                    {
                        id: "3",
                        name: "Mike Thompson",
                        photo: "/placeholder.svg?height=400&width=300",
                        voteCount: 129,
                        petName: "Max",
                    },
                ])
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Fetch participants when the component mounts or search query changes
    useEffect(() => {
        fetchParticipants(searchQuery || undefined)
    }, [searchQuery])

    return (
        <div>
            <Header />
            <div className="mb-20 container py-12 px-4 md:px-6">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {searchQuery ? `Search Results: "${searchQuery}"` : "Participant Profiles"}
                    </h1>
                    <p className="text-muted-foreground">
                        {searchQuery
                            ? `Showing pets and owners matching "${searchQuery}"`
                            : "View participant details and vote count"}
                    </p>
                </header>

                <main>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin h-8 w-8 border-4 border-amber-500 rounded-full border-t-transparent"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center p-4 bg-red-50 text-red-500 rounded-md">
                            {error}
                        </div>
                    ) : participants.length === 0 ? (
                        <div className="text-center p-8">
                            <p className="text-lg text-gray-500">No participants found.</p>
                            {searchQuery && (
                                <p className="mt-2">Try adjusting your search terms to find more results.</p>
                            )}
                        </div>
                    ) : (
                        <ParticipantList participants={participants} />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    )
}
