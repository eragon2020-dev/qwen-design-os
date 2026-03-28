import React from 'react'
import type { LecturerPlatformProps } from '@/../product/sections/lecturer-platform/types'
import { TrendingUp, Users, DollarSign, AlertCircle, Play, Star, Plus } from 'lucide-react'

/**
 * Lecturer Dashboard - Overview of courses, students, revenue, and pending approvals
 */
export function LecturerDashboard({
  courses,
  enrollmentRequests,
  studentEnrollments,
  dashboardStats,
  onApproveEnrollment,
  onRejectEnrollment,
  onViewPaymentSlip,
  onEditCourse,
  onViewStudents,
  onViewAnalytics,
  onCreateCourse,
}: LecturerPlatformProps) {
  const pendingRequests = enrollmentRequests.filter((r) => r.status === 'pending')
  const recentRequests = enrollmentRequests.slice(0, 5)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Instructor Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your courses and student enrollments
          </p>
        </div>
        <button
          onClick={onCreateCourse}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          trend={`+${dashboardStats.thisMonthEnrollments} this month`}
          color="indigo"
        />
        <StatCard
          icon={<Play className="w-5 h-5" />}
          label="Total Courses"
          value={dashboardStats.totalCourses.toString()}
          trend={`${courses.filter((c) => c.isPublished).length} published`}
          color="emerald"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          trend={`+$${dashboardStats.thisMonthRevenue.toLocaleString()} this month`}
          color="amber"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Pending Approvals"
          value={dashboardStats.pendingApprovals.toString()}
          trend="Requires attention"
          color="rose"
        />
      </div>

      {/* Pending Approvals */}
      {pendingRequests.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Pending Enrollment Approvals
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Payment Slip
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={request.studentAvatar}
                            alt={request.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {request.studentName}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {request.studentEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {request.courseTitle}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
                        ${request.amount}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => onViewPaymentSlip?.(request.paymentSlipUrl)}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
                        >
                          View Slip
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onApproveEnrollment?.(request.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onRejectEnrollment?.(request.id, 'Payment verification failed')}
                            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 text-sm font-medium rounded transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* My Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            My Courses
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => onEditCourse?.(course.id)}
              onViewStudents={() => onViewStudents?.(course.id)}
              onViewAnalytics={() => onViewAnalytics?.(course.id)}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            Recent Enrollment Requests
          </h2>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={request.studentAvatar}
                  alt={request.studentName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {request.studentName}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {request.courseTitle}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={request.status} />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(request.requestDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Sub-components

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  trend: string
  color: 'indigo' | 'emerald' | 'amber' | 'rose'
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
      <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">{trend}</div>
    </div>
  )
}

interface CourseCardProps {
  course: LecturerPlatformProps['courses'][0]
  onEdit?: () => void
  onViewStudents?: () => void
  onViewAnalytics?: () => void
}

function CourseCard({ course, onEdit, onViewStudents, onViewAnalytics }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {!course.isPublished && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
              Draft
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.enrollmentCount}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            ${course.revenue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewAnalytics}
            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors"
          >
            Analytics
          </button>
          <button
            onClick={onViewStudents}
            className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded transition-colors"
          >
            Students
          </button>
          <button
            onClick={onEdit}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected'
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    approved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    rejected: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${styles[status]}`}>
      {status}
    </span>
  )
}
