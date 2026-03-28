# Payment & Enrollment Specification

## Overview
The Payment & Enrollment section handles the payment verification and enrollment management workflow. Students can upload payment slips to enroll in courses, track their enrollment status, and view payment history. Admins manually verify payment slips and approve or reject enrollments. This section serves both students (upload and track) and admins (verify and manage).

## User Flows
- **Upload Payment Slip** — Select course, upload payment slip image, enter transaction details, submit for approval
- **View Enrollment Status** — See all enrollment requests with status (pending, approved, rejected)
- **View Payment History** — See all past payments and enrollments
- **Admin: Verify Payments** — Review pending payment slips, approve or reject with reason
- **Admin: Manage Enrollments** — View all enrollments, filter by status, search by student or course
- **Student: Re-submit Payment** — If rejected, upload new payment slip with corrected information
- **Student: View Certificate** — After course completion, download certificate

## UI Requirements
- Payment slip upload form with image preview
- Course selection dropdown with price display
- Transaction details form (transaction ID, payment date, amount)
- Enrollment status list with clear status badges (pending/approved/rejected)
- Payment slip image viewer with zoom capability
- Admin dashboard with pending approvals count and quick actions
- Admin payment verification table with approve/reject actions
- Rejection modal with reason input field
- Success/error state displays
- Responsive design for mobile and desktop
- File upload with drag-and-drop support
- Image compression/preview before upload

## Configuration
- shell: true
