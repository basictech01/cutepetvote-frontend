import HeroSection from "./sections/HeroSection"
import VotingSection from "./sections/VotingSection"
import StoriesSection from "./sections/StoriesSection"
import ReviewsSection from "./sections/ReviewsSection"
import FeaturedSection from "./sections/FeaturedSection"
import FooterSection from "./sections/FooterSection"

export default function MainContent() {
    return (
        <main className="flex flex-col items-center px-4 pt-4 pb-20 bg-white overflow-y-auto h-[calc(100vh-112px)]">
            <HeroSection />
            <VotingSection />
            <FeaturedSection />
            <FooterSection />
        </main>
    )
}

