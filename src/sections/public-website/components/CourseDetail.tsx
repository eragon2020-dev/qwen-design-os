import React from 'react'
import type { PublicWebsiteProps, Course, Lecturer } from '@/../product/sections/public-website/types'
import { Star, Clock, Users, Play, CheckCircle, Award, TrendingUp, Bookmark } from 'lucide-react'

/**
 * Course Detail page with full course information, syllabus, and enrollment
 */
export function CourseDetail({
  courses,
  lecturers,
  testimonials,
  onViewCourse,
  onEnroll,
  onViewLecturer,
  onSignIn,
  onSignUp,
}: PublicWebsiteProps) {
  // For preview, use the first course
  const course = courses[0]
  const lecturer = lecturers.find((l) => l.id === course.lecturerId)
  const courseTestimonials = testimonials.filter((t) => t.courseId === course.id)

  if (!course || !lecturer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Course not found
          </h1>
          <button
            onClick={() => onViewCourse?.(courses[0]?.id)}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            View Available Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Course Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                  Best Seller
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300 mb-6">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span className="text-slate-400">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{course.enrollmentCount.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{course.duration}</span>
                </div>
              </div>
            </div>
            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl sticky top-24">
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden mb-6 relative group cursor-pointer">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-indigo-600 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    ${course.price}
                  </span>
                </div>
                <button
                  onClick={() => onEnroll?.(course.id)}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors mb-3"
                >
                  Enroll Now
                </button>
                <button
                  onClick={onSignIn}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-xl transition-colors mb-6"
                >
                  Add to Wishlist
                </button>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Full lifetime access
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Access on mobile and TV
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                What you'll learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.syllabus.map((module, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {module.title} ({module.lessonCount} lessons)
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                Course Content
              </h2>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                {course.syllabus.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Play className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {module.title}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {module.lessonCount} lessons
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">{course.syllabus.reduce((acc, m) => acc + m.lessonCount, 0)}</span> total lessons •{' '}
                <span className="font-medium">{course.duration}</span> total length
              </div>
            </section>

            {/* Lecturer */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                Your Instructor
              </h2>
              <div
                onClick={() => onViewLecturer?.(lecturer.id)}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={lecturer.avatarUrl}
                    alt={lecturer.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                      {lecturer.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                      {lecturer.title}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{lecturer.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{lecturer.rating}</span>
                        <span>Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{lecturer.studentCount.toLocaleString()}</span>
                        <span>Students</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Play className="w-4 h-4" />
                        <span className="font-medium">{lecturer.courseCount}</span>
                        <span>Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-6">
                Student Reviews
              </h2>
              {courseTestimonials.length > 0 ? (
                <div className="space-y-4">
                  {courseTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-300 dark:fill-slate-600 text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4">{testimonial.text}</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.studentAvatar}
                          alt={testimonial.studentName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {testimonial.studentName}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(testimonial.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400">No reviews yet for this course.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Course Features */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                This course includes:
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-indigo-600" />
                  {course.duration} of video content
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Certificate of completion
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Lifetime access
                </li>
                <li className="flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-indigo-600" />
                  Downloadable resources
                </li>
              </ul>
            </div>

            {/* Share */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Share this course:
              </h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                  Facebook
                </button>
                <button className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                  Twitter
                </button>
                <button className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                  LinkedIn
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
