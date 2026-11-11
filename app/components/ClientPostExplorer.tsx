'use client'

import React, { useState } from 'react'
import { ApiError } from '@/lib/ApiError'

type Post = {
  id: number
  title: string
  body: string
}

type DemoScenario = 'success' | 'slow' | 'http-error' | 'empty'

const ClientPostExplorer = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [scenario, setScenario] = useState<DemoScenario>('success')

  const handleLoadPosts = async () => {
    setLoading(true)
    setError(null)

    try {
      let response: Response

      if (scenario === 'success') {
        response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?userId=1'
        )
      } else if (scenario === 'slow') {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?userId=1'
        )
      } else if (scenario === 'http-error') {
        response = new Response(
          JSON.stringify({ message: 'Service unavailable' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      } else {
        response = new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (!response.ok) {
        throw new ApiError('Failed to fetch posts data',response.status)
      }

      const postsData: Post[] = await response.json()

      setPosts(postsData)
      setHasLoaded(true)
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      } else {
        setError('Unable to connect. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <h3 className="text-2xl font-bold tracking-tight text-slate-900">
        Explore All Posts
      </h3>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="demo-scenario"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Demo scenario
          </label>

          <select
            id="demo-scenario"
            value={scenario}
            onChange={(event) =>
              setScenario(event.target.value as DemoScenario)
            }
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="success">Success </option>
            <option value="slow">Slow </option>
            <option value="http-error">HTTP error </option>
            <option value="empty">Empty</option>
          </select>
        </div>

        <button
          onClick={handleLoadPosts}
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-teal-800 bg-white px-5 py-3 text-sm font-semibold text-teal-900 transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-36"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal-200 border-t-teal-800" />
              Loading...
            </>
          ) : (
            <>
              <span aria-hidden="true" className="text-lg">
                →
              </span>
              {error ? 'Retry' : 'Load Posts'}
            </>
          )}
        </button>
      </div>

      {/* Idle state */}
      {!hasLoaded && !loading && !error && (
        <div className="mt-7 flex min-h-48 flex-col items-center justify-center rounded-xl bg-slate-50 px-5 py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl text-teal-800">
            <span aria-hidden="true">▤</span>
          </div>

          <h4 className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
            Click the button to load employee posts.
          </h4>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div
        
          className="mt-7 flex min-h-48 flex-col items-center justify-center rounded-xl bg-slate-50 px-5 py-8 text-center"
        >
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-700" />

          <h4 className="text-lg font-bold text-slate-900">
            Loading posts...
          </h4>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div
          className="mt-7 rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <h4 className="font-bold text-red-800">
            Something went wrong
          </h4>

          <p className="mt-2 text-sm leading-6 text-red-700">
            {error}
          </p>

          <p className="mt-3 text-xs text-red-600">
            You can select another scenario and retry.
          </p>
        </div>
      )}

      {/* Empty state */}
      {hasLoaded && !loading && !error && posts.length === 0 && (
        <div className="mt-7 flex min-h-48 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl text-teal-800">
            <span aria-hidden="true">▤</span>
          </div>

          <h4 className="text-lg font-bold text-slate-900">
            No posts found
          </h4>
        </div>
      )}

      {/* Success state */}
      {hasLoaded && !loading && !error && posts.length > 0 && (
        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="font-bold text-slate-900">
              Loaded Posts
            </h4>

            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900">
              {posts.length} posts
            </span>
          </div>

          <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-200 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-900">
                    {post.id}
                  </span>

                  <div className="min-w-0">
                    <h5 className="font-semibold leading-6 text-slate-900">
                      {post.title}
                    </h5>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {post.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientPostExplorer