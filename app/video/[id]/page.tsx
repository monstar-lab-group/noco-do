"use client"

import { getVideoById } from "@/lib/markdown"
import VideoPlayer from "@/components/VideoPlayer"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { Video } from "@/types"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVideo() {
      try {
        const res = await fetch(`/.netlify/functions/video-by-id/${params.id}`)
        if (res.ok) {
          const foundVideo = await res.json()
          setVideo(foundVideo || null)
        }
      } catch (error) {
        console.error("Failed to load video:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadVideo()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p>Loading video...</p>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold">Video not found</h1>
          <p>The requested video could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <VideoPlayer video={video} />

        <div className="mt-6">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Published on {formatDate(new Date(video.publishedAt))}</p>
          <div className="mt-4 prose max-w-none">
            <p>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
