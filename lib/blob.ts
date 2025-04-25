import { put, del } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadVideoToBlob(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      url: blob.url,
      success: true,
    }
  } catch (error) {
    console.error("Error uploading to blob:", error)
    return {
      url: null,
      success: false,
    }
  }
}

export async function deleteVideoFromBlob(url: string) {
  try {
    // Extract the filename from the URL
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1)

    await del(filename)
    return true
  } catch (error) {
    console.error("Error deleting from blob:", error)
    return false
  }
}

export async function generateThumbnail(videoFile: File) {
  // In a real implementation, you would generate a thumbnail from the video
  // For this example, we'll just return a placeholder
  return "/placeholder.svg?height=720&width=1280"
}
