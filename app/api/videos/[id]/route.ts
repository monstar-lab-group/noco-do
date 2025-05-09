import { NextResponse } from "next/server"
import { getVideoById, updateVideo, deleteVideo } from "@/lib/markdown"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const video = getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // Check authentication
  const user = await auth()
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    const video = updateVideo(params.id, {
      title: body.title,
      description: body.description,
      content: body.content || `# ${body.title}\n\n${body.description || ""}`,
    })

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    revalidatePath("/")
    revalidatePath(`/video/${params.id}`)
    revalidatePath("/admin")

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error updating video:", error)
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Check authentication
  const user = await auth()
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const video = getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    if (video.type === "upload") {
      console.log(`Would delete file: ${video.videoUrl}`)
    }

    const success = deleteVideo(params.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
    }

    revalidatePath("/")
    revalidatePath("/admin")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
