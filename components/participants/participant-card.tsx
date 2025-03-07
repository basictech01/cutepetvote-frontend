"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have the cn utility from shadcn/ui

interface ParticipantProps {
    name: string
    photo: string
    voteCount: number
    petName: string
    participantId: string
}

export default function ParticipantCard({
    name = "Jane Smith",
    photo = "/placeholder.svg?height=400&width=300",
    voteCount = 42,
    petName = "Fluffy",
    participantId = "1"
}: ParticipantProps) {
    const [currentVoteCount, setCurrentVoteCount] = useState(voteCount)
    const [isVoting, setIsVoting] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleVote = async () => {
        // Prevent double-clicking or voting again
        if (isVoting || hasVoted) return

        setIsVoting(true)
        setIsAnimating(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vote/${participantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                // Update the vote count locally
                setCurrentVoteCount(prev => prev + 1)
                setHasVoted(true)

                // Wait for animation to complete
                setTimeout(() => {
                    setIsAnimating(false)
                }, 1000)
            } else {
                console.error('Failed to register vote')
                setIsAnimating(false)
            }
        } catch (error) {
            console.error('Error voting:', error)
            setIsAnimating(false)
        } finally {
            setIsVoting(false)
        }
    }

    return (
        <Card className="max-w-lg mx-14 overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative w-full h-[300px]">
                    <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Photo of ${name} with ${petName}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <Badge
                        variant="outline"
                        className={cn(
                            "flex items-center gap-1 cursor-pointer transition-all duration-300",
                            hasVoted && "border-pink-500",
                            isAnimating && "scale-110"
                        )}
                        onClick={handleVote}
                    >
                        <Heart
                            className={cn(
                                "h-3.5 w-3.5 transition-all duration-300",
                                hasVoted ? "fill-pink-500 text-pink-500" : "fill-transparent",
                                isAnimating && "animate-pulse"
                            )}
                        />
                        <span className={cn(
                            "transition-all duration-300",
                            hasVoted && "text-pink-500"
                        )}>
                            {currentVoteCount} votes
                        </span>
                    </Badge>
                </div>
                <p className="text-muted-foreground">
                    Pet Name: <span className="font-medium text-foreground">{petName}</span>
                </p>
            </CardContent>
        </Card>
    )
}
