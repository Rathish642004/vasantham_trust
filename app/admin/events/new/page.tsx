"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    activity_type: "",
    location: "",
    event_date: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createBrowserClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("You must be logged in to create an event")
      router.push("/auth/login")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.from("events").insert([formData]).select()

    if (error) {
      console.error("[v0] Error creating event:", error.message, error.details, error.hint)
      alert(`Failed to create event: ${error.message}`)
    } else {
      router.push("/admin/events")
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Create New Event</h1>
        </div>
      </header>

      <main className="container max-w-2xl py-8 px-4">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Monthly Food Distribution Drive"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity_type">Activity Type *</Label>
                <Select
                  required
                  value={formData.activity_type}
                  onValueChange={(value) => setFormData({ ...formData, activity_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elder_care">Elder Care Services</SelectItem>
                    <SelectItem value="food_distribution">Food Distribution</SelectItem>
                    <SelectItem value="education">Educational Support</SelectItem>
                    <SelectItem value="medical_camp">Medical Camps</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the event..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Community Center, Periyakulam"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event_date">Event Date *</Label>
                <Input
                  id="event_date"
                  type="date"
                  required
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Event"}
                </Button>
                <Button asChild type="button" variant="outline" className="flex-1 bg-transparent">
                  <Link href="/admin/events">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
