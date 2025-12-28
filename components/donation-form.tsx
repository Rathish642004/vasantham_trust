"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const predefinedAmounts = [500, 1000, 2500, 5000, 10000]
const donationTypes = [
  { value: "old-age-home", label: "Old Age Home Construction" },
  { value: "elder-care", label: "Elder Care Services" },
  { value: "food-distribution", label: "Food Distribution" },
  { value: "education", label: "Education Support" },
  { value: "medical-camps", label: "Medical Camps" },
  { value: "general", label: "General Fund" },
]

export function DonationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    customAmount: "",
    donationType: "general",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const finalAmount = formData.amount === "custom" ? formData.customAmount : formData.amount

    if (!finalAmount || Number.parseFloat(finalAmount) <= 0) {
      setError("Please enter a valid donation amount")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from("donations").insert({
        donor_name: formData.donorName,
        donor_email: formData.donorEmail,
        donor_phone: formData.donorPhone || null,
        amount: Number.parseFloat(finalAmount),
        donation_type: formData.donationType,
        message: formData.message || null,
      })

      if (insertError) throw insertError

      setSuccess(true)
      setFormData({
        donorName: "",
        donorEmail: "",
        donorPhone: "",
        amount: "",
        customAmount: "",
        donationType: "general",
        message: "",
      })

      // Show success message for 3 seconds then redirect
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (err) {
      console.error("[v0] Donation submission error:", err)
      setError("Failed to submit donation. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-accent bg-accent/10 p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <svg
              className="h-8 w-8 text-accent-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Thank You for Your Generosity!</h3>
        <p className="text-sm text-muted-foreground">
          Your donation has been received. We will contact you shortly with payment details and a receipt for tax
          purposes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Details */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="donorName">Full Name *</Label>
          <Input
            id="donorName"
            value={formData.donorName}
            onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="donorEmail">Email Address *</Label>
          <Input
            id="donorEmail"
            type="email"
            value={formData.donorEmail}
            onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <Label htmlFor="donorPhone">Phone Number</Label>
          <Input
            id="donorPhone"
            type="tel"
            value={formData.donorPhone}
            onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
            placeholder="+91 xxxxx xxxxx"
          />
        </div>
      </div>

      {/* Donation Type */}
      <div>
        <Label className="mb-3 block">Choose Donation Purpose *</Label>
        <RadioGroup
          value={formData.donationType}
          onValueChange={(value) => setFormData({ ...formData, donationType: value })}
        >
          {donationTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="cursor-pointer font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Amount Selection */}
      <div>
        <Label className="mb-3 block">Select Amount *</Label>
        <div className="grid grid-cols-3 gap-3">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData({ ...formData, amount: amount.toString(), customAmount: "" })}
              className={`rounded-lg border-2 p-3 text-center transition-all ${
                formData.amount === amount.toString()
                  ? "border-primary bg-primary/10 font-semibold"
                  : "border-border hover:border-primary/50"
              }`}
            >
              ₹{amount.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, amount: "custom" })}
            className={`w-full rounded-lg border-2 p-3 text-center transition-all ${
              formData.amount === "custom"
                ? "border-primary bg-primary/10 font-semibold"
                : "border-border hover:border-primary/50"
            }`}
          >
            Custom Amount
          </button>

          {formData.amount === "custom" && (
            <div className="mt-3">
              <Input
                type="number"
                value={formData.customAmount}
                onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                placeholder="Enter amount in ₹"
                min="1"
              />
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share why you're supporting Vasantham..."
          rows={3}
        />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-lg bg-muted p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          After submitting this form, our team will contact you with payment details. You can donate via bank transfer,
          UPI, or check. A receipt will be provided for tax deduction under Section 80G.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Proceed with Donation"
        )}
      </Button>
    </form>
  )
}
