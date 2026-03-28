import React from 'react'
import type { PublicWebsiteProps } from '@/../product/sections/public-website/types'
import { Star, Users, Play, Globe, Twitter, Linkedin, Github, Dribbble, ArrowRight } from 'lucide-react'

/**
 * Lecturer Profile page with bio, expertise, and courses
 */
export function LecturerProfile({
  lecturers,
  courses,
  onViewCourse,
  onEnroll,
  onSignIn,
  onSignUp,
}: PublicWebsiteProps) {
  // For preview, use the first lecturer
  const lecturer = lecturers[0]
  const lecturerCourses = courses.filter((c) => c.lecturerId === lecturer.id)

  if (!lecturer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Lecturer not found
          </h1>
        </div>
      </div>
    )
  }

  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    dribbble: Dribbble,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Profile Header */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-900 dark:via-indigo-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={lecturer.avatarUrl}
              alt={lecturer.name}
              className="w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl object-cover"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-white font-heading mb-2">
                {lecturer.name}
              </h1>
              <p className="text-xl text-indigo-200 mb-4">{lecturer.title}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-indigo-100">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{lecturer.rating}</span>
                  <span>Instructor Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{lecturer.studentCount.toLocaleString()}</span>
                  <span>Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">{lecturer.courseCount}</span>
                  <span>Courses</span>
                </div>
              </div>
              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                {Object.entries(lecturer.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform] || Globe
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                About
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {lecturer.bio}
              </p>
            </section>

            {/* Expertise */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {lecturer.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Courses */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                Courses by {lecturer.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {lecturerCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onView={() => onViewCourse?.(course.id)}
                    onEnroll={() => onEnroll?.(course.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stats Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-6">
                Teaching Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Students</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {lecturer.studentCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Courses</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {lecturer.courseCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Average Rating</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {lecturer.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Want to learn from {lecturer.name}?</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Browse all courses and start your learning journey today.
              </p>
              <button
                onClick={onSignUp}
                className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Get Started
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

// Course Card Component

interface CourseCardProps {
  course: {
    id: string
    title: string
    shortDescription: string
    thumbnailUrl: string
    price: number
    rating: number
    reviewCount: number
    level: string
  }
  onView?: () => void
  onEnroll?: () => void
}

function CourseCard({ course, onView, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 group">
      <div
        onClick={onView}
        className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden cursor-pointer"
      >
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
          {course.level}
        </span>
        <h3
          onClick={onView}
          className="font-semibold text-slate-900 dark:text-white mt-2 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {course.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-900 dark:text-white">{course.rating}</span>
          <span className="text-sm text-slate-500">({course.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ${course.price}
          </span>
          <button
            onClick={onEnroll}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
          >
            Enroll
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
