import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Mail, Phone } from "lucide-react"

export default async function AdminDonations() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: donations } = await supabase.from("donations").select("*").order("created_at", { ascending: false })

  const totalAmount = donations?.reduce((sum, d) => sum + Number.parseFloat(d.amount.toString()), 0) || 0

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
          <h1 className="text-xl font-bold">Donation Records</h1>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-6">
          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Total Donations Received</div>
              <div className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {donations && donations.length > 0 ? (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="font-semibold">{donation.donor_name}</h3>
                        <Badge variant="secondary">{donation.donation_type.replace("-", " ")}</Badge>
                      </div>
                      <div className="mb-2 flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{donation.donor_email}</span>
                        </div>
                        {donation.donor_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{donation.donor_phone}</span>
                          </div>
                        )}
                      </div>
                      {donation.message && <p className="text-sm text-muted-foreground">{donation.message}</p>}
                      <p className="mt-2 text-xs text-muted-foreground">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ₹{Number.parseFloat(donation.amount.toString()).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No donation records yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
