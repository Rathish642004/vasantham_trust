"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, RefreshCw } from "lucide-react"

// Simple math CAPTCHA component
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1
  const num2 = Math.floor(Math.random() * 10) + 1
  const operators = ['+', '-'] as const
  const operator = operators[Math.floor(Math.random() * operators.length)]
  
  let answer: number
  if (operator === '+') {
    answer = num1 + num2
  } else {
    // Ensure no negative results
    const [a, b] = num1 > num2 ? [num1, num2] : [num2, num1]
    answer = a - b
    return { question: `${a} ${operator} ${b}`, answer }
  }
  
  return { question: `${num1} ${operator} ${num2}`, answer }
}

export function ContactFormWrapper() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [captcha, setCaptcha] = useState(generateCaptcha)
  const [captchaAnswer, setCaptchaAnswer] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha())
    setCaptchaAnswer("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate CAPTCHA
    if (parseInt(captchaAnswer) !== captcha.answer) {
      setError("Incorrect CAPTCHA answer. Please try again.")
      refreshCaptcha()
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setCaptchaAnswer("")
      refreshCaptcha()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("[Contact form error]:", err)
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again or email us directly.")
      refreshCaptcha()
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
        <h3 className="mb-2 text-xl font-semibold">Message Sent Successfully!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91 xxxxx xxxxx"
        />
      </div>

      <div>
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          placeholder="Tell us how we can help you or how you'd like to get involved..."
          rows={5}
        />
      </div>

      {/* CAPTCHA */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <Label htmlFor="captcha" className="mb-2 block text-sm font-medium">
          Security Check *
        </Label>
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary/10 px-4 py-2 text-lg font-semibold">
            {captcha.question} = ?
          </div>
          <Input
            id="captcha"
            type="number"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            required
            placeholder="Answer"
            className="w-24"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={refreshCaptcha}
            title="Get a new question"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Please solve this simple math problem to verify you're human.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We typically respond within 24-48 hours. For urgent matters, please call us directly.
      </p>
    </form>
  )
}
