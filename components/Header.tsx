"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const pathname = usePathname()
  const { user, logout, isLoading } = useAuth()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Operations Video Platform
        </Link>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <Button variant="ghost" size="sm" disabled>
              Loading...
            </Button>
          ) : user ? (
            <>
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  Admin
                </Button>
              </Link>
              {isAdmin && (
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              )}
            </>
          ) : (
            <Link href="/admin/login">
              <Button variant="ghost" size="sm">
                Admin Login
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
