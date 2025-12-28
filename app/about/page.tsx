import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Heart, Award, Users, FileCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "About Us - Vasantham Charitable Trust",
  description:
    "Learn about our mission, vision, and DARPAN registration. Discover how Vasantham Charitable Trust is making a difference in rural Tamil Nadu.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                About Vasantham
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">
                Building a Compassionate Community
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Vasantham Charitable Trust is a DARPAN registered non-profit organization dedicated to uplifting
                underprivileged communities in rural Tamil Nadu through sustainable social initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl text-balance">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Vasantham Charitable Trust was founded with a simple yet powerful vision: to bring hope, dignity,
                    and support to those who need it most in rural Tamil Nadu. What began as small-scale community
                    service has grown into a comprehensive charitable organization touching thousands of lives.
                  </p>
                  <p>
                    Our journey started when we witnessed the struggles of elderly citizens living without family
                    support, children unable to access education, and families going hungry. We knew we had to act.
                    Today, we operate multiple programs addressing these critical needs with the help of dedicated
                    volunteers and generous donors.
                  </p>
                  <p>
                    Registered under the DARPAN portal (NITI Aayog), we maintain the highest standards of transparency
                    and accountability. Every rupee donated is tracked, and every initiative is documented with regular
                    reports shared with our supporters.
                  </p>
                </div>
              </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/elderly-care-volunteers-tamil-nadu-rural.jpg"
                  alt="Vasantham volunteers serving community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-4 font-serif text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower underprivileged communities in rural Tamil Nadu by providing essential services in elder
                    care, nutrition, education, and healthcare, while maintaining complete transparency and
                    accountability in all our operations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-4 font-serif text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A society where every individual, regardless of age or economic status, has access to dignity, care,
                    education, and opportunities to thrive. We envision rural communities where no one is left behind.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">Our Core Values</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                These principles guide every decision we make and every action we take.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Compassion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every action is driven by genuine care and empathy for those we serve.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <FileCheck className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">Transparency</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Complete openness in all financial and operational matters.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Commitment to delivering the highest quality service to our beneficiaries.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building strong, supportive networks that empower local communities.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Impact-Focused</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every initiative is measured by real, tangible outcomes.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">Dignity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Treating every individual with respect and preserving their self-worth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Details */}
        <section className="border-t bg-muted/30 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <FileCheck className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Legal Registration & Compliance</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed text-pretty">
                Vasantham Charitable Trust is officially registered with NITI Aayog's DARPAN portal, ensuring full
                compliance with Indian regulatory requirements for non-profit organizations.
              </p>
              <div className="rounded-lg border bg-card p-6 text-left">
                <dl className="space-y-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <dt className="font-semibold">Organization Type:</dt>
                    <dd className="text-muted-foreground">Charitable Trust</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <dt className="font-semibold">DARPAN ID:</dt>
                    <dd className="text-muted-foreground">TN/2025/0697149</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <dt className="font-semibold">Registration Act:</dt>
                    <dd className="text-muted-foreground">Indian Trust Act</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <dt className="font-semibold">Operating Since:</dt>
                    <dd className="text-muted-foreground">2020</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <dt className="font-semibold">Primary Location:</dt>
                    <dd className="text-muted-foreground">Rural Tamil Nadu</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Documentation Section */}
        <section className="border-t py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                  Legal Documentation & Transparency
                </h2>
                <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                  We believe in complete transparency. Download our official documents to verify our legal status and
                  review our activities.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <FileCheck className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">Form No 10AC</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Official order of provisional approval under the Income Tax Act.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      {/* <span className="text-muted-foreground">PDF • 2.3 MB</span> */}
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                        <FileCheck className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg">DARPAN Registration</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      NITI Aayog DARPAN portal registration certificate verifying our NGO status.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      {/* <span className="text-muted-foreground">PDF • 1.8 MB</span> */}
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card>

                {/* <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <FileCheck className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">80G Tax Exemption Certificate</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Income Tax Department certificate allowing tax deduction benefits for donors.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">PDF • 1.5 MB</span>
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                        <FileCheck className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg">Annual Report 2024</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Comprehensive report of our activities, financials, and impact for the year 2024.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">PDF • 5.2 MB</span>
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <FileCheck className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">PAN Card</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Permanent Account Number issued by Income Tax Department for the trust.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">PDF • 800 KB</span>
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                        <FileCheck className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg">Audited Financial Statement</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Independently audited financial statements showing income and expenditure details.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">PDF • 3.7 MB</span>
                      <span className="font-medium text-primary group-hover:underline">Download →</span>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              <Card className="mt-8 border-l-4 border-l-accent bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <FileCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">Verify Our Credentials</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        You can independently verify our DARPAN registration on the NITI Aayog portal at{" "}
                        <a
                          href="https://ngodarpan.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary underline"
                        >
                          ngodarpan.gov.in
                        </a>
                        . For any queries regarding our documentation, please contact us.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16 md:py-20">
          <div className="container px-4 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Join Our Mission</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-balance">
              Whether through donations, volunteering, or spreading awareness, you can be part of the change.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/donate">Make a Donation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
