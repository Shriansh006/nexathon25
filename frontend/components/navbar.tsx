import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blur backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={100} height={96} />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/docs"
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-xl font-medium"
                >
                  Docs
                </Link>
                {/* Add more navigation items here */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href={"/ide"} className=" bg-white text-black text-xl px-4 py-2 rounded-lg mr-4">
                IDE
              </Link>
              <Link href={"/publish"} className=" bg-orange-500 text-xl px-4 py-2 rounded-lg">Publish</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
