import data from '@/../product/sections/lecturer-platform/data.json'
import { CourseBuilder } from './components/CourseBuilder'

export default function CourseBuilderPreview() {
  return (
    <CourseBuilder
      courses={data.courses}
      videoLessons={data.videoLessons}
      enrollmentRequests={data.enrollmentRequests}
      studentEnrollments={data.studentEnrollments}
      lecturerMessages={data.lecturerMessages}
      dashboardStats={data.dashboardStats}
      onCreateCourse={(courseData) => console.log('Create course:', courseData)}
      onEditCourse={(courseId) => console.log('Edit course:', courseId)}
      onAddVideo={(lessonData) => console.log('Add video:', lessonData)}
      onApproveEnrollment={(requestId) => console.log('Approve enrollment:', requestId)}
      onRejectEnrollment={(requestId, reason) => console.log('Reject enrollment:', requestId, reason)}
      onViewPaymentSlip={(slipUrl) => console.log('View payment slip:', slipUrl)}
      onSendMessage={(msgData) => console.log('Send message:', msgData)}
      onViewStudents={(courseId) => console.log('View students:', courseId)}
      onViewAnalytics={(courseId) => console.log('View analytics:', courseId)}
    />
  )
}
