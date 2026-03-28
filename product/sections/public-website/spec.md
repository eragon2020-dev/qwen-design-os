# Public Website Specification

## Overview
The Public Website is the marketing-facing portion of Study Line that showcases courses, lecturers, and testimonials to attract new users. It includes a compelling homepage, course catalog with search and filters, individual course detail pages, lecturer profiles, and a contact page. This section is standalone (no app shell) as it serves visitors who are not yet logged in.

## User Flows
- **Browse Homepage** — Land on homepage, view featured courses, testimonials, and value proposition
- **Search & Filter Courses** — Browse course catalog, filter by category/level, search by keyword
- **View Course Details** — Click a course to see full description, syllabus, lecturer info, and enroll
- **View Lecturer Profiles** — Browse lecturers, view their profiles and courses they teach
- **Contact Study Line** — Submit inquiry via contact form with subject selection
- **Enroll from Public Pages** — Click enroll button, redirected to sign-up or payment

## UI Requirements
- Standalone full-page layouts without sidebar navigation (public-facing)
- Hero section with compelling headline and call-to-action
- Course cards with thumbnails, title, lecturer, rating, and price/enroll button
- Course detail page with video preview, description, syllabus, lecturer bio
- Search bar with real-time filtering
- Category and level filter chips/tabs
- Lecturer profile cards with photo, bio, expertise areas, and course list
- Testimonials carousel or grid with student photos and quotes
- Contact form with validation and success state
- Responsive navigation header with logo, navigation links, and Sign In/Sign Up buttons
- Footer with links, social media, and contact information
- Smooth animations and transitions for polished feel

## Configuration
- shell: false
