import Footer from "@/components/footer";
import Header from "@/components/header";

export default function SuccessPage() {
    return (
        <div>
            <Header />
            <div className="mb-20 min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Entry Submitted!</h1>
                    <p className="text-gray-600 mb-6">Thank you for entering March's competition. Good luck!</p>
                    <div className="bg-orange-50 p-4 rounded-lg text-left">
                        <h3 className="text-lg font-medium text-orange-500 mb-2">What happens next?</h3>
                        <p className="text-sm text-gray-700">
                            Our team will review your entry. Winners will be announced at the end of the month.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

