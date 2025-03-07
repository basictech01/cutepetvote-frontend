"use client"

import { useState } from "react"
import StoryCard from "../StoryCard"

const storyData = [
  {
    name: "Putin",
    imageUrl: "/placeholder.svg",
    story:
      "Putin was suffering a curable skin condition. His owners were at a loss as to how to heal him. After months of trying different treatments, they were ...",
  },
  {
    name: "Luna",
    imageUrl: "/placeholder.svg",
    story:
      "Luna was found abandoned in a cardboard box. Thanks to the kindness of strangers, she now has a loving forever home and brings joy to her new family...",
  },
  {
    name: "Max",
    imageUrl: "/placeholder.svg",
    story:
      "Max, a retired service dog, was having trouble adjusting to civilian life. With patience and specialized training, he's now thriving in his new role as a therapy dog...",
  },
  {
    name: "Bella",
    imageUrl: "/placeholder.svg",
    story:
      "Bella was born with a rare condition affecting her mobility. Through innovative veterinary care and her strong spirit, she's now running and playing like any other dog...",
  },
]

export default function StoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storyData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storyData.length) % storyData.length)
  }

  return (
    <section className="w-full mb-6 relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {storyData.map((story, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <StoryCard {...story} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {storyData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${index === currentSlide ? "bg-amber-500" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        onClick={prevSlide}
      >
        ←
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        onClick={nextSlide}
      >
        →
      </button>
    </section>
  )
}

