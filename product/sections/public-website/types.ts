/**
 * Course difficulty level
 */
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'

/**
 * Syllabus module within a course
 */
export interface SyllabusModule {
  title: string
  lessonCount: number
}

/**
 * A course available on Study Line
 */
export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnailUrl: string
  price: number
  currency: string
  duration: string
  level: CourseLevel
  enrollmentCount: number
  rating: number
  reviewCount: number
  lecturerId: string
  categoryId: string
  isFeatured: boolean
  syllabus: SyllabusModule[]
}

/**
 * Lecturer profile information
 */
export interface Lecturer {
  id: string
  name: string
  title: string
  bio: string
  avatarUrl: string
  expertise: string[]
  courseCount: number
  studentCount: number
  rating: number
  socialLinks: Record<string, string>
}

/**
 * Student testimonial for a course
 */
export interface Testimonial {
  id: string
  studentName: string
  studentAvatar: string
  courseId: string
  courseTitle: string
  rating: number
  text: string
  date: string
}

/**
 * Course category for organization
 */
export interface Category {
  id: string
  name: string
  slug: string
  courseCount: number
}

/**
 * Public Website section data model
 */
export interface PublicWebsiteData {
  categories: Category[]
  courses: Course[]
  lecturers: Lecturer[]
  testimonials: Testimonial[]
}

/**
 * Props for Public Website section components
 */
export interface PublicWebsiteProps {
  /** Course categories for filtering */
  categories: Category[]
  /** All available courses */
  courses: Course[]
  /** Lecturer profiles */
  lecturers: Lecturer[]
  /** Student testimonials */
  testimonials: Testimonial[]
  /**
   * Called when user clicks on a course to view details
   * @param courseId - ID of the selected course
   */
  onViewCourse?: (courseId: string) => void
  /**
   * Called when user clicks enroll button
   * @param courseId - ID of the course to enroll in
   */
  onEnroll?: (courseId: string) => void
  /**
   * Called when user clicks on a lecturer profile
   * @param lecturerId - ID of the lecturer
   */
  onViewLecturer?: (lecturerId: string) => void
  /**
   * Called when user submits contact form
   * @param data - Contact form data (name, email, subject, message)
   */
  onContactSubmit?: (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => void
  /**
   * Called when user clicks sign in button
   */
  onSignIn?: () => void
  /**
   * Called when user clicks sign up button
   */
  onSignUp?: () => void
}
