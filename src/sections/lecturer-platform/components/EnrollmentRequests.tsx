import React, { useState } from 'react'
import type { LecturerPlatformProps, EnrollmentRequest } from '@/../product/sections/lecturer-platform/types'
import { Check, X, Eye, AlertCircle } from 'lucide-react'

/**
 * Enrollment Requests - Review and approve/reject student enrollment requests
 */
export function EnrollmentRequests({
  enrollmentRequests,
  onApproveEnrollment,
  onRejectEnrollment,
  onViewPaymentSlip,
}: LecturerPlatformProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [showSlipModal, setShowSlipModal] = useState(false)
  const [selectedSlip, setSelectedSlip] = useState<string>('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [selectedRequestId, setSelectedRequestId] = useState<string>('')

  const filteredRequests = enrollmentRequests.filter((r) => {
    if (filter === 'all') return true
    return r.status === filter
  })

  const pendingCount = enrollmentRequests.filter((r) => r.status === 'pending').length

  const handleViewSlip = (slipUrl: string) => {
    setSelectedSlip(slipUrl)
    setShowSlipModal(true)
  }

  const handleReject = (requestId: string) => {
    setSelectedRequestId(requestId)
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    if (rejectReason.trim()) {
      onRejectEnrollment?.(selectedRequestId, rejectReason)
      setShowRejectModal(false)
      setRejectReason('')
      setSelectedRequestId('')
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Enrollment Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Review and approve student enrollment requests
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{pendingCount} pending</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Slip
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
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={request.studentAvatar}
                        alt={request.studentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {request.studentName}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {request.studentEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {request.courseTitle}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      ${request.amount}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {request.transactionId}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleViewSlip(request.paymentSlipUrl)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={request.status} reason={request.rejectionReason} />
                  </td>
                  <td className="px-4 py-4">
                    {request.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onApproveEnrollment?.(request.id)}
                          className="p-2 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="p-2 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {request.status === 'approved'
                          ? `Approved ${new Date(request.approvedAt!).toLocaleDateString()}`
                          : `Rejected ${new Date(request.rejectedAt!).toLocaleDateString()}`}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Slip Modal */}
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
              <img
                src={selectedSlip}
                alt="Payment slip"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Reject Enrollment
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Please provide a reason for rejecting this enrollment request:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Payment amount does not match..."
              rows={4}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white resize-none mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={confirmReject}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors"
              >
                Reject Enrollment
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason('')
                  setSelectedRequestId('')
                }}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
