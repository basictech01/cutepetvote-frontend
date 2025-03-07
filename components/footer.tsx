"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Trophy, Plus, Send, User } from "lucide-react";

export default function Footer() {
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200">
            <nav className="flex justify-around items-center py-3">
                <Link href="/" className="flex flex-col items-center">
                    <Home size={24} className={currentPath === "/" ? "text-amber-500" : ""} />
                </Link>

                <Link href="/leaderboard" className="flex flex-col items-center">
                    <Trophy size={24} className={currentPath === "/leaderboard" ? "text-amber-500" : ""} />
                </Link>

                <Link href="/add" className="flex flex-col items-center">
                    <div className="bg-gray-100 rounded-full p-2">
                        <Plus size={24} className={currentPath === "/add" ? "text-amber-500" : ""} />
                    </div>
                </Link>

                <Link href="/share" className="flex flex-col items-center">
                    <Send size={24} className={currentPath === "/share" ? "text-amber-500" : ""} />
                </Link>

                <Link href="/participants" className="flex flex-col items-center">
                    <User size={24} className={currentPath === "/participants" ? "text-amber-500" : ""} />
                </Link>
            </nav>
        </footer>
    );
}

