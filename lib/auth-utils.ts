import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import prisma from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"

export async function auth() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    if (!payload.sub) return null

    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
    })

    return user
  } catch (error) {
    return null
  }
}
