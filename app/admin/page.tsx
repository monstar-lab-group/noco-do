import { getVideos } from "@/lib/db"
import AdminVideoList from "@/components/AdminVideoList"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, FolderPlus } from "lucide-react"

export default async function AdminDashboard() {
  const videos = await getVideos()

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

      <AdminVideoList videos={videos} />
    </div>
  )
}
