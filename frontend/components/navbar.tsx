import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blur bg-transparent backdrop-blur-sm border-0 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={100} height={96} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href={"/ide"} className=" bg-white text-black text-sm px-4 py-2 rounded-lg mr-4 font-semibold">
                IDE
              </Link>
              <Link href={"/publish"} className=" bg-orange-500 text-sm px-4 py-2 rounded-lg font-semibold">Publish</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
