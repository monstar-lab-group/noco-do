import type { Video } from "@/types"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

// This is a mock database for demonstration purposes
// In a real application, you would use a real database like Supabase, MongoDB, etc.

let videos: Video[] = [
  {
    id: "1",
    title: "Introduction to Operations",
    description: "Learn the basics of operations management in this introductory video.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    type: "embed",
    publishedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    title: "Process Optimization Techniques",
    description: "Advanced techniques for optimizing operational processes.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    type: "embed",
    publishedAt: new Date("2023-02-20"),
  },
]

export async function getVideos(): Promise<Video[]> {
  // Sort videos by publishedAt in descending order (newest first)
  return [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getVideoById(id: string): Promise<Video | null> {
  return videos.find((video) => video.id === id) || null
}

export async function createVideo(videoData: Omit<Video, "id">): Promise<Video> {
  const newVideo: Video = {
    id: Date.now().toString(),
    ...videoData,
    thumbnailUrl: videoData.thumbnailUrl || "/placeholder.svg?height=720&width=1280",
  }

  videos.push(newVideo)
  return newVideo
}

export async function updateVideo(id: string, videoData: Partial<Video>): Promise<Video | null> {
  const index = videos.findIndex((video) => video.id === id)

  if (index === -1) {
    return null
  }

  videos[index] = { ...videos[index], ...videoData }
  return videos[index]
}

export async function deleteVideo(id: string): Promise<boolean> {
  const initialLength = videos.length
  videos = videos.filter((video) => video.id !== id)
  return videos.length < initialLength
}
