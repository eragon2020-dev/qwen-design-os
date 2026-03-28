import data from '@/../product/sections/public-website/data.json'
import { ContactPage } from './components/ContactPage'

export default function ContactPagePreview() {
  return (
    <ContactPage
      categories={data.categories}
      courses={data.courses}
      lecturers={data.lecturers}
      testimonials={data.testimonials}
      onViewCourse={(courseId) => console.log('View course:', courseId)}
      onEnroll={(courseId) => console.log('Enroll in course:', courseId)}
      onViewLecturer={(lecturerId) => console.log('View lecturer:', lecturerId)}
      onContactSubmit={(data) => console.log('Contact submit:', data)}
      onSignIn={() => console.log('Sign in')}
      onSignUp={() => console.log('Sign up')}
    />
  )
}
