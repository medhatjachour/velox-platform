import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'

/**
 * Fetch social profile data from GitHub, LinkedIn, etc.
 * This is a placeholder - in production, you'd integrate with actual APIs
 */
export async function POST(request: NextRequest) {
  try {
    await requireAuth(request)

    const body = await request.json()
    const { platform, username } = body

    let profileData: any = {}

    // GitHub API integration
    if (platform === 'github' && username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Velox-Platform'
          }
        })

        if (response.ok) {
          const data = await response.json()
          profileData = {
            name: data.name || username,
            bio: data.bio || '',
            location: data.location || '',
            email: data.email || '',
            avatarUrl: data.avatar_url,
            githubUrl: data.html_url,
            websiteUrl: data.blog || '',
            twitterUrl: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : '',
            company: data.company || '',
            publicRepos: data.public_repos,
            followers: data.followers
          }
        }
      } catch (error) {
        console.error('GitHub API error:', error)
      }
    }

    // LinkedIn scraping would require authentication and proper API access
    // For now, we'll return a success response with whatever data we found
    
    return NextResponse.json({
      success: true,
      data: profileData,
      platform
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.error('Fetch social data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social data' },
      { status: 500 }
    )
  }
}
