import React, { useState } from 'react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { Menu } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string; role?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-slate-900 dark:bg-slate-950 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-slate-800">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-400" />
            </button>
            {!sidebarCollapsed && (
              <span className="ml-3 text-lg font-bold text-white font-heading">
                Study Line
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <MainNav
              items={navigationItems}
              collapsed={sidebarCollapsed}
              onNavigate={(href) => {
                onNavigate?.(href)
                setSidebarOpen(false)
              }}
            />
          </nav>

          {/* User Menu */}
          {!sidebarCollapsed && user && (
            <div className="p-4 border-t border-slate-800">
              <UserMenu user={user} onLogout={onLogout} />
            </div>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}
      >
        {/* Mobile header */}
        <header className="lg:hidden h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <span className="ml-4 text-lg font-bold text-slate-900 dark:text-white font-heading">
            Study Line
          </span>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  )
}
