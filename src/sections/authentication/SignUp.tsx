import data from '@/../product/sections/authentication/data.json'
import { SignUp } from './components/SignUp'

export default function SignUpPreview() {
  return (
    <SignUp
      users={data.users}
      otpRequests={data.otpRequests}
      onSignUp={(data) => console.log('Sign up with:', data)}
      onRequestOtp={(mobile) => console.log('Send OTP to:', mobile)}
      onVerifyOtp={(mobile, code) => console.log('Verify OTP:', mobile, code)}
      onCancel={() => console.log('Navigate to sign in')}
    />
  )
}
