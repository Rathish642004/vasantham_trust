"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plus, Upload, Link as LinkIcon, FolderOpen, X, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface AddEventPhotoFormProps {
  eventId: string
}

interface FilePreview {
  file: File
  preview: string
  status: "pending" | "uploading" | "success" | "error"
  url?: string
  error?: string
}

export function AddEventPhotoForm({ eventId }: AddEventPhotoFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadMode, setUploadMode] = useState<"url" | "file">("file")
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([])
  const [formData, setFormData] = useState({
    image_url: "",
    caption: "",
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    const newFiles: FilePreview[] = []
    
    Array.from(files).forEach((file) => {
      if (!validImageTypes.includes(file.type)) {
        return // Skip non-image files
      }
      
      if (file.size > maxSize) {
        newFiles.push({
          file,
          preview: "",
          status: "error",
          error: "File too large (max 10MB)",
        })
        return
      }

      const preview = URL.createObjectURL(file)
      newFiles.push({
        file,
        preview,
        status: "pending",
      })
    })

    setSelectedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev]
      // Revoke the object URL to prevent memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }, [])

  const clearAllFiles = useCallback(() => {
    selectedFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setSelectedFiles([])
  }, [selectedFiles])

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createBrowserClient()

    const { error } = await supabase.from("event_photos").insert([
      {
        event_id: eventId,
        image_url: formData.image_url,
        caption: formData.caption,
      },
    ])

    if (error) {
      console.error("Error adding photo:", error)
      alert("Failed to add photo")
    } else {
      setFormData({ image_url: "", caption: "" })
      setOpen(false)
      router.refresh()
    }

    setLoading(false)
  }

  const handleFileUpload = async () => {
    const pendingFiles = selectedFiles.filter((f) => f.status === "pending")
    if (pendingFiles.length === 0) return

    setLoading(true)
    setUploadProgress(0)

    const formDataUpload = new FormData()
    pendingFiles.forEach((f) => {
      formDataUpload.append("files", f.file)
    })
    formDataUpload.append("eventId", eventId)

    try {
      // Update status to uploading
      setSelectedFiles((prev) =>
        prev.map((f) =>
          f.status === "pending" ? { ...f, status: "uploading" as const } : f
        )
      )

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Upload failed")
      }

      // Update file statuses with URLs
      setSelectedFiles((prev) =>
        prev.map((f) => {
          if (f.status === "uploading") {
            const result = data.results?.find(
              (r: { filename: string }) => r.filename === f.file.name
            )
            if (result) {
              return { ...f, status: "success" as const, url: result.url }
            }
          }
          return f
        })
      )

      setUploadProgress(50)

      // Save to Supabase
      const supabase = createBrowserClient()
      const photosToInsert = data.results.map(
        (result: { url: string; filename: string }) => ({
          event_id: eventId,
          image_url: result.url,
          caption: result.filename.replace(/\.[^/.]+$/, ""), // Use filename without extension as caption
        })
      )

      const { error } = await supabase.from("event_photos").insert(photosToInsert)

      if (error) {
        throw new Error("Failed to save photos to database")
      }

      setUploadProgress(100)

      // Close dialog and refresh after a short delay
      setTimeout(() => {
        clearAllFiles()
        setOpen(false)
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Upload error:", error)
      setSelectedFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? {
                ...f,
                status: "error" as const,
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : f
        )
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const pendingCount = selectedFiles.filter((f) => f.status === "pending").length
  const successCount = selectedFiles.filter((f) => f.status === "success").length
  const errorCount = selectedFiles.filter((f) => f.status === "error").length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Event Photos</DialogTitle>
        </DialogHeader>

        <Tabs value={uploadMode} onValueChange={(v) => setUploadMode(v as "url" | "file")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            {/* Drop Zone */}
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium mb-1">Drop images here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports JPEG, PNG, GIF, WebP, AVIF (max 10MB each)</p>
            </div>

            {/* Hidden File Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <input
              type="file"
              ref={folderInputRef}
              className="hidden"
              accept="image/*"
              // @ts-expect-error - webkitdirectory is not in the type definition
              webkitdirectory=""
              // @ts-expect-error - directory is not in the type definition
              directory=""
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Select Files
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => folderInputRef.current?.click()}
                className="flex-1"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Select Folder
              </Button>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Selected: {selectedFiles.length} file(s)
                    {successCount > 0 && (
                      <span className="text-green-600 ml-2">({successCount} uploaded)</span>
                    )}
                    {errorCount > 0 && (
                      <span className="text-red-600 ml-2">({errorCount} failed)</span>
                    )}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFiles}
                    disabled={loading}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {selectedFiles.map((filePreview, index) => (
                    <div
                      key={`${filePreview.file.name}-${index}`}
                      className="relative group aspect-square rounded-md overflow-hidden bg-muted"
                    >
                      {filePreview.preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={filePreview.preview}
                          alt={filePreview.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}

                      {/* Status Overlay */}
                      {filePreview.status === "uploading" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                        </div>
                      )}
                      {filePreview.status === "success" && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                      {filePreview.status === "error" && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        </div>
                      )}

                      {/* Remove Button */}
                      {filePreview.status !== "uploading" && (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={loading}
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      )}

                      {/* Filename tooltip */}
                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {filePreview.file.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload Progress */}
                {loading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      Uploading photos...
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Upload Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleFileUpload}
                disabled={loading || pendingCount === 0}
                className="flex-1"
              >
                {loading ? "Uploading..." : `Upload ${pendingCount} Photo${pendingCount !== 1 ? "s" : ""}`}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  clearAllFiles()
                  setOpen(false)
                }}
                disabled={loading}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Paste a direct link to an image
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption (Optional)</Label>
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Brief description of the photo"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Adding..." : "Add Photo"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
