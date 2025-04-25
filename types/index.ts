import type { DefaultSession } from "next-auth"

export interface Category {
  id: string
  name: string
}

export interface Video {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
  type: "upload" | "embed"
  publishedAt: Date
  categoryId?: string
  category?: Category
}

export interface User {
  id: string
  email: string
  name?: string
  isAdmin: boolean
}

declare module "next-auth" {
  interface User {
    id: string
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      isAdmin: boolean
    } & DefaultSession["user"]
  }
}
