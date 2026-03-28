# Authentication Specification

## Overview
The Authentication section handles user sign-up and sign-in for Study Line. It supports mobile number + OTP verification for registration, password-based login, and password reset via mobile or email. This section is standalone (no app shell) since users are not authenticated.

## User Flows
- **Sign Up (Multi-step)**
  1. User enters mobile number
  2. System sends OTP to mobile
  3. User enters OTP to verify
  4. User provides name, email, and password
  5. Account created, user redirected to login

- **Sign In (Single Page)**
  1. User enters mobile number or email
  2. User enters password
  3. User clicks sign in
  4. Redirected to appropriate dashboard based on role

- **Password Reset**
  1. User clicks "Forgot Password"
  2. User enters mobile number or email
  3. System sends reset OTP
  4. User enters OTP
  5. User sets new password
  6. Redirected to login

## UI Requirements
- Standalone full-page layouts (no sidebar navigation)
- Multi-step form wizard for sign-up with progress indicator
- Single page form for sign-in with "Forgot Password" link
- Password reset flow with OTP verification
- Form validation with error messages
- Loading states during OTP sending/verification
- Responsive design for mobile and desktop
- Clear visual separation between sign-up and sign-in

## Configuration
- shell: false
