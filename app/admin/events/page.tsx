import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Plus } from "lucide-react"
import { format } from "date-fns"
import { DeleteEventButton } from "@/components/delete-event-button"

export default async function AdminEvents() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: events } = await supabase
    .from("events")
    .select("*, event_photos(count)")
    .order("event_date", { ascending: false })

  const activityTypes: Record<string, { label: string; color: string }> = {
    elder_care: { label: "Elder Care", color: "bg-primary" },
    food_distribution: { label: "Food Distribution", color: "bg-accent" },
    education: { label: "Education", color: "bg-primary" },
    medical_camp: { label: "Medical Camp", color: "bg-accent" },
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Events Management</h1>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">Manage events for all activities</p>
          <Button asChild>
            <Link href="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Event
            </Link>
          </Button>
        </div>

        {events && events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event: any) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge className={activityTypes[event.activity_type]?.color || "bg-muted"}>
                          {activityTypes[event.activity_type]?.label || event.activity_type}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(event.event_date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {event.event_photos?.[0]?.count || 0} photo(s) attached
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/events/${event.id}`}>Edit</Link>
                      </Button>
                      <DeleteEventButton eventId={event.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="mb-4 text-muted-foreground">No events created yet.</p>
              <Button asChild>
                <Link href="/admin/events/new">Create Your First Event</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
