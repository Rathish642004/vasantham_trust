import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Utensils, GraduationCap, Stethoscope } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Our Activities - Vasantham Charitable Trust",
  description:
    "Explore our comprehensive programs including elder care, food distribution, education support, and medical camps in rural Tamil Nadu.",
}

export default function ActivitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Our Programs
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">
                Creating Lasting Impact Through Action
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Our diverse programs address the most pressing needs of rural communities, from elder care to education,
                ensuring holistic development and support.
              </p>
            </div>
          </div>
        </section>

        {/* Activities Quick Navigation */}
        <section className="border-b py-8">
          <div className="container px-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/activities/elder-care">Elder Care Services</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/activities/food-distribution">Food Distribution</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/activities/education">Educational Support</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/activities/medical-camps">Medical Camps</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Elder Care Services */}
        <section id="elder-care" className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Elder Care Services</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  In rural Tamil Nadu, many elderly citizens live alone without family support. Our elder care program
                  provides regular visits, companionship, medical assistance, and emotional support to these vulnerable
                  individuals.
                </p>
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Regular home visits to check on health and well-being</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Coordination with local doctors for medical checkups and prescriptions
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Distribution of essential medicines and health supplements
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Companionship and emotional support programs</p>
                  </div>
                </div>
                <Card className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">
                      <span className="text-primary">500+</span> elderly citizens currently receiving regular care and
                      support
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src="/elderly-care-volunteers-rural-india.jpg"
                    alt="Elder care services"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Distribution */}
        <section id="food-distribution" className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src="/food-distribution-rural-tamil-nadu.jpg"
                    alt="Food distribution program"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                  <Utensils className="h-7 w-7 text-accent" />
                </div>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Food Distribution</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  No one should go hungry. Our monthly food distribution drives provide nutritious meals and essential
                  groceries to underprivileged families, elderly citizens, and vulnerable individuals across rural Tamil
                  Nadu.
                </p>
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Monthly distribution of rice, dal, oil, and essential staples
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">Hot meal services during special occasions and festivals</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">Nutrition education and healthy eating awareness programs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Priority support for single mothers and disabled individuals
                    </p>
                  </div>
                </div>
                <Card className="border-l-4 border-l-accent bg-accent/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">
                      <span className="text-accent">10,000+</span> meals distributed monthly to families in need
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Support */}
        <section id="education" className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Educational Support</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Education is the key to breaking the cycle of poverty. We provide comprehensive support to
                  underprivileged children, ensuring they have access to quality education and resources needed to
                  succeed.
                </p>
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Distribution of school supplies, textbooks, and uniforms</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Merit-based scholarships for high-achieving students</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Free tutoring and after-school support programs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">Computer literacy and vocational training workshops</p>
                  </div>
                </div>
                <Card className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">
                      <span className="text-primary">300+</span> students currently enrolled in our education support
                      programs
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src="/children-education-rural-india-classroom.jpg"
                    alt="Educational support programs"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Camps */}
        <section id="medical-camps" className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src="/medical-camp-rural-india-doctors.jpg"
                    alt="Medical camp services"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                  <Stethoscope className="h-7 w-7 text-accent" />
                </div>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Medical Camps</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Healthcare access is limited in rural areas. We organize regular medical camps bringing qualified
                  doctors, free checkups, essential medicines, and health awareness to remote villages across Tamil
                  Nadu.
                </p>
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">Free general health checkups and disease screening</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Distribution of essential medicines and first aid supplies
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">Eye care, dental care, and women's health services</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-sm leading-relaxed">
                      Health education on hygiene, nutrition, and disease prevention
                    </p>
                  </div>
                </div>
                <Card className="border-l-4 border-l-accent bg-accent/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">
                      <span className="text-accent">50+</span> medical camps conducted annually reaching thousands of
                      patients
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Old Age Home Construction */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <Badge variant="secondary" className="mb-4">
                  Urgent Appeal
                </Badge>
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                  Old Age Home Construction Project
                </h2>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  Our most ambitious project yet - building a dedicated facility to provide shelter, care, and dignity
                  to elderly citizens.
                </p>
              </div>

              <Card className="overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src="/old-age-home-construction-site.jpg"
                    alt="Old age home construction"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-xl font-semibold">Project Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We are constructing a purpose-built old age home that will provide permanent shelter, 24/7 care,
                        medical facilities, and a dignified living environment for elderly citizens who have nowhere
                        else to go. The facility will accommodate 50 residents initially, with plans for expansion.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-1 text-2xl font-bold text-primary">₹50L</div>
                        <div className="text-xs text-muted-foreground">Estimated Cost</div>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-1 text-2xl font-bold text-accent">50</div>
                        <div className="text-xs text-muted-foreground">Initial Capacity</div>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="mb-1 text-2xl font-bold text-primary">24/7</div>
                        <div className="text-xs text-muted-foreground">Care Available</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold">Planned Facilities</h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Private & shared accommodation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Medical clinic & pharmacy</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Community dining hall</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Recreation & activity areas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Prayer & meditation spaces</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Garden & outdoor areas</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-accent/10 p-4">
                      <p className="text-sm font-medium text-accent-foreground">
                        Your support will help us provide a safe, caring home for elderly citizens who deserve dignity
                        and comfort in their golden years.
                      </p>
                    </div>

                    <Button asChild size="lg" className="w-full">
                      <Link href="/donate">Support This Project</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Schedule */}
        <section className="border-t bg-muted/30 py-16 md:py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Get Involved</h2>
              <p className="mb-8 text-muted-foreground text-balance">
                Join us in our programs or contribute to make a lasting impact in rural Tamil Nadu.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/donate">Make a Donation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Volunteer With Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
