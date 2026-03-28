import React from 'react'
import type { PublicWebsiteProps } from '@/../product/sections/public-website/types'
import { Play, Star, Users, BookOpen, ArrowRight, CheckCircle } from 'lucide-react'

/**
 * Homepage for Study Line public website
 * Features hero section, featured courses, testimonials, and CTAs
 */
export function Homepage({
  courses,
  lecturers,
  testimonials,
  categories,
  onViewCourse,
  onEnroll,
  onViewLecturer,
  onSignIn,
  onSignUp,
}: PublicWebsiteProps) {
  const featuredCourses = courses.filter((c) => c.isFeatured).slice(0, 4)
  const displayedTestimonials = testimonials.slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Study Line
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#courses" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Courses
              </a>
              <a href="#lecturers" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Lecturers
              </a>
              <a href="#testimonials" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={onSignIn}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={onSignUp}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-900 dark:via-indigo-950 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading mb-6">
              Learn from the Best,
              <br />
              <span className="text-indigo-200">Become Your Best</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Access high-quality courses taught by industry experts. From coding to design,
              build the skills you need for your dream career.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onSignUp}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-800/50 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 border border-indigo-400/30">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-indigo-400/20">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-indigo-200">Students</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-indigo-200">Courses</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">4.9</div>
                <div className="text-indigo-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore our most popular courses and start your learning journey today
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={() => onViewCourse?.(course.id)}
                onEnroll={() => onEnroll?.(course.id)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2">
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">
              Why Study Line?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
              title="Quality Content"
              description="Carefully curated courses with up-to-date industry standards"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-indigo-600" />}
              title="Expert Instructors"
              description="Learn from professionals with real-world experience"
            />
            <FeatureCard
              icon={<Play className="w-8 h-8 text-indigo-600" />}
              title="Lifetime Access"
              description="Learn at your own pace with unlimited access to course materials"
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-indigo-600" />}
              title="Certificates"
              description="Earn recognized certificates upon course completion"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Lecturers Preview */}
      <section id="lecturers" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">
              Meet Our Instructors
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Industry experts passionate about teaching
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {lecturers.slice(0, 5).map((lecturer) => (
              <LecturerCard
                key={lecturer.id}
                lecturer={lecturer}
                onView={() => onViewLecturer?.(lecturer.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join our community of learners and unlock your potential today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSignUp}
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Get Started for Free
            </button>
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-800/50 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-colors border border-indigo-400/30"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white font-heading">Study Line</span>
              </div>
              <p className="text-slate-400 text-sm">
                Empowering learners worldwide with quality education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Courses</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Web Development</a></li>
                <li><a href="#" className="hover:text-indigo-400">Data Science</a></li>
                <li><a href="#" className="hover:text-indigo-400">Mobile Development</a></li>
                <li><a href="#" className="hover:text-indigo-400">Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
            © 2025 Study Line. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sub-components

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
    lecturerId: string
    level: string
  }
  onView?: () => void
  onEnroll?: () => void
}

function CourseCard({ course, onView, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 group">
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
            {course.level}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: {
    id: string
    studentName: string
    studentAvatar: string
    courseTitle: string
    rating: number
    text: string
  }
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-1 mb-4">
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
      <p className="text-slate-700 dark:text-slate-300 mb-6 line-clamp-4">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.studentAvatar}
          alt={testimonial.studentName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {testimonial.studentName}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {testimonial.courseTitle}
          </div>
        </div>
      </div>
    </div>
  )
}

interface LecturerCardProps {
  lecturer: {
    id: string
    name: string
    title: string
    avatarUrl: string
    courseCount: number
    rating: number
  }
  onView?: () => void
}

function LecturerCard({ lecturer, onView }: LecturerCardProps) {
  return (
    <div
      onClick={onView}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 cursor-pointer group"
    >
      <img
        src={lecturer.avatarUrl}
        alt={lecturer.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
      />
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {lecturer.name}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{lecturer.title}</p>
      <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          {lecturer.rating}
        </span>
        <span>{lecturer.courseCount} courses</span>
      </div>
    </div>
  )
}
