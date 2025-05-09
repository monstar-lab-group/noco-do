"use client"

import VideoCard from "@/components/VideoCard"
import VideoFilter from "@/components/VideoFilter"
import { Video } from "@/types"
import { useEffect, useState } from "react"

interface PageProps {
  searchParams: {
    category?: string
    search?: string
  }
}

export default function Home({ searchParams }: PageProps) {
  const { category, search } = searchParams
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/videos.json')
        if (res.ok) {
          let data = await res.json()
          
          if (category) {
            data = data.filter((video: Video) => video.categoryId === category)
          }
          
          if (search) {
            const searchLower = search.toLowerCase()
            data = data.filter(
              (video: Video) =>
                video.title.toLowerCase().includes(searchLower) ||
                video.description.toLowerCase().includes(searchLower)
            )
          }
          
          data = data.sort((a: Video, b: Video) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          )
          
          setVideos(data)
        }
      } catch (error) {
        console.error("Failed to load videos:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadVideos()
  }, [category, search])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Operations Videos</h1>

      <VideoFilter />

      {loading ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No videos available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
