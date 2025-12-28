import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

export async function uploadToCloudinary(
  file: Buffer,
  options?: {
    folder?: string
    transformation?: object
  }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options?.folder || "vasantham_trust/events",
        resource_type: "image",
        transformation: options?.transformation || [
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          })
        }
      }
    )

    uploadStream.end(file)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export default cloudinary
