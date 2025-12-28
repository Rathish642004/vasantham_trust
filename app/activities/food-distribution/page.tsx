import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/server"
import { Utensils, Calendar, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

export const metadata = {
  title: "Food Distribution - Vasantham Charitable Trust",
  description: "View all our food distribution events and activities in rural Tamil Nadu.",
}

export default async function FoodDistributionPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  // Build query with filters
  let query = supabase
    .from("events")
    .select("*, event_photos(*)")
    .eq("activity_type", "food_distribution")
    .order("event_date", { ascending: false })

  if (params.year) {
    const year = Number.parseInt(params.year)
    query = query.gte("event_date", `${year}-01-01`).lte("event_date", `${year}-12-31`)
  }

  if (params.month && params.year) {
    const year = Number.parseInt(params.year)
    const month = Number.parseInt(params.month)
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    query = query
      .gte("event_date", startDate.toISOString().split("T")[0])
      .lte("event_date", endDate.toISOString().split("T")[0])
  }

  const { data: events } = await query

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-accent/5 to-primary/5 py-12 md:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link href="/activities">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Activities
                </Link>
              </Button>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <Utensils className="h-7 w-7 text-accent" />
              </div>
              <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl text-balance">Food Distribution</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Monthly food drives providing nutritious meals and essential groceries to underprivileged families.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b bg-background py-6">
          <div className="container px-4">
            <form method="get" className="mx-auto flex max-w-4xl flex-wrap gap-3">
              <Select name="year" defaultValue={params.year || "all"}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select name="month" defaultValue={params.month || "all"}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" size="sm">
                Apply Filters
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/activities/food-distribution">Clear Filters</Link>
              </Button>
            </form>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              {events && events.length > 0 ? (
                <div className="space-y-8">
                  {events.map((event: any) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr]">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(event.event_date), "MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <div>
                            <h2 className="mb-3 text-2xl font-bold text-balance">{event.title}</h2>
                            <p className="mb-4 text-muted-foreground leading-relaxed">{event.description}</p>

                            {event.event_photos && event.event_photos.length > 0 && (
                              <div>
                                <div className="mb-3 flex items-center justify-between">
                                  <h3 className="text-sm font-semibold">Event Photos</h3>
                                  {event.event_photos.length > 6 && (
                                    <span className="text-xs text-muted-foreground">
                                      Showing 6 of {event.event_photos.length} photos
                                    </span>
                                  )}
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {event.event_photos.slice(0, 6).map((photo: any) => (
                                    <div
                                      key={photo.id}
                                      className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                                    >
                                      <Image
                                        src={photo.image_url || "/placeholder.svg"}
                                        alt={photo.caption || event.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                    </div>
                                  ))}
                                </div>
                                {event.event_photos.length > 6 && (
                                  <div className="mt-4 text-center">
                                    <Button asChild variant="outline" size="sm">
                                      <Link href={`/activities/events/${event.id}/photos`}>
                                        View All {event.event_photos.length} Photos
                                      </Link>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No events found for the selected filters.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
