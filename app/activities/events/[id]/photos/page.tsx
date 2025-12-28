import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Calendar, MapPin, ArrowLeft, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  const { data: event } = await supabase
    .from("events")
    .select("title")
    .eq("id", id)
    .single()

  return {
    title: event ? `${event.title} Photos - Vasantham Charitable Trust` : "Event Photos",
    description: event ? `View all photos from ${event.title}` : "View event photos",
  }
}

const activityTypeLabels: Record<string, string> = {
  elder_care: "Elder Care Services",
  food_distribution: "Food Distribution",
  education: "Educational Support",
  medical_camp: "Medical Camps",
}

const activityTypeRoutes: Record<string, string> = {
  elder_care: "/activities/elder-care",
  food_distribution: "/activities/food-distribution",
  education: "/activities/education",
  medical_camp: "/activities/medical-camps",
}

export default async function EventPhotosPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  const { data: event } = await supabase
    .from("events")
    .select("*, event_photos(*)")
    .eq("id", id)
    .single()

  if (!event) {
    notFound()
  }

  const activityLabel = activityTypeLabels[event.activity_type] || "Activities"
  const activityRoute = activityTypeRoutes[event.activity_type] || "/activities"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link href={activityRoute}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {activityLabel}
                </Link>
              </Button>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <ImageIcon className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.event_date), "MMMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>{event.event_photos?.length || 0} Photos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photos Grid */}
        <section className="py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl">
              {event.event_photos && event.event_photos.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {event.event_photos.map((photo: any) => (
                    <div
                      key={photo.id}
                      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={photo.image_url || "/placeholder.svg"}
                        alt={photo.caption || event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {photo.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <p className="text-sm text-white">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No photos available for this event.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Event Description */}
        {event.description && (
          <section className="border-t bg-muted/30 py-12">
            <div className="container px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-4 text-xl font-semibold">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
