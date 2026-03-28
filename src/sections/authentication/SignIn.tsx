import data from '@/../product/sections/authentication/data.json'
import { SignIn } from './components/SignIn'

export default function SignInPreview() {
  return (
    <SignIn
      users={data.users}
      otpRequests={data.otpRequests}
      onSignIn={(credentials) =>
        console.log('Sign in with:', credentials)
      }
      onPasswordReset={(identifier) =>
        console.log('Password reset requested for:', identifier)
      }
      onCancel={() => console.log('Navigate to sign up')}
    />
  )
}
