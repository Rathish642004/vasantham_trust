"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BankDetails {
  account_name: string
  account_number: string
  ifsc_code: string
  bank_name: string
  branch: string
  upi_id: string
  qr_code_url: string
}

interface BankDetailsFormProps {
  initialData: BankDetails
}

export function BankDetailsForm({ initialData }: BankDetailsFormProps) {
  const [formData, setFormData] = useState<BankDetails>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)

    try {
      const uploadData = new FormData()
      uploadData.append("files", file)
      uploadData.append("folder", "qr-codes")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Upload failed")
      }

      setFormData((prev) => ({ ...prev, qr_code_url: data.results[0].url }))
      setMessage({ type: "success", text: "QR code uploaded successfully!" })
    } catch (error) {
      console.error("Upload error:", error)
      setMessage({ type: "error", text: "Failed to upload QR code. Please try again." })
    } finally {
      setIsUploading(false)
    }
  }

  const removeQRCode = () => {
    setFormData((prev) => ({ ...prev, qr_code_url: "" }))
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
          { key: "bank_details", value: formData },
          { onConflict: "key" }
        )

      if (error) throw error

      setMessage({ type: "success", text: "Bank details saved successfully!" })
      router.refresh()
    } catch (error) {
      console.error("Error saving bank details:", error)
      setMessage({ type: "error", text: "Failed to save bank details. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account_name">Account Name</Label>
        <Input
          id="account_name"
          name="account_name"
          value={formData.account_name}
          onChange={handleChange}
          placeholder="Vasantham Charitable Trust"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account_number">Account Number</Label>
        <Input
          id="account_number"
          name="account_number"
          value={formData.account_number}
          onChange={handleChange}
          placeholder="1234567890"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ifsc_code">IFSC Code</Label>
          <Input
            id="ifsc_code"
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleChange}
            placeholder="SBIN0000001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank_name">Bank Name</Label>
          <Input
            id="bank_name"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="State Bank of India"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="branch">Branch</Label>
        <Input
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Main Branch"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="upi_id">UPI ID</Label>
        <Input
          id="upi_id"
          name="upi_id"
          value={formData.upi_id}
          onChange={handleChange}
          placeholder="trust@upi"
        />
      </div>

      <div className="space-y-2">
        <Label>UPI QR Code</Label>
        {formData.qr_code_url ? (
          <div className="relative inline-block">
            <Image
              src={formData.qr_code_url}
              alt="UPI QR Code"
              width={200}
              height={200}
              className="rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6"
              onClick={removeQRCode}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleQRUpload}
              disabled={isUploading}
              className="max-w-xs"
            />
            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        )}
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
        Save Bank Details
      </Button>
    </form>
  )
}
