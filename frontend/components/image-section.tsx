import Image from "next/image"

export function ImageSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative fancy-border rounded-xl overflow-hidden">
          <div className="relative z-10 bg-card p-1 rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="manimBook Showcase"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold text-white text-foreground mb-4">Visualize Complex Concepts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            With manimBook, bring abstract mathematical ideas to life through stunning animations and visualizations.
          </p>
        </div>
      </div>
    </section>
  )
}

