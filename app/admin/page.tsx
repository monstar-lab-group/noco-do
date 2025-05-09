"use client"

import AdminVideoList from "@/components/AdminVideoList"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, FolderPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Video } from "@/types"

export default function AdminDashboard() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/.netlify/functions/videos')
        if (res.ok) {
          const data = await res.json()
          setVideos(data)
        }
      } catch (error) {
        console.error("Failed to load videos:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadVideos()
  }, [])

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/admin/categories">
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              Manage Categories
            </Button>
          </Link>
          <Link href="/admin/upload">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <AdminVideoList videos={videos} />
      )}
    </div>
  )
}
