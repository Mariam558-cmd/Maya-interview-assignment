import React, { Suspense } from 'react'
import EmployeeProfile from '@/app/components/EmployeeProfile'
import RecentPostsPreview from '@/app/components/RecentPostsPreview'
import ClientPostExplorer from '@/app/components/ClientPostExplorer'

const Page = () => {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="mb-8 border-b border-slate-200 pb-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
            Employee dashboard
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Employee Explorer
          </h1>

          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            View employee information and explore their posts.
          </p>
        </header>

        {/* Employee Profile */}
        <Suspense fallback={
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" />
        <p>Loading employee profile...</p>
      </div>
    </section>
  }
>
  <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <EmployeeProfile />
  </section>
</Suspense>
       
        {/* Posts */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Posts
            </h2>

          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {/* Server Posts Preview */}
            <Suspense
              fallback={
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

                  <h3 className="text-2xl font-bold text-slate-900">
                    Recent Posts
                  </h3>

                  <div className="mt-6 flex items-center gap-3 text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" />
                    <p>Loading recent posts...</p>
                  </div>
                </section>
              }
            >
              <section className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <RecentPostsPreview />
              </section>
            </Suspense>

            {/* Client Posts Explorer */}
            <section className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <ClientPostExplorer />
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Page