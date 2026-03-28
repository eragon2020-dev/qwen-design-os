import React from 'react'
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Notebook,
  PlusCircle,
  Users,
  CreditCard,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface MainNavProps {
  items: NavItem[]
  collapsed: boolean
  onNavigate: (href: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Student Dashboard': LayoutDashboard,
  'My Courses': BookOpen,
  Messages: MessageSquare,
  Notes: Notebook,
  'Create Course': PlusCircle,
  'Manage Enrollments': Users,
  'Payment & Enrollment': CreditCard,
}

export function MainNav({ items, collapsed, onNavigate }: MainNavProps) {
  return (
    <ul className="space-y-1 px-2">
      {items.map((item) => {
        const Icon = iconMap[item.label] || LayoutDashboard

        return (
          <li key={item.href}>
            <button
              onClick={() => onNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${
                  item.isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${item.isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
              />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
