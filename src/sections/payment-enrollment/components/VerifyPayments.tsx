import React, { useState } from 'react'
import type { PaymentEnrollmentProps, PaymentSlip } from '@/../product/sections/payment-enrollment/types'
import { Check, X, Eye, AlertCircle, Search } from 'lucide-react'

/**
 * Verify Payments - Admin view to review and approve/reject payment slips
 */
export function VerifyPayments({
  paymentSlips,
  adminStats,
  onApprovePayment,
  onRejectPayment,
  onViewSlip,
}: PaymentEnrollmentProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [showSlipModal, setShowSlipModal] = useState(false)
  const [selectedSlip, setSelectedSlip] = useState<string>('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [selectedSlipId, setSelectedSlipId] = useState<string>('')

  const filteredSlips = paymentSlips.filter((p) => {
    if (filter === 'all') return true
    return p.status === filter
  })

  const pendingCount = paymentSlips.filter((p) => p.status === 'pending').length

  const handleViewSlip = (slipUrl: string) => {
    setSelectedSlip(slipUrl)
    setShowSlipModal(true)
  }

  const handleReject = (slipId: string) => {
    setSelectedSlipId(slipId)
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    if (rejectReason.trim()) {
      onRejectPayment?.(selectedSlipId, rejectReason)
      setShowRejectModal(false)
      setRejectReason('')
      setSelectedSlipId('')
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Payment Verification
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Review and approve student payment submissions
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{pendingCount} pending</span>
          </div>
        )}
      </div>

      {/* Admin Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard label="Pending" value={adminStats.pendingApprovals} color="amber" />
        <StatCard label="Approved Today" value={adminStats.approvedToday} color="emerald" />
        <StatCard label="Rejected Today" value={adminStats.rejectedToday} color="rose" />
        <StatCard label="Avg. Verification" value={adminStats.averageVerificationTime} color="indigo" />
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

      {/* Payment Slips Table */}
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
                  Payment Info
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
              {filteredSlips.map((slip) => (
                <tr key={slip.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          {slip.studentName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {slip.studentName}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {slip.studentEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {slip.courseTitle}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-slate-900 dark:text-white">
                        ${slip.amount}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {slip.paymentMethod}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {slip.transactionId}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleViewSlip(slip.slipImageUrl)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={slip.status} reason={slip.rejectionReason} />
                  </td>
                  <td className="px-4 py-4">
                    {slip.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onApprovePayment?.(slip.id)}
                          className="p-2 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(slip.id)}
                          className="p-2 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {slip.status === 'approved'
                          ? `Approved ${new Date(slip.verifiedAt!).toLocaleDateString()}`
                          : `Rejected ${new Date(slip.verifiedAt!).toLocaleDateString()}`}
                    )}
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

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Reject Payment
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Please provide a reason for rejecting this payment:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Payment amount does not match course price..."
              rows={4}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white resize-none mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={confirmReject}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors"
              >
                Reject Payment
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason('')
                  setSelectedSlipId('')
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

interface StatCardProps {
  label: string
  value: number | string
  color: 'indigo' | 'emerald' | 'amber' | 'rose'
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className={`text-2xl font-bold ${colorClasses[color]} mb-1`}>{value}</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
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
