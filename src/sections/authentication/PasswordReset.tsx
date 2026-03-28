import data from '@/../product/sections/authentication/data.json'
import { PasswordReset } from './components/PasswordReset'

export default function PasswordResetPreview() {
  return (
    <PasswordReset
      users={data.users}
      otpRequests={data.otpRequests}
      onPasswordReset={(identifier) =>
        console.log('Password reset requested for:', identifier)
      }
      onCancel={() => console.log('Navigate to sign in')}
    />
  )
}
