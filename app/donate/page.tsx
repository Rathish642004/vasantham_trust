import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Utensils, GraduationCap, HomeIcon, Building2, CreditCard, QrCode } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Donate - Support Vasantham Charitable Trust",
  description:
    "Make a difference today. Support our elder care, food distribution, education, and medical programs in rural Tamil Nadu.",
}

interface BankDetails {
  account_name: string
  account_number: string
  ifsc_code: string
  bank_name: string
  branch: string
  upi_id: string
  qr_code_url: string
}

interface ContactDetails {
  address: string
  phone: string
  email: string
  notification_email: string
}

async function getSettings() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from("site_settings").select("*")

  const bankDetails: BankDetails = settings?.find((s) => s.key === "bank_details")?.value || {
    account_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch: "",
    upi_id: "",
    qr_code_url: "",
  }

  const contactDetails: ContactDetails = settings?.find((s) => s.key === "contact_details")?.value || {
    address: "",
    phone: "+91-73737-07162",
    email: "vasanthamcharitabletrust82@gmail.com",
    notification_email: "",
  }

  return { bankDetails, contactDetails }
}

export default async function DonatePage() {
  const { bankDetails, contactDetails } = await getSettings()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Make a Difference
              </Badge>
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">
                Your Generosity Changes Lives
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Every contribution helps us provide essential services to underprivileged communities in rural Tamil
                Nadu. Your donation makes a real, measurable impact.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Options & Bank Details */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
              {/* Donation Areas */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 font-serif text-2xl font-bold">Choose How to Help</h2>
                <div className="space-y-4">
                  <Card className="cursor-pointer transition-all hover:border-primary">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <HomeIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Old Age Home Construction</h3>
                        <p className="text-sm text-muted-foreground">
                          Help us build a permanent shelter for elderly citizens.
                        </p>
                        <p className="mt-2 text-xs font-medium text-primary">Goal: ₹50,00,000</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer transition-all hover:border-primary">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Elder Care Services</h3>
                        <p className="text-sm text-muted-foreground">Regular care visits and medical support.</p>
                        <p className="mt-2 text-xs font-medium text-accent">₹500/month sponsors one elder</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer transition-all hover:border-primary">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Utensils className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Food Distribution</h3>
                        <p className="text-sm text-muted-foreground">Monthly groceries for families in need.</p>
                        <p className="mt-2 text-xs font-medium text-primary">₹300/month feeds one family</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer transition-all hover:border-primary">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <GraduationCap className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">Education Support</h3>
                        <p className="text-sm text-muted-foreground">School supplies and scholarships.</p>
                        <p className="mt-2 text-xs font-medium text-accent">₹1000/year supports one child</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer transition-all hover:border-primary">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">General Fund</h3>
                        <p className="text-sm text-muted-foreground">Support all our programs where needed most.</p>
                        <p className="mt-2 text-xs font-medium text-primary">Any amount helps</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tax Benefits */}
                <Card className="mt-6 border-l-4 border-l-accent bg-accent/5">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-sm">Tax Benefits</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Donations to Vasantham Charitable Trust are eligible for tax deductions under Section 80G of the
                      Income Tax Act. You will receive a receipt for tax purposes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Bank Details & QR Code */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold">Bank Transfer Details</h2>
                        <p className="text-sm text-muted-foreground">Make a direct bank transfer to our account</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Bank Details */}
                      <div className="rounded-lg border bg-muted/30 p-6">
                        <div className="grid gap-4">
                          <div className="flex items-start justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">Account Name</span>
                            </div>
                            <span className="text-right font-semibold">{bankDetails.account_name}</span>
                          </div>

                          <div className="flex items-start justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">Account Number</span>
                            </div>
                            <span className="text-right font-mono font-semibold">{bankDetails.account_number}</span>
                          </div>

                          <div className="flex items-start justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">IFSC Code</span>
                            </div>
                            <span className="text-right font-mono font-semibold">{bankDetails.ifsc_code}</span>
                          </div>

                          <div className="flex items-start justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">Bank Name</span>
                            </div>
                            <span className="text-right font-semibold">{bankDetails.bank_name}</span>
                          </div>

                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">Branch</span>
                            </div>
                            <span className="text-right font-semibold">{bankDetails.branch}</span>
                          </div>
                        </div>
                      </div>

                      {/* QR Code Section */}
                      <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <QrCode className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Scan to Donate via UPI</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                          {bankDetails.qr_code_url ? (
                            <div className="flex h-55 w-55 shrink-0 items-center justify-center rounded-lg border-2 border-primary/20 bg-white p-0">
                              <Image
                                src={bankDetails.qr_code_url}
                                alt="UPI QR Code"
                                width={250}
                                height={250}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-muted/30">
                              <div className="text-center">
                                <QrCode className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-2 text-xs text-muted-foreground">QR Code</p>
                              </div>
                            </div>
                          )}
                          <div className="flex-1 space-y-3 text-center sm:text-left">
                            {bankDetails.upi_id && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">UPI ID</p>
                                <p className="font-mono font-semibold">{bankDetails.upi_id}</p>
                              </div>
                            )}
                            <div className="rounded-lg bg-accent/10 p-3">
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Open any UPI app (Google Pay, PhonePe, Paytm, etc.), scan the QR code, and complete your
                                donation instantly.
                              </p>
                            </div>
                            <div className="rounded-lg bg-accent/10 p-3">
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Before making a donation, please ensure that the paying account holder's name matches {bankDetails.account_name} to
                                avoid any transaction issues.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Important Note */}
                      <Card className="border-l-4 border-l-primary bg-primary/5">
                        <CardContent className="p-4">
                          <h4 className="mb-2 font-semibold text-sm">After Making Your Donation</h4>
                          <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
                            <li>• Please email your transaction details to {contactDetails.email}</li>
                            <li>• Include your name, PAN number for 80G certificate</li>
                            <li>• We will send you a tax receipt within 7 working days</li>
                            <li>• For queries, call {contactDetails.phone}</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="border-t bg-muted/30 py-16 md:py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Your Impact</h2>
              <p className="mb-12 text-muted-foreground text-balance">
                See how your donation directly helps our beneficiaries.
              </p>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="mb-4 text-4xl font-bold text-primary">₹500</div>
                  <p className="text-sm text-muted-foreground">Provides groceries for one family for a month</p>
                </div>
                <div>
                  <div className="mb-4 text-4xl font-bold text-accent">₹1000</div>
                  <p className="text-sm text-muted-foreground">
                    Supports one child's education with supplies for a year
                  </p>
                </div>
                <div>
                  <div className="mb-4 text-4xl font-bold text-primary">₹2500</div>
                  <p className="text-sm text-muted-foreground">Covers medical camp expenses for 50 patients</p>
                </div>
                <div>
                  <div className="mb-4 text-4xl font-bold text-accent">₹5000</div>
                  <p className="text-sm text-muted-foreground">Provides elder care services for 10 seniors monthly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Help */}
        <section className="border-t py-16 md:py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center font-serif text-3xl font-bold text-balance">Other Ways to Help</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">Volunteer Your Time</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Join us in our field activities. Your time and skills can make a significant difference in our
                      programs.
                    </p>
                    <a href="/contact" className="text-sm font-medium text-primary hover:underline">
                      Learn more →
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">Corporate Partnership</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Partner with us through CSR initiatives. We can customize programs aligned with your corporate
                      values.
                    </p>
                    <a href="/contact" className="text-sm font-medium text-primary hover:underline">
                      Get in touch →
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">In-Kind Donations</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Donate food, medicines, school supplies, or other essentials. Contact us to coordinate delivery.
                    </p>
                    <a href="/contact" className="text-sm font-medium text-primary hover:underline">
                      Contact us →
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">Spread Awareness</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Share our mission with your network. Help us reach more people who care about making a difference.
                    </p>
                    <a href="/about" className="text-sm font-medium text-primary hover:underline">
                      Learn about our work →
                    </a>
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
