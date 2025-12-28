import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BankDetailsForm } from "./bank-details-form"
import { ContactDetailsForm } from "./contact-details-form"

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch existing settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")

  const bankDetails = settings?.find((s) => s.key === "bank_details")?.value || {
    account_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch: "",
    upi_id: "",
    qr_code_url: "",
  }

  const contactDetails = settings?.find((s) => s.key === "contact_details")?.value || {
    address: "",
    phone: "",
    email: "",
    notification_email: "",
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Site Settings</h1>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bank Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Manage the bank account details and UPI QR code displayed on the donation page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BankDetailsForm initialData={bankDetails} />
            </CardContent>
          </Card>

          {/* Contact Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Manage contact details displayed throughout the website and email notification settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactDetailsForm initialData={contactDetails} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
