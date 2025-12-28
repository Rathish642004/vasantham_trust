import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, ImageIcon, FileText, Mail, Heart, Calendar, Settings } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get counts
  const { count: galleryCount } = await supabase.from("gallery").select("*", { count: "exact", head: true })
  const { count: newsCount } = await supabase.from("news").select("*", { count: "exact", head: true })
  const { count: contactCount } = await supabase.from("contact_submissions").select("*", { count: "exact", head: true })
  const { count: donationCount } = await supabase.from("donations").select("*", { count: "exact", head: true })
  const { count: eventsCount } = await supabase.from("events").select("*", { count: "exact", head: true })

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Vasantham Admin Panel</h1>
          <form
            action={async () => {
              "use server"
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect("/")
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your NGO website content from here.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
          {/* <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{galleryCount || 0}</div>
                <div className="text-sm text-muted-foreground">Gallery Images</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{newsCount || 0}</div>
                <div className="text-sm text-muted-foreground">News Posts</div>
              </div>
            </CardContent>
          </Card> */}

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{eventsCount || 0}</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{contactCount || 0}</div>
                <div className="text-sm text-muted-foreground">Contact Messages</div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{donationCount || 0}</div>
                <div className="text-sm text-muted-foreground">Donations</div>
              </div>
            </CardContent>
          </Card> */}


        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Events Management</h3>
              <p className="mb-4 text-sm text-muted-foreground">Create and manage events for all activity programs.</p>
              <Button asChild>
                <Link href="/admin/events">Manage Events</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Gallery Management</h3>
              <p className="mb-4 text-sm text-muted-foreground">Add, edit, or remove photos from your photo gallery.</p>
              <Button asChild>
                <Link href="/admin/gallery">Manage Gallery</Link>
              </Button>
            </CardContent>
          </Card> */}

{/* 
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">News & Updates</h3>
              <p className="mb-4 text-sm text-muted-foreground">Create and publish news posts and announcements.</p>
              <Button asChild>
                <Link href="/admin/news">Manage News</Link>
              </Button>
            </CardContent>
          </Card> */}

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Contact Messages</h3>
              <p className="mb-4 text-sm text-muted-foreground">View and respond to contact form submissions.</p>
              <Button asChild>
                <Link href="/admin/contacts">View Messages</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Site Settings</h3>
              <p className="mb-4 text-sm text-muted-foreground">Manage bank details, contact info, and QR code.</p>
              <Button asChild>
                <Link href="/admin/settings">Manage Settings</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Donation Records</h3>
              <p className="mb-4 text-sm text-muted-foreground">Track and manage donation submissions.</p>
              <Button asChild>
                <Link href="/admin/donations">View Donations</Link>
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}
