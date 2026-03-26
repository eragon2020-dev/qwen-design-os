import { FileText, Boxes, Layout, LayoutList, Package } from 'lucide-react'

export type Phase = 'product' | 'data-shape' | 'design' | 'sections' | 'export'

export interface PhaseConfig {
  id: Phase
  label: string
  icon: typeof FileText
  path: string
}

export const phases: PhaseConfig[] = [
  { id: 'product', label: 'Product', icon: FileText, path: '/' },
  { id: 'data-shape', label: 'Data Shape', icon: Boxes, path: '/data-shape' },
  { id: 'design', label: 'Design', icon: Layout, path: '/design' },
  { id: 'sections', label: 'Sections', icon: LayoutList, path: '/sections' },
  { id: 'export', label: 'Export', icon: Package, path: '/export' },
]
