import React, { useState } from 'react'
import type { PublicWebsiteProps } from '@/../product/sections/public-website/types'
import { Search, Filter, Star, ArrowRight } from 'lucide-react'

/**
 * Course Catalog page with search, filters, and course grid
 */
export function CourseCatalog({
  courses,
  categories,
  onViewCourse,
  onEnroll,
  onSignIn,
  onSignUp,
}: PublicWebsiteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || course.categoryId === selectedCategory
    const matchesLevel = !selectedLevel || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the perfect course to advance your skills and achieve your career goals
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title or description..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white dark:placeholder-slate-500 text-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters:</span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex flex-wrap gap-2 ml-auto">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredCourses.length}</span> courses
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={() => onViewCourse?.(course.id)}
                onEnroll={() => onEnroll?.(course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedLevel(null)
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-heading mb-4">
            Can't Decide?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get personalized course recommendations based on your goals
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSignUp}
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Get Recommendations
            </button>
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-800/50 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-colors border border-indigo-400/30"
            >
              Sign In to View Progress
            </button>
          </div>
        </div>
      </section>
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
    currency: string
    rating: number
    reviewCount: number
    level: string
    enrollmentCount: number
    duration: string
  }
  onView?: () => void
  onEnroll?: () => void
}

function CourseCard({ course, onView, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-200 dark:border-slate-700 group">
      <div
        onClick={onView}
        className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden cursor-pointer"
      >
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
            {course.level}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          onClick={onView}
          className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {course.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-900 dark:text-white">{course.rating}</span>
            <span>({course.reviewCount})</span>
          </span>
          <span>•</span>
          <span>{course.enrollmentCount.toLocaleString()} students</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${course.price}
            </span>
          </div>
          <button
            onClick={onEnroll}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
          >
            Enroll
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
