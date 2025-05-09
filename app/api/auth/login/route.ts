import { NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "password"

    if (email === adminEmail) {
      const isValid = password === adminPassword

      if (isValid) {
        const user = {
          email,
          isAdmin: true
        }

        return NextResponse.json(user)
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
