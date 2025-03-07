import Image from "next/image"

interface ReviewCardProps {
  userName: string
  userImage: string
  rating: number
  comment: string
  prize: string
  placement: number
  contest: string
  daysAgo: number
}

export default function ReviewCard({
  userName,
  userImage,
  rating,
  comment,
  prize,
  placement,
  contest,
  daysAgo,
}: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-10 h-10">
          <Image src={userImage || "/placeholder.svg"} alt={userName} fill className="rounded-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{userName}</p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-sm font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full">${prize}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-900 mb-2">{comment}</p>

      <p className="text-sm text-gray-500">
        {placement}th · {contest} · {daysAgo} days ago
      </p>
    </div>
  )
}

