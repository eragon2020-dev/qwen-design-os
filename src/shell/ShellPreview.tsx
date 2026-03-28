import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Student Dashboard', href: '/student-dashboard', isActive: true },
    { label: 'My Courses', href: '/my-courses' },
    { label: 'Messages', href: '/messages' },
    { label: 'Notes', href: '/notes' },
    { label: 'Create Course', href: '/create-course' },
    { label: 'Manage Enrollments', href: '/manage-enrollments' },
    { label: 'Payment & Enrollment', href: '/payment-enrollment' },
  ]

  const user = {
    name: 'Alex Morgan',
    role: 'Student',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 font-heading text-slate-900 dark:text-white">
          Content Area
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Section content will render here. The sidebar navigation provides
          access to all Study Line features.
        </p>
        <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
            Design Tokens Applied
          </h2>
          <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
            <li>• Primary: indigo (active states, accents)</li>
            <li>• Secondary: emerald (role badges, success)</li>
            <li>• Neutral: slate (backgrounds, text, borders)</li>
            <li>• Heading font: DM Sans</li>
            <li>• Body font: Inter</li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}
