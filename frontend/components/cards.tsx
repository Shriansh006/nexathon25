import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const cardData = [
  { title: "Basic Animations", description: "Learn the fundamentals of creating animations with manimBook." },
  { title: "Advanced Techniques", description: "Dive deep into complex animation techniques and effects." },
  {
    title: "Mathematical Visualizations",
    description: "Bring mathematical concepts to life with stunning visualizations.",
  },
  { title: "Custom Shapes", description: "Create and animate custom shapes for unique presentations." },
  { title: "Interactive Animations", description: "Build interactive animations for engaging educational content." },
  { title: "Export & Share", description: "Export your animations in various formats and share them easily." },
]

export function Cards() {
  return (
    <div className="grid grid-cols-3 gap-8 w-3/4 m-auto">
      {cardData.map((card, index) => (
        <div key={index} className="rounded-xl overflow-hidden">
          <Card className="border-0 relative z-10 bg-orange-500 text-card-foreground p-6 h-full aspect-[1/1] min-h-[50px] min-w-[50px] flex flex-col justify-between transition-transform duration-300 hover:scale-105 ">
            <CardHeader>
              <CardTitle className="text-primary text-gray-800 text-2xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent >
              <CardDescription className="text-muted-foreground text-gray-200 text-xl">{card.description}</CardDescription>
            </CardContent>
            <CardFooter >
              <Button variant="outline" className="w-full text-xl py-1 px-2 hover:bg-primary border-0 hover:text-primary-foreground bg-yellow-100">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )
}
