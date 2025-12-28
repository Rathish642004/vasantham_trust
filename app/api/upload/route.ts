import { NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary, UploadResult } from "@/lib/cloudinary"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

interface UploadResponse {
  success: boolean
  results?: {
    url: string
    publicId: string
    filename: string
    width: number
    height: number
  }[]
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const eventId = formData.get("eventId") as string
    const customFolder = formData.get("folder") as string

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files provided" },
        { status: 400 }
      )
    }

    // Validate files
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"]
    
    for (const file of files) {
      if (!validImageTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `Invalid file type: ${file.name}. Only images are allowed.` },
          { status: 400 }
        )
      }
      
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `File too large: ${file.name}. Maximum size is 10MB.` },
          { status: 400 }
        )
      }
    }

    // Determine the upload folder
    let uploadFolder = "vasantham_trust/events"
    if (customFolder) {
      uploadFolder = `vasantham_trust/${customFolder}`
    } else if (eventId) {
      uploadFolder = `vasantham_trust/events/${eventId}`
    }

    // Upload files to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const result = await uploadToCloudinary(buffer, {
        folder: uploadFolder,
      })

      return {
        url: result.secure_url,
        publicId: result.public_id,
        filename: file.name,
        width: result.width,
        height: result.height,
      }
    })

    const results = await Promise.all(uploadPromises)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    )
  }
}
