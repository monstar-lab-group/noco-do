import VideoCard from "@/components/VideoCard"
import VideoFilter from "@/components/VideoFilter"
import prisma from "@/lib/db"

interface PageProps {
  searchParams: {
    category?: string
    search?: string
  }
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const { category, search } = params

  // Build the query
  const where: any = {}

  if (category) {
    where.categoryId = category
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  const videos = await prisma.video.findMany({
    where,
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      category: true,
    },
  })

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
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
