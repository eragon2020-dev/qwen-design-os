import { useState } from 'react'
import { PanelLeft, Menu, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface AppShellProps {
  children: React.ReactNode
  navigationItems?: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems = [],
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="h-14 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4">
          {sidebarOpen && (
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              App
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-stone-500 dark:text-stone-400"
          >
            <PanelLeft className="w-4 h-4" strokeWidth={1.5} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigate?.(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                item.isActive
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <span className="flex-1 text-left">{sidebarOpen ? item.label : item.label.charAt(0)}</span>
            </button>
          ))}
        </nav>

        {/* User menu */}
        {user && (
          <div className="border-t border-stone-200 dark:border-stone-800 p-4">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                <User className="w-4 h-4 text-stone-500 dark:text-stone-400" strokeWidth={1.5} />
              </div>
              {sidebarOpen && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                      {user.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="text-stone-500 dark:text-stone-400"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-stone-500 dark:text-stone-400 md:hidden"
          >
            <Menu className="w-4 h-4" strokeWidth={1.5} />
          </Button>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
