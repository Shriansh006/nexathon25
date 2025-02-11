import { Navbar } from "@/components/navbar"
import { Cards } from "@/components/cards"
import { ImageSection } from "@/components/image-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-28">
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 animate-float">
                Say Hi to{" "}
                <span className="text-orange-500">manim</span>Books
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                Discover the power of mathematical animations with manimBook. Create stunning visualizations and bring
                your ideas to life.
              </p>
              <div className="flex space-x-4">
                <Link
                  href={"/ide"}
                  className="text-lg px-8 py-4 bg-orange-500 hover:bg-orange-600 transition-all rounded-3xl duration-300"
                >
                  Get Started
                </Link>
                
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <ImageSection />

        {/* Cards Section */}
        <section className="py-24 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Explore <span className="text-orange-500">manim</span>Book Features</h2>
            <Cards />
          </div>
        </section>
      </main>
    </div>
  );
}
