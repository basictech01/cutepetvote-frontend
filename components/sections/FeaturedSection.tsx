"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

interface Participant {
    id: string;
    name: string;
    petName: string;
    photo: string;
    voteCount: number;
}

export default function FeaturedSection() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        async function fetchParticipants() {
            try {
                const response = await fetch(`${backendUrl}/get_top_12`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data: Participant[] = await response.json();
                setParticipants(data);
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        }
        fetchParticipants();
    }, [backendUrl]);

    return (
        <section className="w-full mb-6">
            <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Glasses</h3>
                    <span className="text-orange-500 text-sm">Featured photos</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {participants.map((participant, ind) => (
                        <div key={participant.id} className={ind == 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}>
                            <Image
                                src={participant.photo}
                                alt={participant.petName}
                                width={150}
                                height={150}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

