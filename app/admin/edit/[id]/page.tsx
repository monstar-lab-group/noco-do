import { getVideoById } from "@/lib/db"
import EditVideoForm from "@/components/EditVideoForm"
import { notFound } from "next/navigation"

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)

  if (!video) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Edit Video</h1>
      <EditVideoForm video={video} />
    </div>
  )
}
