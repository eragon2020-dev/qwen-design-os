/**
 * Course status
 */
export type CourseStatus = 'draft' | 'active' | 'archived'

/**
 * Enrollment request status
 */
export type RequestStatus = 'pending' | 'approved' | 'rejected'

/**
 * A course managed by a lecturer
 */
export interface LecturerCourse {
  id: string
  title: string
  slug: string
  description: string
  thumbnailUrl: string
  price: number
  currency: string
  categoryId: string
  categoryName: string
  level: string
  duration: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  enrollmentCount: number
  rating: number
  reviewCount: number
  revenue: number
  videoCount: number
  status: CourseStatus
}

/**
 * A video lesson within a course
 */
export interface VideoLesson {
  id: string
  courseId: string
  sectionTitle: string
  title: string
  description: string
  youtubeUrl: string
  thumbnailUrl: string
  duration: number
  order: number
  isFree: boolean
  viewCount: number
  createdAt: string
}

/**
 * A student's enrollment request pending approval
 */
export interface EnrollmentRequest {
  id: string
  courseId: string
  courseTitle: string
  studentId: string
  studentName: string
  studentEmail: string
  studentAvatar: string
  paymentSlipUrl: string
  amount: number
  currency: string
  transactionId: string
  paymentDate: string
  requestDate: string
  status: RequestStatus
  rejectionReason?: string | null
  approvedAt?: string
  rejectedAt?: string
}

/**
 * An approved student enrollment in a course
 */
export interface StudentEnrollment {
  enrollmentId: string
  courseId: string
  studentId: string
  studentName: string
  studentEmail: string
  studentAvatar: string
  enrolledAt: string
  progress: number
  lastActivity: string
  status: string
}

/**
 * A message between lecturer and student
 */
export interface LecturerMessage {
  id: string
  courseId: string
  courseTitle: string
  senderId: string
  senderName: string
  senderRole: 'student' | 'lecturer'
  recipientId: string
  recipientName: string
  recipientRole: 'student' | 'lecturer'
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  parentMessageId?: string
}

/**
 * Dashboard statistics summary
 */
export interface DashboardStats {
  totalStudents: number
  totalCourses: number
  totalRevenue: number
  pendingApprovals: number
  thisMonthEnrollments: number
  thisMonthRevenue: number
  averageRating: number
  totalReviews: number
}

/**
 * Lecturer Platform section data model
 */
export interface LecturerPlatformData {
  courses: LecturerCourse[]
  videoLessons: VideoLesson[]
  enrollmentRequests: EnrollmentRequest[]
  studentEnrollments: StudentEnrollment[]
  lecturerMessages: LecturerMessage[]
  dashboardStats: DashboardStats
}

/**
 * Props for Lecturer Platform section components
 */
export interface LecturerPlatformProps {
  /** Courses created by lecturer */
  courses: LecturerCourse[]
  /** Video lessons for courses */
  videoLessons: VideoLesson[]
  /** Pending enrollment requests */
  enrollmentRequests: EnrollmentRequest[]
  /** Approved student enrollments */
  studentEnrollments: StudentEnrollment[]
  /** Messages with students */
  lecturerMessages: LecturerMessage[]
  /** Dashboard statistics */
  dashboardStats: DashboardStats
  /**
   * Called when lecturer creates a new course
   * @param courseData - Course details
   */
  onCreateCourse?: (courseData: {
    title: string
    description: string
    price: number
    categoryId: string
    level: string
  }) => void
  /**
   * Called when lecturer edits an existing course
   * @param courseId - ID of the course to edit
   */
  onEditCourse?: (courseId: string) => void
  /**
   * Called when lecturer adds a video lesson
   * @param lessonData - Video lesson details
   */
  onAddVideo?: (lessonData: {
    courseId: string
    sectionTitle: string
    title: string
    description: string
    youtubeUrl: string
    duration: number
  }) => void
  /**
   * Called when lecturer approves an enrollment request
   * @param requestId - ID of the enrollment request
   */
  onApproveEnrollment?: (requestId: string) => void
  /**
   * Called when lecturer rejects an enrollment request
   * @param requestId - ID of the enrollment request
   * @param reason - Reason for rejection
   */
  onRejectEnrollment?: (requestId: string, reason: string) => void
  /**
   * Called when lecturer views payment slip
   * @param slipUrl - URL of the payment slip image
   */
  onViewPaymentSlip?: (slipUrl: string) => void
  /**
   * Called when lecturer sends a message to student
   * @param data - Message data
   */
  onSendMessage?: (data: {
    studentId: string
    courseId: string
    content: string
  }) => void
  /**
   * Called when lecturer views student list for a course
   * @param courseId - ID of the course
   */
  onViewStudents?: (courseId: string) => void
  /**
   * Called when lecturer views course analytics
   * @param courseId - ID of the course
   */
  onViewAnalytics?: (courseId: string) => void
}
