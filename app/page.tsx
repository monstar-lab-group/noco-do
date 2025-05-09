import VideoCard from "@/components/VideoCard"
import VideoFilter from "@/components/VideoFilter"
import { getAllVideos } from "@/lib/markdown"
import { Video } from "@/types"

interface PageProps {
  searchParams: {
    category?: string
    search?: string
  }
}

export default async function Home({ searchParams }: PageProps) {
  const { category, search } = searchParams

  let videos = getAllVideos()

  if (category) {
    videos = videos.filter((video) => video.categoryId === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    videos = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchLower) ||
        video.description.toLowerCase().includes(searchLower)
    )
  }

  videos = videos.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Operations Videos</h1>

      <VideoFilter />

      {videos.length === 0 ? (
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
