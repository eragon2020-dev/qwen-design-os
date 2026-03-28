# Application Shell Specification

## Overview
The Study Line application shell provides a sidebar navigation layout that wraps all authenticated sections of the platform. It offers quick access to student and lecturer features while maintaining a clean, focused learning environment.

## Navigation Structure
- Student Dashboard → Student Platform (default home)
- My Courses → Student Platform
- Messages → Student Platform
- Notes → Student Platform
- Create Course → Lecturer Platform
- Manage Enrollments → Lecturer Platform
- Payment & Enrollment → Payment & Enrollment

## User Menu
Located at the bottom of the sidebar. Displays user avatar (or initials), full name, role badge (Student/Lecturer), and logout option. The menu expands on hover or click to show additional options like profile settings.

## Layout Pattern
Fixed left sidebar navigation with main content area on the right. The sidebar contains the Study Line logo at the top, followed by navigation items grouped by role (student/lecturer), and the user menu at the bottom. Active navigation items are highlighted with the primary indigo color.

## Responsive Behavior
- **Desktop:** Fixed 256px sidebar on left, always visible. Collapsible to icons-only mode.
- **Tablet:** Sidebar collapses to icons-only by default, expandable on hover.
- **Mobile:** Sidebar hidden by default, accessible via hamburger menu icon in top-left corner. Slides in from left with overlay backdrop.

## Design Notes
- Primary color (indigo) used for active navigation states and key accents
- Secondary color (emerald) for success states and lecturer-specific actions
- Neutral slate palette for backgrounds, text, and borders
- DM Sans for navigation labels and headings
- Inter for body text and descriptions
- Smooth transitions for sidebar collapse/expand animations
- Support for light and dark mode throughout
