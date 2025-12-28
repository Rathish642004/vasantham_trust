import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default async function AdminGallery() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: galleryImages } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

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
          <h1 className="text-xl font-bold">Gallery Management</h1>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">Manage your photo gallery images</p>
          <Button>Add New Image</Button>
        </div>

        {galleryImages && galleryImages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <Card key={image.id}>
                <CardContent className="p-4">
                  <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mb-1 font-semibold text-sm">{image.title}</h3>
                  <p className="mb-3 text-xs text-muted-foreground">{image.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No images in gallery yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
