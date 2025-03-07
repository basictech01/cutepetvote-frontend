import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const footerLinks = [
  { text: "Bulldog", href: "/bulldog" },
  { text: "Baby Photo Contest", href: "/contest" },
  { text: "Winners", href: "/winners" },
  { text: "Help", href: "/help" },
  { text: "Baby names", href: "/names" },
]

const legalLinks = [
  { text: "Terms & conditions", href: "/terms" },
  { text: "Is Bulldog a scam?", href: "/scam" },
  { text: "About us", href: "/about" },
]

const freeLinks = [
  { text: "Free dog owners", href: "/free-owners" },
  { text: "Contest", href: "/contest" },
]

export default function FooterSection() {
  return (
    <footer className="w-full text-sm text-gray-600 pb-4">
      <div className="flex justify-center gap-4 mb-4">
        <Link href="https://facebook.com" className="text-gray-600">
          <Facebook size={20} />
        </Link>
        <Link href="https://instagram.com" className="text-gray-600">
          <Instagram size={20} />
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-gray-900">
            {link.text}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-gray-900">
            {link.text}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
        {freeLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-gray-900">
            {link.text}
          </Link>
        ))}
      </div>

      <p className="text-center text-xs">Copyright © 2009-2025 Playground USA Inc. All rights reserved.</p>
    </footer>
  )
}

