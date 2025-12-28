import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ContactFormWrapper } from "@/components/contact-form-wrapper"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Contact Us - Vasantham Charitable Trust",
  description: "Get in touch with Vasantham Charitable Trust. Reach out for volunteering, partnerships, or inquiries.",
}

interface ContactDetails {
  address: string
  phone: string
  email: string
  notification_email: string
}

async function getContactDetails(): Promise<ContactDetails> {
  const supabase = await createClient()
  const { data: settings } = await supabase.from("site_settings").select("*").eq("key", "contact_details").single()

  return settings?.value || {
    address: "3-55, Samathuvapuram, ward no 3, Kothapulli, Reddiyarchathiram (po), Dindigul, Tamil Nadu - 624 622",
    phone: "+91 73737 07162",
    email: "vasanthamcharitabletrust82@gmail.com",
    notification_email: "",
  }
}

export default async function ContactPage() {
  const contactDetails = await getContactDetails()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Get in Touch
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">Contact Us</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Have questions? Want to volunteer or partner with us? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 font-serif text-2xl font-bold">Contact Information</h2>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Address</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {contactDetails.address}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Phone</h3>
                        <p className="text-sm text-muted-foreground">
                          {contactDetails.phone}
                          <br />
                          Available 24/7 for urgent inquiries
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Email</h3>
                        <p className="text-sm text-muted-foreground">
                          {contactDetails.email}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Office Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 border-l-4 border-l-accent bg-accent/5">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-sm">DARPAN Registration</h3>
                    <p className="mb-1 text-xs text-muted-foreground">
                      <span className="font-medium">DARPAN ID:</span> TN/2025/0697149
                    </p>
                    <p className="text-xs text-muted-foreground">Registered under the Indian Trust Act</p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="mb-6 font-serif text-2xl font-bold">Send Us a Message</h2>
                    <ContactFormWrapper />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/30 py-16 md:py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center font-serif text-3xl font-bold text-balance">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">How can I volunteer with Vasantham?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We welcome volunteers for our field programs, events, and administrative tasks. Please fill out
                      the contact form with your details and mention your interest in volunteering. We'll reach out with
                      available opportunities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">Are donations tax-deductible?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Yes, donations to Vasantham Charitable Trust are eligible for tax deduction under Section 80G of
                      the Income Tax Act. You will receive an official receipt for all contributions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">Can I visit your programs in person?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Yes, we encourage supporters to visit and witness our work firsthand. Please contact us in advance
                      to schedule a visit so we can coordinate with our field teams.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">How do I set up corporate partnership?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We offer customized CSR partnership programs for corporations. Contact us via email or phone to
                      discuss how we can align our initiatives with your corporate social responsibility goals.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
