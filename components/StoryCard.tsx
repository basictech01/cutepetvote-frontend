import Image from "next/image"

interface StoryCardProps {
  name: string
  imageUrl: string
  story: string
}

export default function StoryCard({ name, imageUrl, story }: StoryCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-medium text-center mb-4">Meet some true stories</h3>
      <div className="relative w-24 h-24 mx-auto mb-3">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="rounded-full object-cover" />
      </div>
      <p className="font-medium text-center mb-2">{name}</p>
      <p className="text-sm text-gray-600 text-center mb-3">{story}</p>
      <div className="text-center">
        <button className="text-green-500 text-sm font-medium">Read more</button>
      </div>
    </div>
  )
}

