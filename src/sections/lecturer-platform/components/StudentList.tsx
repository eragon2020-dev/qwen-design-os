import React from 'react'
import type { LecturerPlatformProps, StudentEnrollment } from '@/../product/sections/lecturer-platform/types'
import { Users, TrendingUp, Clock, Award } from 'lucide-react'

/**
 * Student List - View enrolled students for a course
 */
export function StudentList({
  studentEnrollments,
  courses,
}: LecturerPlatformProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<string>(courses[0]?.id || '')

  const courseEnrollments = studentEnrollments.filter((e) => e.courseId === selectedCourse)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Student Enrollments
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            View and track student progress
          </p>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white max-w-xs"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {courseEnrollments.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round(courseEnrollments.reduce((acc, e) => acc + e.progress, 0) / (courseEnrollments.length || 1))}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Progress</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {courseEnrollments.filter((e) => e.lastActivity && new Date(e.lastActivity).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Active This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Enrolled
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {courseEnrollments.map((enrollment) => (
                <tr key={enrollment.enrollmentId} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={enrollment.studentAvatar}
                        alt={enrollment.studentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {enrollment.studentName}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {enrollment.studentEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 max-w-[150px]">
                        <div
                          className="bg-indigo-600 rounded-full h-2 transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {enrollment.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={enrollment.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {enrollment.lastActivity ? (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(enrollment.lastActivity)}
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(enrollment.enrolledAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: string
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    completed: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    paused: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.active}`}>
      {status}
    </span>
  )
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
