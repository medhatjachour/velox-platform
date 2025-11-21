import { cookies } from 'next/headers'
import { getSession } from './session'

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const session = await getSession(token)
    if (!session) {
      return null
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      username: session.user.username,
      role: session.user.role,
    }
  } catch {
    return null
  }
}
