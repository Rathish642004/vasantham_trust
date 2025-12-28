import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Mail, Phone } from "lucide-react"

export default async function AdminContacts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

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
          <h1 className="text-xl font-bold">Contact Messages</h1>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-6">
          <p className="text-muted-foreground">Review and respond to contact form submissions</p>
        </div>

        {contacts && contacts.length > 0 ? (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 font-semibold">{contact.name}</h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{contact.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No contact messages yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
