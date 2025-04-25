"use client"

import { useRef } from "react"
import type { Video } from "@/types"

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle embed URLs (YouTube, Vimeo, etc.)
  if (video.type === "embed") {
    // For YouTube embeds
    if (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")) {
      const videoId = getYouTubeVideoId(video.videoUrl)
      return (
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    }

    // For Vimeo embeds
    if (video.videoUrl.includes("vimeo.com")) {
      const videoId = getVimeoVideoId(video.videoUrl)
      return (
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://player.vimeo.com/video/${videoId}`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    }
  }

  // For direct video uploads
  return (
    <div className="aspect-video overflow-hidden rounded-lg">
      <video ref={videoRef} className="h-full w-full" controls poster={video.thumbnailUrl}>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// Helper functions to extract video IDs
function getYouTubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}

function getVimeoVideoId(url: string): string {
  const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
  const match = url.match(regExp)
  return match ? match[3] : ""
}
