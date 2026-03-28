# Student Platform Specification

## Overview
The Student Platform is the authenticated learning environment where students access their enrolled courses, watch video lessons, take notes, and communicate with lecturers. It includes a dashboard showing learning progress, a video player with course content sidebar, a note-taking system linked to video timestamps, and a messaging interface for course-related questions.

## User Flows
- **Dashboard View** — See enrolled courses, continue watching, progress overview, and recent activity
- **Browse Enrolled Courses** — View all enrolled courses in a grid with progress indicators
- **Watch Course Videos** — Play video, navigate lessons, mark as complete, track progress
- **Take Notes** — Create timestamped notes while watching, edit/delete notes, filter by course
- **View Notes** — See all notes organized by course, quick navigation to video timestamps
- **Message Lecturer** — Start conversation from course page, view message history, send/reply to messages
- **View Course Progress** — See completion percentage, time spent, certificates earned

## UI Requirements
- Dashboard with course grid, continue watching section, and progress stats
- Video player with embedded YouTube player support
- Course content sidebar showing all lessons with completion indicators
- Notes panel that can be toggled while watching videos
- Timestamp-linked note creation (auto-capture current video time)
- Notes list view with search and course filter
- Messaging interface with conversation list and message thread view
- Progress indicators on course cards (percentage bars)
- Responsive layout that works on desktop, tablet, and mobile
- Light/dark mode support

## Configuration
- shell: true
