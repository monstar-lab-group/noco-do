"use client"

import EditVideoForm from "@/components/EditVideoForm"
import { useEffect, useState } from "react"
import { Video } from "@/types"

export default function EditVideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVideo() {
      try {
        const res = await fetch('/videos.json')
        if (res.ok) {
          const videos = await res.json()
          const foundVideo = videos.find((v: Video) => v.id === params.id)
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
      <div>
        <h1 className="mb-8 text-3xl font-bold">Edit Video</h1>
        <p>Loading video...</p>
      </div>
    )
  }

  if (!video) {
    return (
      <div>
        <h1 className="mb-8 text-3xl font-bold">Video Not Found</h1>
        <p>The requested video could not be found.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Edit Video</h1>
      <EditVideoForm video={video} />
    </div>
  )
}
