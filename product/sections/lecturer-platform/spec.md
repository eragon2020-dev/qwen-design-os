# Lecturer Platform Specification

## Overview
The Lecturer Platform is the authenticated teaching environment where lecturers create and manage courses, add video content, review and approve enrollment requests, and communicate with students. It includes a dashboard showing course performance, a course builder for creating and editing courses, an enrollment approval queue for reviewing payment verifications, and a messaging interface for student communication.

## User Flows
- **Dashboard View** — See course overview, student count, revenue, recent enrollments, and pending approvals
- **Create Course** — Add course details (title, description, thumbnail, price, category, level)
- **Manage Course Content** — Add/edit/delete video lessons, organize into sections, reorder content
- **Add Video Links** — Input YouTube video URLs, set titles and duration, preview embed
- **View Enrollment Requests** — See pending enrollment applications with payment slip previews
- **Approve/Reject Enrollments** — Review payment proof, approve or reject with reason
- **View Students** — See enrolled students per course, their progress, and activity
- **Message Students** — Respond to student questions, send announcements to course students
- **View Course Analytics** — See enrollment numbers, completion rates, student ratings

## UI Requirements
- Dashboard with stats cards (total students, courses, revenue, pending approvals)
- Course list view with edit and analytics actions
- Course builder form with multiple steps (details, content, publish)
- Video lesson manager with drag-and-drop reordering
- YouTube video preview/embed player
- Enrollment request table with student info, payment slip preview, approve/reject actions
- Payment slip image viewer with zoom capability
- Student list per course with progress indicators
- Messaging interface with conversation threads
- Status badges for enrollments (pending, approved, rejected)
- Confirmation modals for approve/reject actions
- Responsive design for all screen sizes

## Configuration
- shell: true
