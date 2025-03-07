'use client'

import Image from "next/image"
import PetCard from "../PetCard"
import { useEffect, useState } from "react";


interface Participant {
    id: string;
    name: string;
    petName: string;
    photo: string;
    voteCount: number;
}

const petData = [
    // {
    //     name: "Poppi",
    //     imageUrl: "/placeholder.svg",
    //     votes: 179,
    //     isNewParticipant: true,
    //     showHeader: true,
    // },
    // {
    //     name: "Autumn",
    //     imageUrl: "/placeholder.svg",
    //     votes: 16,
    //     rank: 2723,
    //     description:
    //         "Autumn is such a precious little girl. Super smart, funny, loves to eat hehe. She's loves to give kisses and hugs and loves her sisters.",
    //     isNewParticipant: false,
    // },
    // {
    //     name: "Eveline",
    //     imageUrl: "/placeholder.svg",
    //     votes: 57,
    //     rank: 1959,
    //     description:
    //         "Eveline was born 2/6/25 after 3 days of trying to induce me (issues with preeclampsia). She's a very bright baby girl. As soon as she was born, she impressed everyone with her strong head move...",
    //     isNewParticipant: false,
    // },
]

export default function VotingSection() {

    const [bottomParticipants, setBottomParticipants] = useState<Participant[]>([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        async function fetchParticipants() {
            try {
                const response = await fetch(`${backendUrl}/get_bottom_1`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data: Participant[] = await response.json();
                setBottomParticipants(data);
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        }
        fetchParticipants();
    }, [backendUrl]);

    return (
        <section className="w-full mb-6">

            {
                // <div className="bg-gray-100 p-4 rounded-lg">
                // <h3 className="text-3xl font-bold text-center mb-2">Help them get their first votes!</h3>
                //     <p className="text-amber-500 text-center text-xl mb-4">Start voting right now:</p>
                //     bottomParticipants.length > 0 ?
                //
                //         <PetCard votes={bottomParticipants[0].voteCount} name={bottomParticipants[0].petName} imageUrl={bottomParticipants[0].photo} showHeader={true} isNewParticipant={true} />
                //         :
                //
                //         <PetCard {...petData[0]} />

                //     <div className="flex justify-center my-6">
                //         <div className="relative w-full max-w-3/4 h-[300px]">
                //             <Image src="/img2.png" alt="Pet winners illustration with trophy" fill className="object-contain" />
                //         </div>
                //     </div>
                //
                //     <div className="text-center mb-3">
                //         <h3 className="text-4xl  font-bold">Meet</h3>
                //         <h3 className="text-4xl font-bold">Last Month&apos;s</h3>
                //         <p className="text-green-500 text-3xl font-bold">Winner</p>
                //     </div>
                //
                //     <button className="w-full bg-amber-400 text-white font-bold py-3 rounded-2xl">VIEW ALL WINNERS</button>
                // </div>

                // <div className="space-y-4 mt-6">
                //     {petData.slice(1).map((pet, index) => (
                //         <PetCard key={index} {...pet} />
                //     ))}
                // </div>
            }

            <div className="bg-purple-100 p-4 rounded-lg text-center mt-6">
                <p className="text-purple-900 font-medium">
                    Every month, 100+ adorable pets charm their way to exciting prizes
                </p>
                <div className="flex items-center justify-center mt-2">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-purple-900 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-purple-900 ml-2">Trusted by 17 million users</span>
                </div>
            </div>
        </section>
    )
}

