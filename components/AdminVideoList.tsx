"use client"

import { useState } from "react"
import { formatDate } from "@/lib/utils"
import type { Video } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AdminVideoListProps {
  videos: Video[]
}

export default function AdminVideoList({ videos }: AdminVideoListProps) {
  const [videoList, setVideoList] = useState<Video[]>(videos)
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null)

  const handleDeleteVideo = async () => {
    if (!videoToDelete) return

    try {
      const response = await fetch(`/api/videos/${videoToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setVideoList(videoList.filter((video) => video.id !== videoToDelete.id))
      } else {
        console.error("Failed to delete video")
      }
    } catch (error) {
      console.error("Error deleting video:", error)
    } finally {
      setVideoToDelete(null)
    }
  }

  if (videoList.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No videos available yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videoList.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>{formatDate(video.publishedAt)}</TableCell>
                <TableCell className="capitalize">{video.type}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/video/${video.id}`} target="_blank">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/edit/${video.id}`}>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" title="Delete" onClick={() => setVideoToDelete(video)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!videoToDelete} onOpenChange={(open) => !open && setVideoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the video &quot;{videoToDelete?.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVideo} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
