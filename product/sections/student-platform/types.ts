/**
 * Enrollment status
 */
export type EnrollmentStatus = 'active' | 'completed' | 'paused'

/**
 * A student's enrollment in a course
 */
export interface Enrollment {
  id: string
  userId: string
  courseId: string
  courseTitle: string
  courseThumbnail: string
  lecturerName: string
  enrolledAt: string
  status: EnrollmentStatus
  progress: number
  completedLessons: number
  totalLessons: number
  lastWatchedVideoId?: string
  lastWatchedAt?: string
  certificateEarned: boolean
  certificateUrl?: string
  completedAt?: string
}

/**
 * Progress tracking for a single video
 */
export interface VideoProgress {
  id: string
  enrollmentId: string
  videoId: string
  videoTitle: string
  watchedSeconds: number
  totalSeconds: number
  isCompleted: boolean
  lastPosition: number
}

/**
 * A note created by a student, linked to a video timestamp
 */
export interface Note {
  id: string
  userId: string
  enrollmentId: string
  courseId: string
  courseTitle: string
  videoId: string
  videoTitle: string
  timestamp: number
  content: string
  createdAt: string
  updatedAt: string
}

/**
 * A message between student and lecturer
 */
export interface Message {
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
 * Overall progress summary for a course enrollment
 */
export interface CourseProgress {
  enrollmentId: string
  courseId: string
  totalVideos: number
  completedVideos: number
  totalMinutes: number
  watchedMinutes: number
  lastActivity: string
  streak: number
  estimatedCompletion?: string
  completedAt?: string
}

/**
 * Student Platform section data model
 */
export interface StudentPlatformData {
  enrollments: Enrollment[]
  videoProgress: VideoProgress[]
  notes: Note[]
  messages: Message[]
  courseProgress: CourseProgress[]
}

/**
 * Props for Student Platform section components
 */
export interface StudentPlatformProps {
  /** Student's course enrollments */
  enrollments: Enrollment[]
  /** Video progress tracking */
  videoProgress: VideoProgress[]
  /** Student's notes */
  notes: Note[]
  /** Messages with lecturers */
  messages: Message[]
  /** Course progress summaries */
  courseProgress: CourseProgress[]
  /**
   * Called when user clicks to continue watching a course
   * @param enrollmentId - ID of the enrollment to continue
   */
  onContinueWatching?: (enrollmentId: string) => void
  /**
   * Called when user clicks on a course to view details
   * @param courseId - ID of the selected course
   */
  onViewCourse?: (courseId: string) => void
  /**
   * Called when user wants to create a new note
   * @param data - Note data including video and timestamp
   */
  onCreateNote?: (data: {
    courseId: string
    videoId: string
    videoTitle: string
    timestamp: number
    content: string
  }) => void
  /**
   * Called when user edits an existing note
   * @param noteId - ID of the note to edit
   * @param content - Updated note content
   */
  onEditNote?: (noteId: string, content: string) => void
  /**
   * Called when user deletes a note
   * @param noteId - ID of the note to delete
   */
  onDeleteNote?: (noteId: string) => void
  /**
   * Called when user clicks on a note to jump to timestamp
   * @param note - The note containing video and timestamp info
   */
  onJumpToTimestamp?: (note: Note) => void
  /**
   * Called when user sends a message to lecturer
   * @param data - Message data
   */
  onSendMessage?: (data: {
    courseId: string
    subject: string
    content: string
    recipientId: string
  }) => void
  /**
   * Called when user clicks to view a message thread
   * @param courseId - ID of the course for the conversation
   */
  onViewMessages?: (courseId: string) => void
  /**
   * Called when user marks a video as complete
   * @param enrollmentId - ID of the enrollment
   * @param videoId - ID of the completed video
   */
  onMarkVideoComplete?: (enrollmentId: string, videoId: string) => void
}
