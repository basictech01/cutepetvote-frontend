"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // Navigate to participants page with the search query
            router.push(`/participants?search=${encodeURIComponent(searchQuery.trim())}`)
            // Reset the search bar state
            setSearchQuery("")
            setIsSearchOpen(false)
        }
    }

    return (
        <header className="bg-amber-400 p-4 flex items-center justify-between">
            <div className="flex-1"></div>
            <h1 className="text-2xl font-bold text-center flex-1">PawVote</h1>
            <div className="flex-1 flex justify-end">
                {isSearchOpen ? (
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search participants..."
                            className="w-full p-2 pr-10 rounded border-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            <Search size={20} />
                        </button>
                    </form>
                ) : (
                    <button
                        aria-label="Search"
                        className="text-black"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={24} />
                    </button>
                )}
            </div>
        </header>
    )
}
