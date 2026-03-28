/**
 * User role in the system
 */
export type UserRole = 'student' | 'lecturer'

/**
 * Purpose of an OTP request
 */
export type OtpPurpose = 'signup' | 'passwordReset'

/**
 * A registered user account with authentication credentials
 */
export interface User {
  id: string
  name: string
  email: string
  mobile: string
  role: UserRole
  createdAt: string
}

/**
 * An OTP verification request sent to mobile or email
 */
export interface OtpRequest {
  id: string
  mobile: string | null
  email: string | null
  purpose: OtpPurpose
  code: string
  expiresAt: string
  verified: boolean
}

/**
 * Authentication section data model
 */
export interface AuthenticationData {
  users: User[]
  otpRequests: OtpRequest[]
}

/**
 * Props for Authentication section components
 */
export interface AuthenticationProps {
  /** Sample user data for display */
  users: User[]
  /** Sample OTP requests for display */
  otpRequests: OtpRequest[]
  /**
   * Called when user submits sign-up form
   * @param data - User registration data (mobile, name, email, password)
   */
  onSignUp?: (data: {
    mobile: string
    name: string
    email: string
    password: string
  }) => void
  /**
   * Called when user requests OTP verification
   * @param mobile - Mobile number to send OTP to
   */
  onRequestOtp?: (mobile: string) => void
  /**
   * Called when user submits OTP for verification
   * @param mobile - Mobile number
   * @param code - OTP code entered by user
   */
  onVerifyOtp?: (mobile: string, code: string) => void
  /**
   * Called when user submits sign-in form
   * @param credentials - Login credentials (email/mobile and password)
   */
  onSignIn?: (credentials: {
    identifier: string
    password: string
  }) => void
  /**
   * Called when user requests password reset
   * @param identifier - Email or mobile number
   */
  onPasswordReset?: (identifier: string) => void
  /**
   * Called when user cancels authentication flow
   */
  onCancel?: () => void
}
