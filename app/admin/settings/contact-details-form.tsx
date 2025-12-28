"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ContactDetails {
  address: string
  phone: string
  email: string
  notification_email: string
}

interface ContactDetailsFormProps {
  initialData: ContactDetails
}

export function ContactDetailsForm({ initialData }: ContactDetailsFormProps) {
  const [formData, setFormData] = useState<ContactDetails>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from("site_settings")
        .upsert(
          { key: "contact_details", value: formData },
          { onConflict: "key" }
        )

      if (error) throw error

      setMessage({ type: "success", text: "Contact details saved successfully!" })
      router.refresh()
    } catch (error) {
      console.error("Error saving contact details:", error)
      setMessage({ type: "error", text: "Failed to save contact details. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter full address"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 12345 67890"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Display Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="info@example.org"
        />
        <p className="text-xs text-muted-foreground">
          This email will be displayed on the website for public contact.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notification_email">Notification Email</Label>
        <Input
          id="notification_email"
          name="notification_email"
          type="email"
          value={formData.notification_email}
          onChange={handleChange}
          placeholder="admin@example.org"
        />
        <p className="text-xs text-muted-foreground">
          Contact form submissions will be sent to this email address.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-md p-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Contact Details
      </Button>
    </form>
  )
}
