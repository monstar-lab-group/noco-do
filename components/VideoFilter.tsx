"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface Category {
  id: string
  name: string
}

export default function VideoFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState(searchParams.get("category") || "all")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (categoryId && categoryId !== "all") params.set("category", categoryId)
    if (searchQuery) params.set("search", searchQuery)

    router.push(`/?${params.toString()}`)
  }

  const handleReset = () => {
    setCategoryId("all")
    setSearchQuery("")
    router.push("/")
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full sm:w-auto">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>

      {(categoryId || searchQuery) && (
        <Button type="button" variant="ghost" onClick={handleReset} className="w-full sm:w-auto">
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </form>
  )
}
