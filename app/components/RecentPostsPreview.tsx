import React from 'react'
import { connection } from 'next/server'

type Post = {
  id: number
  title: string
}

const fetchRecentPosts = async (): Promise<Post[] | null> => {
  try {
    // Intentional 2-second delay to simulate a slow request
    // and demonstrate the Suspense loading fallback.
    await connection()
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=1'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts data')
    }

    const postsData: Post[] = await response.json()

    return postsData
  } catch (error) {
    console.error('Recent posts error:', error)
    return null
  }
}

const RecentPostsPreview = async () => {

  const postsData = await fetchRecentPosts()

  if (!postsData) {
    return (
      <div>
  
        <h3 className="text-2xl font-bold text-slate-900">
          Recent Posts
        </h3>

        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm leading-6 text-red-700">
            We could not load the recent posts right now. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  const recentPosts = postsData.slice(0, 3)

  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight text-slate-900">
        Recent Posts
      </h3>

      <div className="mt-5">
        {recentPosts.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {recentPosts.map((post, index) => (
              <li
                key={post.id}
                className="flex gap-4 py-4 first:pt-2 last:pb-2"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-900">
                  {index + 1}
                </span>

                <p className="pt-1 text-sm font-semibold leading-6 text-slate-800">
                  {post.title}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            No posts found.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-900">
        <span className="h-2 w-2 rounded-full bg-teal-700" />
        <p>Showing the 3 most recent posts.</p>
      </div>
    </div>
  )
}

export default RecentPostsPreview