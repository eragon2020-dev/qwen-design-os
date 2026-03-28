import React from 'react'
import type { StudentPlatformProps, Enrollment, CourseProgress, Note } from '@/../product/sections/student-platform/types'
import { Play, BookOpen, Award, TrendingUp, Clock, Calendar, ChevronRight, Star } from 'lucide-react'

/**
 * Student Dashboard - Main landing page showing enrolled courses, progress, and activity
 */
export function StudentDashboard({
  enrollments,
  courseProgress,
  notes,
  onContinueWatching,
  onViewCourse,
}: StudentPlatformProps) {
  const activeEnrollments = enrollments?.filter((e) => e.status === 'active') || []
  const completedEnrollments = enrollments?.filter((e) => e.status === 'completed') || []
  
  // Find enrollment with most recent activity for "Continue Watching"
  const continueWatching = [...activeEnrollments]
    .sort((a, b) => new Date(b.lastWatchedAt || 0).getTime() - new Date(a.lastWatchedAt || 0).getTime())
    [0]

  // Calculate total stats
  const totalProgress = activeEnrollments.length > 0 ? activeEnrollments.reduce((acc, e) => acc + e.progress, 0) / activeEnrollments.length : 0
  const totalWatchTime = courseProgress?.reduce((acc, p) => acc + p.watchedMinutes, 0) || 0
  const currentStreak = courseProgress?.length > 0 ? Math.max(...courseProgress.map((p) => p.streak), 0) : 0

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {activeEnrollments.length === 0 && completedEnrollments.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Study Line!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Enroll in your first course to start learning</p>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              Browse Courses
            </button>
          </div>
        </div>
      ) : (
      <>
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
          Welcome back, Alex!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-5 h-5" />}
          label="Active Courses"
          value={activeEnrollments.length.toString()}
          color="indigo"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Completed"
          value={completedEnrollments.length.toString()}
          color="emerald"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Hours Watched"
          value={Math.round(totalWatchTime / 60).toString()}
          color="amber"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Day Streak"
          value={currentStreak.toString()}
          color="rose"
        />
      </div>

      {/* Continue Watching */}
      {continueWatching && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Continue Watching
            </h2>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-6 lg:p-8 text-white">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                    {continueWatching.progress}% complete
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{continueWatching.courseTitle}</h3>
                <p className="text-indigo-100 mb-4">Instructor: {continueWatching.lecturerName}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${continueWatching.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {continueWatching.completedLessons}/{continueWatching.totalLessons} lessons
                  </span>
                </div>
                <button
                  onClick={() => onContinueWatching?.(continueWatching.id)}
                  className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Continue Learning
                </button>
              </div>
              <div className="hidden md:block">
                <img
                  src={continueWatching.courseThumbnail}
                  alt={continueWatching.courseTitle}
                  className="w-full aspect-video object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* My Courses Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            My Courses
          </h2>
          <button className="text-indigo-600 dark:text-indigo-400 font-medium text-sm flex items-center gap-1 hover:underline">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeEnrollments.map((enrollment) => (
            <CourseCard
              key={enrollment.id}
              enrollment={enrollment}
              onClick={() => onViewCourse?.(enrollment.courseId)}
            />
          ))}
        </div>
      </section>

      {/* Recent Notes */}
      {notes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Recent Notes
            </h2>
            <button className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline">
              View All Notes
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {notes.slice(0, 4).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Courses */}
      {completedEnrollments.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Completed Courses
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEnrollments.map((enrollment) => (
              <CompletedCourseCard
                key={enrollment.id}
                enrollment={enrollment}
                onClick={() => onViewCourse?.(enrollment.courseId)}
              />
            ))}
          </div>
        </section>
      )}
        </>
      )}
    </div>
  )
}

// Sub-components

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  color: 'indigo' | 'emerald' | 'amber' | 'rose'
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  )
}

interface CourseCardProps {
  enrollment: Enrollment
  onClick?: () => void
}

function CourseCard({ enrollment, onClick }: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <img
          src={enrollment.courseThumbnail}
          alt={enrollment.courseTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-1.5">
              <div
                className="bg-emerald-400 rounded-full h-1.5 transition-all"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
            <span className="text-xs text-white font-medium">{enrollment.progress}%</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {enrollment.courseTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{enrollment.lecturerName}</p>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{enrollment.completedLessons}/{enrollment.totalLessons} lessons</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last: {new Date(enrollment.lastWatchedAt || 0).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

interface CompletedCourseCardProps {
  enrollment: Enrollment
  onClick?: () => void
}

function CompletedCourseCard({ enrollment, onClick }: CompletedCourseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <img
          src={enrollment.courseThumbnail}
          alt={enrollment.courseTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
            Completed
          </span>
          {enrollment.certificateEarned && (
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-medium rounded-full">
              Certificate
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {enrollment.courseTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{enrollment.lecturerName}</p>
      </div>
    </div>
  )
}

interface NoteCardProps {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          {note.courseTitle}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatTimestamp(note.timestamp)}
        </span>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-2">
        {note.content}
      </p>
      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
        {note.videoTitle}
      </div>
    </div>
  )
}

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
