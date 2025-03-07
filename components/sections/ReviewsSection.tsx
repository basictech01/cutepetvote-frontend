"use client"

import { useRef } from "react"
import ReviewCard from "../cards/ReviewCard"

const reviewData = [
  {
    userName: "Miah S.",
    userImage: "/placeholder.svg",
    rating: 4,
    comment: "My puppy loves seeing all the cute dogs here!",
    prize: "250",
    placement: 38,
    contest: "Boy Contest",
    daysAgo: 24,
  },
  {
    userName: "Alex R.",
    userImage: "/placeholder.svg",
    rating: 5,
    comment: "This platform is amazing! My cat won her first contest!",
    prize: "300",
    placement: 12,
    contest: "Cat Contest",
    daysAgo: 18,
  },
  {
    userName: "Sarah M.",
    userImage: "/placeholder.svg",
    rating: 4,
    comment: "Great community of pet lovers. Very supportive!",
    prize: "200",
    placement: 45,
    contest: "Puppy Contest",
    daysAgo: 20,
  },
  {
    userName: "John D.",
    userImage: "/placeholder.svg",
    rating: 5,
    comment: "Won my first contest here. So excited!",
    prize: "350",
    placement: 5,
    contest: "Dog Contest",
    daysAgo: 15,
  },
]

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="w-full mb-6">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-xl font-bold">They won!</h3>
          <button className="text-orange-500 font-medium flex items-center gap-1">
            More <span>+</span>
          </button>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory p-4 space-x-4">
            {reviewData.map((review, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] snap-start">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => scroll("left")}
          >
            ←
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => scroll("right")}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

