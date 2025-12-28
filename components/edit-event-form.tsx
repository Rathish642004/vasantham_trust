"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase/client"

interface EditEventFormProps {
  event: {
    id: string
    title: string
    description: string
    activity_type: string
    location: string
    event_date: string
  }
}

export function EditEventForm({ event }: EditEventFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    activity_type: event.activity_type,
    location: event.location,
    event_date: event.event_date,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createBrowserClient()

    const { error } = await supabase.from("events").update(formData).eq("id", event.id)

    if (error) {
      console.error("[v0] Error updating event:", error)
      alert("Failed to update event")
    } else {
      router.refresh()
      alert("Event updated successfully!")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            <SelectValue />
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

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
