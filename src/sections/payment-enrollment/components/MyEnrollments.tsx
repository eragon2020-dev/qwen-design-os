import React, { useState } from 'react'
import type { PaymentEnrollmentProps, PaymentSlip, EnrollmentStatus } from '@/../product/sections/payment-enrollment/types'
import { Search, Filter, Eye, Download, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

/**
 * My Enrollments - Track enrollment status and view payment history
 */
export function MyEnrollments({
  paymentSlips,
  enrollmentStatuses,
  availableCourses,
  onDownloadCertificate,
  onResubmitPayment,
  onViewSlip,
  onEnroll,
}: PaymentEnrollmentProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'active' | 'completed'>('all')
  const [showSlipModal, setShowSlipModal] = useState(false)
  const [selectedSlip, setSelectedSlip] = useState<string>('')

  const pendingSlips = paymentSlips.filter((p) => p.status === 'pending')
  const rejectedSlips = paymentSlips.filter((p) => p.status === 'rejected')

  const filteredEnrollments = enrollmentStatuses.filter((e) => {
    if (filter === 'all') return true
    return e.status === filter
  })

  const handleViewSlip = (slipUrl: string) => {
    setSelectedSlip(slipUrl)
    setShowSlipModal(true)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            My Enrollments
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track your enrollment status and payment history
          </p>
        </div>
        <button
          onClick={() => onEnroll?.(availableCourses[0]?.id || '')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          New Enrollment
        </button>
      </div>

      {/* Pending & Rejected Alerts */}
      {pendingSlips.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-900 dark:text-amber-200">
              {pendingSlips.length} Pending Approval{pendingSlips.length > 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Your payment{pendingSlips.length > 1 ? 's are' : ' is'} being verified. This usually takes 24-48 hours.
            </p>
          </div>
        </div>
      )}

      {rejectedSlips.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-rose-900 dark:text-rose-200">
              Action Required: {rejectedSlips.length} Rejected Payment{rejectedSlips.length > 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
              Please review the rejection reason and resubmit your payment.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Filter className="w-4 h-4" />
          Filter:
        </span>
        {(['all', 'active', 'completed', 'pending', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Active/Completed Enrollments */}
      {filteredEnrollments.length > 0 && (filter === 'all' || filter === 'active' || filter === 'completed') && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEnrollments.map((enrollment) => (
            <EnrollmentCard
              key={enrollment.enrollmentId}
              enrollment={enrollment}
              onViewCertificate={() => onDownloadCertificate?.(enrollment.enrollmentId)}
            />
          ))}
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paymentSlips.map((slip) => (
                <tr key={slip.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {slip.courseTitle}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {slip.transactionId}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    ${slip.coursePrice}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(slip.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={slip.status} reason={slip.rejectionReason} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewSlip(slip.slipImageUrl)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                        title="View slip"
                      >
                        <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      {slip.status === 'rejected' && (
                        <button
                          onClick={() => onResubmitPayment?.(slip.id)}
                          className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded transition-colors"
                          title="Resubmit"
                        >
                          <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </button>
                      )}
                      {slip.status === 'approved' && enrollmentStatuses.find((e) => e.enrollmentId === slip.enrollmentId)?.certificateAvailable && (
                        <button
                          onClick={() => onDownloadCertificate?.(slip.enrollmentId!)}
                          className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded transition-colors"
                          title="Download certificate"
                        >
                          <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Slip</h3>
              <button
                onClick={() => setShowSlipModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img src={selectedSlip} alt="Payment slip" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface EnrollmentCardProps {
  enrollment: EnrollmentStatus
  onViewCertificate?: () => void
}

function EnrollmentCard({ enrollment, onViewCertificate }: EnrollmentCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-slate-400 dark:text-slate-500">Course Thumbnail</span>
        </div>
        {enrollment.certificateAvailable && (
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{enrollment.courseTitle}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
            enrollment.status === 'active'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
          }`}>
            {enrollment.status}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">{enrollment.progress}% complete</span>
        </div>
        <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <div
            className="bg-indigo-600 rounded-full h-2 transition-all"
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
        {enrollment.certificateAvailable && (
          <button
            onClick={onViewCertificate}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
        )}
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected'
  reason?: string | null
}

function StatusBadge({ status, reason }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    approved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    rejected: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  }

  return (
    <div className="space-y-1">
      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${styles[status]}`}>
        {status}
      </span>
      {reason && (
        <p className="text-xs text-rose-600 dark:text-rose-400 max-w-[200px] truncate" title={reason}>
          {reason}
        </p>
      )}
    </div>
  )
}
