import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {

    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold text-center mb-1">Who&apos;s the Cutest Pet?</h2>
            <p className="text-amber-500 font-bold text-xl text-center mb-4">Vote Now!</p>

            <Link href="/" className="w-full">
                <Link href={"/add"} >
                    <div className="shadow-lg shadow-gray-600 bg-amber-400 rounded-lg p-4 text-center mb-6">
                        <p className="font-bold">Enter the Competition</p>
                        <p className="text-sm">it&apos;s free and only takes a minute</p>
                    </div>
                </Link>
            </Link>

            <div className="w-full relative h-96 my-16">
                <Image
                    src="/img1.png"
                    alt="Collection of cute pets"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    priority
                />
            </div>
        </section>
    )
}

