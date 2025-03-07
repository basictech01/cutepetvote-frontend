import Header from "@/components/header"
import MainContent from "@/components/main-content"
import Footer from "@/components/footer"

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}

