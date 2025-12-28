import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import Image from "next/image"
import { EditEventForm } from "@/components/edit-event-form"
import { AddEventPhotoForm } from "@/components/add-event-photo-form"

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: event } = await supabase.from("events").select("*").eq("id", id).single()

  if (!event) {
    redirect("/admin/events")
  }

  const { data: photos } = await supabase
    .from("event_photos")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Edit Event</h1>
        </div>
      </header>

      <main className="container max-w-4xl py-8 px-4">
        <div className="space-y-8">
          {/* Event Details Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold">Event Details</h2>
              <EditEventForm event={event} />
            </CardContent>
          </Card>

          {/* Event Photos */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Event Photos</h2>
                <AddEventPhotoForm eventId={id} />
              </div>

              {photos && photos.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={photo.image_url || "/placeholder.svg"}
                            alt={photo.caption || "Event photo"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          {photo.caption && <p className="mb-2 text-xs text-muted-foreground">{photo.caption}</p>}
                          <form
                            action={async () => {
                              "use server"
                              const supabase = await createClient()
                              await supabase.from("event_photos").delete().eq("id", photo.id)
                              redirect(`/admin/events/${id}`)
                            }}
                          >
                            <Button type="submit" size="sm" variant="destructive" className="w-full">
                              <Trash2 className="mr-2 h-3 w-3" />
                              Delete
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">No photos added yet. Add your first photo above.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
