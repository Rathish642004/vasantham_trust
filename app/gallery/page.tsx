import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata = {
  title: "Photo Gallery - Vasantham Charitable Trust",
  description: "View photos from our programs and activities serving communities in rural Tamil Nadu.",
}

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: galleryImages } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "elder_care", label: "Elder Care" },
    { value: "food_distribution", label: "Food Distribution" },
    { value: "education", label: "Education" },
    { value: "medical_camp", label: "Medical Camps" },
    { value: "construction", label: "Construction" },
    { value: "community", label: "Community Events" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Photo Gallery
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">Our Work in Action</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                See the real impact of our programs through photos from our activities across rural Tamil Nadu.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b py-6">
          <div className="container px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge key={category.value} variant="outline" className="cursor-pointer hover:bg-primary/10">
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container px-4">
            {galleryImages && galleryImages.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image) => (
                  <Card key={image.id} className="group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 font-semibold text-sm">{image.title}</h3>
                        {image.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">{image.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No images available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Impact in Numbers</h2>
              <p className="mb-12 text-muted-foreground text-balance">
                Every photo represents lives touched and communities transformed.
              </p>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="mb-2 text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Elders Supported</div>
                </div>
                <div>
                  <div className="mb-2 text-4xl font-bold text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">Meals Distributed</div>
                </div>
                <div>
                  <div className="mb-2 text-4xl font-bold text-primary">300+</div>
                  <div className="text-sm text-muted-foreground">Students Aided</div>
                </div>
                <div>
                  <div className="mb-2 text-4xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Medical Camps</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
