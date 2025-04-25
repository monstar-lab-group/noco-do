import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Video } from "@/types"

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/video/${video.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          {video.thumbnailUrl ? (
            <Image src={video.thumbnailUrl || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No thumbnail</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 font-medium">{video.title}</h3>
          {video.category && (
            <Badge variant="secondary" className="mt-2">
              {video.category.name}
            </Badge>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">{formatDate(video.publishedAt)}</CardFooter>
      </Card>
    </Link>
  )
}
