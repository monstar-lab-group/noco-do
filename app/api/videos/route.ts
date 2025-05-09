import { NextResponse } from "next/server"
import { getAllVideos, createVideo } from "@/lib/markdown"
import { generateThumbnail } from "@/lib/blob"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth-utils"

export async function GET() {
  try {
    const videos = getAllVideos()
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Check authentication
  const user = await auth()
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const videoFile = formData.get("videoFile") as File | null
    const embedUrl = formData.get("embedUrl") as string | null

    let videoUrl = embedUrl
    let thumbnailUrl = "/placeholder.svg?height=720&width=1280"
    let type = "embed"

    // If a file was uploaded, store it in a protected directory
    if (videoFile && videoFile.size > 0) {
      videoUrl = `/uploads/${Date.now()}-${videoFile.name}`
      thumbnailUrl = await generateThumbnail(videoFile)
      type = "upload"
    }

    if (!videoUrl) {
      return NextResponse.json({ error: "Either a video file or embed URL is required" }, { status: 400 })
    }

    const video = createVideo({
      title,
      description: description || "",
      videoUrl,
      thumbnailUrl,
      type: type as "upload" | "embed",
      publishedAt: new Date(),
      content: `# ${title}\n\n${description || ""}`
    })

    revalidatePath("/")
    revalidatePath("/admin")

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error uploading video:", error)
    return NextResponse.json({ error: "Failed to upload video" }, { status: 500 })
  }
}
