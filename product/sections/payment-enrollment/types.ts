/**
 * Payment slip status
 */
export type PaymentStatus = 'pending' | 'approved' | 'rejected'

/**
 * Enrollment status
 */
export type EnrollmentStatusType = 'active' | 'completed' | 'paused' | 'expired'

/**
 * Payment method options
 */
export type PaymentMethod = 'Bank Transfer' | 'Credit Card' | 'Mobile Banking' | 'Cash Deposit'

/**
 * A payment slip uploaded for enrollment verification
 */
export interface PaymentSlip {
  id: string
  userId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseTitle: string
  coursePrice: number
  currency: string
  slipImageUrl: string
  transactionId: string
  paymentMethod: PaymentMethod
  paymentDate: string
  uploadedAt: string
  status: PaymentStatus
  verifiedBy?: string | null
  verifiedAt?: string | null
  rejectionReason?: string | null
  enrollmentId?: string | null
}

/**
 * Current status of a student's enrollment
 */
export interface EnrollmentStatus {
  enrollmentId: string
  courseId: string
  courseTitle: string
  status: EnrollmentStatusType
  progress: number
  canAccessContent: boolean
  certificateAvailable: boolean
  certificateUrl?: string
  completedAt?: string
}

/**
 * Available course for enrollment
 */
export interface AvailableCourse {
  id: string
  title: string
  price: number
  currency: string
  lecturerName: string
  thumbnailUrl: string
  enrollmentCount: number
  rating: number
}

/**
 * Admin dashboard statistics
 */
export interface AdminStats {
  pendingApprovals: number
  approvedToday: number
  rejectedToday: number
  totalEnrollments: number
  totalRevenue: number
  averageVerificationTime: string
}

/**
 * Payment & Enrollment section data model
 */
export interface PaymentEnrollmentData {
  paymentSlips: PaymentSlip[]
  enrollmentStatuses: EnrollmentStatus[]
  availableCourses: AvailableCourse[]
  adminStats: AdminStats
}

/**
 * Props for Payment & Enrollment section components
 */
export interface PaymentEnrollmentProps {
  /** Payment slips uploaded by students */
  paymentSlips: PaymentSlip[]
  /** Current enrollment statuses */
  enrollmentStatuses: EnrollmentStatus[]
  /** Courses available for enrollment */
  availableCourses: AvailableCourse[]
  /** Admin statistics */
  adminStats: AdminStats
  /**
   * Called when student uploads a new payment slip
   * @param data - Payment slip data
   */
  onUploadPayment?: (data: {
    courseId: string
    transactionId: string
    paymentMethod: PaymentMethod
    paymentDate: string
    slipImageUrl: string
  }) => void
  /**
   * Called when admin approves a payment slip
   * @param paymentSlipId - ID of the payment slip to approve
   */
  onApprovePayment?: (paymentSlipId: string) => void
  /**
   * Called when admin rejects a payment slip
   * @param paymentSlipId - ID of the payment slip to reject
   * @param reason - Reason for rejection
   */
  onRejectPayment?: (paymentSlipId: string, reason: string) => void
  /**
   * Called when admin views payment slip image
   * @param slipImageUrl - URL of the payment slip image
   */
  onViewSlip?: (slipImageUrl: string) => void
  /**
   * Called when student wants to enroll in a course
   * @param courseId - ID of the course to enroll in
   */
  onEnroll?: (courseId: string) => void
  /**
   * Called when student downloads certificate
   * @param enrollmentId - ID of the completed enrollment
   */
  onDownloadCertificate?: (enrollmentId: string) => void
  /**
   * Called when student re-submits payment after rejection
   * @param paymentSlipId - ID of the rejected payment slip
   */
  onResubmitPayment?: (paymentSlipId: string) => void
}
