import { getVideoById } from "@/lib/db"
import VideoPlayer from "@/components/VideoPlayer"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)

  if (!video) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <VideoPlayer video={video} />

        <div className="mt-6">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Published on {formatDate(video.publishedAt)}</p>
          <div className="mt-4 prose max-w-none">
            <p>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
