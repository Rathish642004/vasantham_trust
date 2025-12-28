import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Heart, Users, GraduationCap, Utensils, Stethoscope, HomeIcon, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest news
  const { data: latestNews } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Floating Logo */}
      <div className="fixed right-4 top-20 z-40 block">
        <div className="rounded-full bg-white    p-1 shadow-lg">
          <Image
            src="https://res.cloudinary.com/drvu0vdww/image/upload/v1766928673/trust_logo_iaphhu.jpg"
            alt="Vasantham Trust Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 md:py-32">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                DARPAN Registered NGO
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl text-balance">
                Transforming Lives Through Compassion
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
                Vasantham Charitable Trust is dedicated to serving underprivileged communities in rural Tamil Nadu
                through elder care, food distribution, education, and medical services.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/donate">
                    Donate Now
                    <Heart className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent Appeal Section */}
        {latestNews && (
          <section className="border-y bg-accent/10 py-8">
            <div className="container px-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent">
                    <HomeIcon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-lg text-balance">{latestNews.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{latestNews.excerpt}</p>
                  </div>
                  <Button asChild variant="default" className="shrink-0">
                    <Link href="/donate">Support Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Impact Stats */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Elders Cared For</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Utensils className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">Meals Distributed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">300+</div>
                  <div className="text-sm text-muted-foreground">Students Supported</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Stethoscope className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Medical Camps</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Activities */}
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Our Core Activities</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                We focus on four key areas to create lasting positive change in rural Tamil Nadu communities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image src="/placeholder.svg?height=200&width=400" alt="Elder Care" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Elder Care Services</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Regular visits, medical assistance, and companionship for elderly residents in rural areas who
                      lack family support.
                    </p>
                    <Link
                      href="/activities#elder-care"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/5">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Food Distribution"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Utensils className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Food Distribution</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Monthly food drives providing nutritious meals and essential groceries to underprivileged families
                      and elderly citizens.
                    </p>
                    <Link
                      href="/activities#food-distribution"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Education Support"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Educational Support</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      School supplies, scholarships, and tutoring programs to help underprivileged children access
                      quality education.
                    </p>
                    <Link
                      href="/activities#education"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/5">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Medical Camps"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Stethoscope className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Medical Camps</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Free health checkups, medicine distribution, and awareness programs in remote villages with
                      limited healthcare access.
                    </p>
                    <Link
                      href="/activities#medical-camps"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Why Support Vasantham?</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                We are committed to transparency, accountability, and making a real difference in people's lives.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">DARPAN Registered</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Officially registered with NITI Aayog's DARPAN portal, ensuring complete transparency and compliance
                    with government regulations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">100% Transparency</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every donation is tracked and reported. We maintain detailed records of all activities and
                    expenditures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Direct Impact</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your contributions directly reach the beneficiaries. We minimize administrative costs to maximize
                    impact.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Regular Updates</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Stay informed with regular photo updates, reports, and stories from the field showing real progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
          <div className="container px-4 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Make a Difference Today</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 text-balance">
              Your contribution, no matter the size, creates real change in the lives of those who need it most.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/donate">
                  Donate Now
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
