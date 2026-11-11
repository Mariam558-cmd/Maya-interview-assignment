import React from 'react'
import { connection } from 'next/server'

type Employee = {
  name: string
  email: string
  company: {
    name: string
  }
}

const EmployeeProfile = async () => {
  await connection()

  const employeeData: Employee | null = await (async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch employee data')
      }

      return (await response.json()) as Employee
    } catch (error) {
      console.error('Employee profile error:', error)
      return null
    }
  })()

  if (!employeeData) {
    return (
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-800">
          Employee Profile
        </p>

        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <h3 className="font-bold text-red-800">
            Unable to load employee profile
          </h3>

          <p className="mt-2 text-sm leading-6 text-red-700">
            We could not load the employee information right now.
            Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">
          Employee Profile
        </p>

        <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-900">
          Employee 01
        </span>
      </div>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-teal-700 text-3xl font-bold text-white shadow-sm">
          {employeeData.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {employeeData.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-slate-600">
            <span className="font-medium">Email:</span>
            <p className="break-all">{employeeData.email}</p>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-slate-900">
              {employeeData.company.name}
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Company
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile