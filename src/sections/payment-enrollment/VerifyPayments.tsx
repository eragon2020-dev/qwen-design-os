import data from '@/../product/sections/payment-enrollment/data.json'
import { VerifyPayments } from './components/VerifyPayments'

export default function VerifyPaymentsPreview() {
  return (
    <VerifyPayments
      paymentSlips={data.paymentSlips}
      enrollmentStatuses={data.enrollmentStatuses}
      availableCourses={data.availableCourses}
      adminStats={data.adminStats}
      onUploadPayment={(paymentData) => console.log('Upload payment:', paymentData)}
      onApprovePayment={(slipId) => console.log('Approve payment:', slipId)}
      onRejectPayment={(slipId, reason) => console.log('Reject payment:', slipId, reason)}
      onViewSlip={(slipUrl) => console.log('View slip:', slipUrl)}
      onEnroll={(courseId) => console.log('Enroll:', courseId)}
      onDownloadCertificate={(enrollmentId) => console.log('Download certificate:', enrollmentId)}
      onResubmitPayment={(slipId) => console.log('Resubmit payment:', slipId)}
    />
  )
}
