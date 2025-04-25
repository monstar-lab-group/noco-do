import { Category } from "@prisma/client"

export interface Video {
  id: string
  title: string
  description: string | null
  videoUrl: string
  thumbnailUrl: string | null
  type: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
  categoryId: string | null
  category: Category | null
}
