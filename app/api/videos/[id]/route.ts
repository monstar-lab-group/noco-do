import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { deleteFile } from "@/lib/storage"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const video = await prisma.video.findUnique({
      where: { id: params.id },
      include: { category: true },
    })

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

    const video = await prisma.video.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        categoryId: body.categoryId || undefined,
      },
    })

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
    const video = await prisma.video.findUnique({
      where: { id: params.id },
    })

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // If it's an uploaded video, delete from storage
    if (video.type === "upload") {
      await deleteFile(video.videoUrl)
    }

    await prisma.video.delete({
      where: { id: params.id },
    })

    revalidatePath("/")
    revalidatePath("/admin")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
