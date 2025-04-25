"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/admin")
    }
  }, [user, isLoading, router])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] items-center px-4 py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
