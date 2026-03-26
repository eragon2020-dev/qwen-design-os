import { useMemo, useState } from 'react'
import { Check, AlertTriangle, FileText, FolderTree, ChevronDown, Download, Package, Code, FileCode, LayoutTemplate } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { AppLayout } from '@/components/AppLayout'
import { loadProductData, hasExportZip, getExportZipUrl } from '@/lib/product-loader'
import { getAllSectionIds, getSectionScreenDesigns } from '@/lib/section-loader'

export function ExportPage() {
  const productData = useMemo(() => loadProductData(), [])
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'livewire' | 'inertia'>('react')
  const [inertiaFrontend, setInertiaFrontend] = useState<'vue' | 'react' | 'svelte'>('vue')

  // Get section stats
  const sectionStats = useMemo(() => {
    const allSectionIds = getAllSectionIds()
    const sectionCount = productData.roadmap?.sections.length || 0
    const sectionsWithScreenDesigns = allSectionIds.filter(id => {
      const screenDesigns = getSectionScreenDesigns(id)
      return screenDesigns.length > 0
    }).length
    return { sectionCount, sectionsWithScreenDesigns, allSectionIds }
  }, [productData.roadmap])

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const hasDataShape = !!productData.dataShape
  const hasDesignSystem = !!productData.designSystem
  const hasShell = !!productData.shell
  const hasSections = sectionStats.sectionsWithScreenDesigns > 0

  const requiredComplete = hasOverview && hasRoadmap && hasSections

  // Check for export zip
  const exportZipAvailable = hasExportZip()
  const exportZipUrl = getExportZipUrl()

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            {exportZipAvailable ? 'Ready for implementation!' : 'Export'}
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            {exportZipAvailable
              ? 'Download your product design package and implement it in your codebase using the provided handoff prompts and assets.'
              : 'Generate a complete handoff package for your development team.'}
          </p>
        </div>

        {/* Status - only show if zip not available */}
        {!exportZipAvailable && (
          <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {requiredComplete ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                    </div>
                    Ready to Export
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={2.5} />
                    </div>
                    Not Ready
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <ChecklistItem label="Product Overview" isComplete={hasOverview} />
                <ChecklistItem label="Product Roadmap" isComplete={hasRoadmap} />
                <ChecklistItem label="Data Shape" isComplete={hasDataShape} />
                <ChecklistItem label="Design System" isComplete={hasDesignSystem} />
                <ChecklistItem label="Application Shell" isComplete={hasShell} />
                <ChecklistItem
                  label={`Sections with screen designs (${sectionStats.sectionsWithScreenDesigns}/${sectionStats.sectionCount})`}
                  isComplete={hasSections}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Framework Selection */}
        {requiredComplete && !exportZipAvailable && (
          <>
            {/* Quick Generate Options */}
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Quick Generate Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  Use these commands to instantly generate a complete export package for your preferred framework. No additional questions asked.
                </p>
                <div className="space-y-2">
                  <GenerateOption
                    option="A"
                    command="/generate-product-react"
                    title="React"
                    description="Portable React components with props-based API. Works with any React setup."
                    color="lime"
                  />
                  <GenerateOption
                    option="B"
                    command="/generate-product-livewire"
                    title="Laravel Livewire"
                    description="Livewire v4 components and Blade views for Laravel 13+ applications."
                    color="red"
                  />
                  <GenerateOption
                    option="C"
                    command="/generate-product-inertia-vue"
                    title="Laravel Inertia + Vue 3"
                    description="Full-stack SPA with Laravel backend and Vue 3 Composition API frontend."
                    color="emerald"
                  />
                  <GenerateOption
                    option="D"
                    command="/generate-product-inertia-react"
                    title="Laravel Inertia + React"
                    description="Full-stack SPA with Laravel backend and React 18+ Hooks frontend."
                    color="cyan"
                  />
                  <GenerateOption
                    option="E"
                    command="/generate-product-inertia-svelte"
                    title="Laravel Inertia + Svelte"
                    description="Full-stack SPA with Laravel backend and Svelte 4+ frontend."
                    color="orange"
                  />
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                  Tip: Copy the command and run it in your AI coding agent to generate the export instantly.
                </p>
              </CardContent>
            </Card>

            {/* Custom Framework Selection */}
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Custom Export (Interactive)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  Or select a framework below to configure your export manually, then run <code className="font-mono text-stone-800 dark:text-stone-200">/export-product</code> to generate.
                </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedFramework('react')}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFramework === 'react'
                      ? 'border-lime-600 bg-lime-50 dark:bg-lime-900/20 dark:border-lime-500'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedFramework === 'react'
                      ? 'bg-lime-100 dark:bg-lime-900/40'
                      : 'bg-stone-100 dark:bg-stone-800'
                  }`}>
                    <Code className={`w-5 h-5 ${
                      selectedFramework === 'react'
                        ? 'text-lime-600 dark:text-lime-400'
                        : 'text-stone-500 dark:text-stone-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 dark:text-stone-100">React</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                      Portable React components with props-based API. Works with any React setup.
                    </p>
                  </div>
                  {selectedFramework === 'react' && (
                    <div className="w-5 h-5 rounded-full bg-lime-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setSelectedFramework('livewire')}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFramework === 'livewire'
                      ? 'border-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedFramework === 'livewire'
                      ? 'bg-red-100 dark:bg-red-900/40'
                      : 'bg-stone-100 dark:bg-stone-800'
                  }`}>
                    <FileCode className={`w-5 h-5 ${
                      selectedFramework === 'livewire'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-stone-500 dark:text-stone-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 dark:text-stone-100">Laravel Livewire</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                      Livewire v4 components and Blade views for Laravel 13+ applications.
                    </p>
                  </div>
                  {selectedFramework === 'livewire' && (
                    <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setSelectedFramework('inertia')}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFramework === 'inertia'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedFramework === 'inertia'
                      ? 'bg-blue-100 dark:bg-blue-900/40'
                      : 'bg-stone-100 dark:bg-stone-800'
                  }`}>
                    <LayoutTemplate className={`w-5 h-5 ${
                      selectedFramework === 'inertia'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-stone-500 dark:text-stone-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 dark:text-stone-100">Laravel Inertia 3</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                      Full-stack SPA with Laravel backend and Vue, React, or Svelte frontend.
                    </p>
                  </div>
                  {selectedFramework === 'inertia' && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              </div>

              {/* Inertia Frontend Selection */}
              {selectedFramework === 'inertia' && (
                <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
                  <h5 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3">
                    Select Frontend Framework
                  </h5>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setInertiaFrontend('vue')}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        inertiaFrontend === 'vue'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                        inertiaFrontend === 'vue'
                          ? 'bg-emerald-100 dark:bg-emerald-900/40'
                          : 'bg-stone-100 dark:bg-stone-800'
                      }`}>
                        <span className={`text-xs font-bold ${
                          inertiaFrontend === 'vue'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-stone-500 dark:text-stone-400'
                        }`}>Vue</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Vue 3</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Composition API</p>
                      </div>
                      {inertiaFrontend === 'vue' && (
                        <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setInertiaFrontend('react')}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        inertiaFrontend === 'react'
                          ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-500'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                        inertiaFrontend === 'react'
                          ? 'bg-cyan-100 dark:bg-cyan-900/40'
                          : 'bg-stone-100 dark:bg-stone-800'
                      }`}>
                        <span className={`text-xs font-bold ${
                          inertiaFrontend === 'react'
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : 'text-stone-500 dark:text-stone-400'
                        }`}>React</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">React 18+</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Hooks</p>
                      </div>
                      {inertiaFrontend === 'react' && (
                        <div className="w-4 h-4 rounded-full bg-cyan-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setInertiaFrontend('svelte')}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        inertiaFrontend === 'svelte'
                          ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-500'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                        inertiaFrontend === 'svelte'
                          ? 'bg-orange-100 dark:bg-orange-900/40'
                          : 'bg-stone-100 dark:bg-stone-800'
                      }`}>
                        <span className={`text-xs font-bold ${
                          inertiaFrontend === 'svelte'
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-stone-500 dark:text-stone-400'
                        }`}>Svelte</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Svelte 4+</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Stores</p>
                      </div>
                      {inertiaFrontend === 'svelte' && (
                        <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Export command */}
        {requiredComplete && (
          <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {exportZipAvailable ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                    </div>
                    Export Package is Ready
                  </>
                ) : (
                  'Generate Export Package'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {exportZipAvailable && exportZipUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg border border-lime-200 dark:border-lime-800">
                    <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/40 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-lime-600 dark:text-lime-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        Download & use in your codebase
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        product-plan.zip
                      </p>
                    </div>
                    <a
                      href={exportZipUrl}
                      download="product-plan.zip"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-medium text-sm rounded-md transition-colors shrink-0"
                    >
                      <Download className="w-4 h-4" strokeWidth={2} />
                      Download
                    </a>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    To regenerate, run <code className="font-mono text-stone-700 dark:text-stone-300">/export-product</code> again.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-stone-600 dark:text-stone-400">
                    Run the following command to generate a complete export package with all components, types, and handoff documentation:
                  </p>
                  <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-3">
                    <code className="text-sm font-mono text-stone-800 dark:text-stone-200">
                      /export-product
                    </code>
                  </div>
                </div>
              )}

              {/* What's included */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FolderTree className="w-4 h-4" strokeWidth={1.5} />
                  What's Included
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ExportItem
                    title="Ready-to-Use Prompts"
                    description="Pre-written prompts to copy/paste into your coding agent."
                    items={['one-shot-prompt.md', 'section-prompt.md']}
                  />
                  <ExportItem
                    title="Instructions"
                    description="Detailed implementation guides for your coding agent."
                    items={['product-overview.md', 'one-shot-instructions.md', 'incremental/ (milestones)']}
                  />
                  <ExportItem
                    title="Design System"
                    description="Colors, typography, and styling configuration for consistent branding."
                    items={['CSS tokens', 'Tailwind config', 'Font setup']}
                  />
                  <ExportItem
                    title="Data Shape"
                    description="Entity definitions and sample data for your application."
                    items={selectedFramework === 'react'
                      ? ['TypeScript types', 'Sample data', 'Entity docs']
                      : selectedFramework === 'livewire'
                        ? ['PHP classes', 'Sample data', 'Entity docs']
                        : ['TypeScript types', 'Sample data', 'Entity docs']
                    }
                  />
                  <ExportItem
                    title="Components"
                    description={selectedFramework === 'react'
                      ? 'React components and visual references for each section.'
                      : selectedFramework === 'livewire'
                        ? 'Livewire components, Blade views, and visual references.'
                        : `Inertia pages (${inertiaFrontend === 'vue' ? 'Vue 3' : inertiaFrontend === 'react' ? 'React' : 'Svelte'}), controllers, and visual references.`
                    }
                    items={selectedFramework === 'react'
                      ? ['Shell components', 'Section components', 'Screenshots']
                      : selectedFramework === 'livewire'
                        ? ['Livewire classes', 'Blade views', 'Screenshots']
                        : ['Laravel controllers', `Inertia pages (${inertiaFrontend})`, 'Reusable components', 'Screenshots']
                    }
                  />
                  <ExportItem
                    title="Test Instructions"
                    description="Framework-agnostic test specs for TDD implementation."
                    items={['tests.md per section', 'User flow tests', 'Empty state tests']}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to use */}
        <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-stone-500 dark:text-stone-400" strokeWidth={1.5} />
              How to Use the Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Option C - Quick Generate (Fastest) */}
            <Collapsible defaultOpen={false}>
              <CollapsibleTrigger className="flex items-start justify-between w-full text-left group">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-lime-600 text-white text-xs font-bold">FASTEST</span>
                    Quick Generate Commands
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Instant generation with pre-configured settings. One command, done.
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 shrink-0 transition-transform group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-3 mt-4">
                  <QuickGenerateCommand
                    option="A"
                    command="/generate-product-react"
                    title="React"
                    description="Portable React components with props-based API."
                    color="lime"
                  />
                  <QuickGenerateCommand
                    option="B"
                    command="/generate-product-livewire"
                    title="Laravel Livewire"
                    description="Livewire v4 components and Blade views for Laravel 13+."
                    color="red"
                  />
                  <QuickGenerateCommand
                    option="C"
                    command="/generate-product-inertia-vue"
                    title="Laravel Inertia + Vue 3"
                    description="Full-stack SPA with Vue 3 Composition API."
                    color="emerald"
                  />
                  <QuickGenerateCommand
                    option="D"
                    command="/generate-product-inertia-react"
                    title="Laravel Inertia + React"
                    description="Full-stack SPA with React 18+ Hooks."
                    color="cyan"
                  />
                  <QuickGenerateCommand
                    option="E"
                    command="/generate-product-inertia-svelte"
                    title="Laravel Inertia + Svelte"
                    description="Full-stack SPA with Svelte 4+."
                    color="orange"
                  />
                </div>
                <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    <strong>How to use:</strong> Copy any command above and run it in your AI coding agent. The export will be generated instantly with no additional questions.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="border-t border-stone-200 dark:border-stone-700" />

            {/* Option A - Incremental (Recommended) */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-start justify-between w-full text-left group">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100">
                    Option A: Incremental (Recommended)
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Build milestone by milestone for better control and easier debugging.
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 shrink-0 transition-transform group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {selectedFramework === 'react' ? (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder into your codebase</li>
                    <li>Start with Shell (<code className="font-mono text-stone-800 dark:text-stone-200">instructions/incremental/01-shell.md</code>) — design tokens + app shell</li>
                    <li>
                      For each section:
                      <ul className="mt-1.5 ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/section-prompt.md</code>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Copy/paste the prompt into your AI coding agent
                        </li>
                      </ul>
                    </li>
                    <li>Review and test after each milestone before moving to the next</li>
                  </ol>
                ) : selectedFramework === 'livewire' ? (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder to your Laravel project root</li>
                    <li>Start with Shell (<code className="font-mono text-stone-800 dark:text-stone-200">instructions/incremental/01-shell.md</code>) — design tokens + Livewire shell</li>
                    <li>
                      For each section:
                      <ul className="mt-1.5 ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/section-prompt.md</code>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Fill in the section variables (SECTION_NAME, SECTION_ID, NN)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Copy/paste into your AI coding agent
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Answer questions about Eloquent models, routes, and authorization
                        </li>
                      </ul>
                    </li>
                    <li>Run migrations: <code className="font-mono text-stone-800 dark:text-stone-200">php artisan migrate</code></li>
                    <li>Review and test after each milestone</li>
                  </ol>
                ) : (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder to your Laravel project root</li>
                    <li>Start with Shell (<code className="font-mono text-stone-800 dark:text-stone-200">instructions/incremental/01-shell.md</code>) — design tokens + Inertia layout</li>
                    <li>
                      For each section:
                      <ul className="mt-1.5 ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/section-prompt.md</code>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Fill in the section variables (SECTION_NAME, SECTION_ID, NN, FRONTEND)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Copy/paste into your AI coding agent
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Answer questions about Eloquent models, routes, and {inertiaFrontend === 'vue' ? 'Vue' : inertiaFrontend === 'react' ? 'React' : 'Svelte'} integration
                        </li>
                      </ul>
                    </li>
                    <li>Run migrations: <code className="font-mono text-stone-800 dark:text-stone-200">php artisan migrate</code></li>
                    <li>Install dependencies: <code className="font-mono text-stone-800 dark:text-stone-200">npm install</code></li>
                    <li>Review and test after each milestone</li>
                  </ol>
                )}
              </CollapsibleContent>
            </Collapsible>

            <div className="border-t border-stone-200 dark:border-stone-700" />

            {/* Option B - One-Shot */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-start justify-between w-full text-left group">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100">
                    Option B: One-Shot
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Build the entire app in one session using a pre-written prompt.
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 shrink-0 transition-transform group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {selectedFramework === 'react' ? (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder into your codebase</li>
                    <li>Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/one-shot-prompt.md</code></li>
                    <li>Add any additional notes to the prompt (tech stack preferences, etc.)</li>
                    <li>Copy/paste the prompt into your AI coding agent</li>
                    <li>Answer the agent's clarifying questions about auth, user modeling, etc.</li>
                    <li>Let the agent plan and implement everything</li>
                  </ol>
                ) : selectedFramework === 'livewire' ? (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder to your Laravel project root</li>
                    <li>Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/one-shot-prompt.md</code> (Laravel Livewire version)</li>
                    <li>Add notes about your setup (Laravel version, database, auth system)</li>
                    <li>Copy/paste the prompt into your AI coding agent</li>
                    <li>Answer questions about:
                      <ul className="mt-1.5 ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Laravel version and existing setup
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Database choice and migrations
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Authentication (Breeze, Jetstream, Fortify, or custom)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Authorization policies
                        </li>
                      </ul>
                    </li>
                    <li>Let the agent plan and implement everything</li>
                    <li>Run migrations: <code className="font-mono text-stone-800 dark:text-stone-200">php artisan migrate</code></li>
                  </ol>
                ) : (
                  <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                    <li>Copy the <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> folder to your Laravel project root</li>
                    <li>Open <code className="font-mono text-stone-800 dark:text-stone-200">prompts/one-shot-prompt.md</code> (Laravel Inertia version)</li>
                    <li>Add notes about your setup:
                      <ul className="mt-1.5 ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Laravel version and existing setup
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Frontend framework ({inertiaFrontend === 'vue' ? 'Vue 3' : inertiaFrontend === 'react' ? 'React' : 'Svelte'})
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Database choice and migrations
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                          Authentication (Breeze, Jetstream, Fortify, or custom)
                        </li>
                      </ul>
                    </li>
                    <li>Copy/paste the prompt into your AI coding agent</li>
                    <li>Let the agent plan and implement everything</li>
                    <li>Run migrations: <code className="font-mono text-stone-800 dark:text-stone-200">php artisan migrate</code></li>
                    <li>Install dependencies: <code className="font-mono text-stone-800 dark:text-stone-200">npm install</code></li>
                    <li>Build assets: <code className="font-mono text-stone-800 dark:text-stone-200">npm run build</code> or <code className="font-mono text-stone-800 dark:text-stone-200">npm run dev</code></li>
                  </ol>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

interface ChecklistItemProps {
  label: string
  isComplete: boolean
}

function ChecklistItem({ label, isComplete }: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      {isComplete ? (
        <div className="w-4 h-4 rounded bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-stone-600 dark:text-stone-400" strokeWidth={3} />
        </div>
      ) : (
        <div className="w-4 h-4 rounded border-2 border-amber-400 dark:border-amber-500" />
      )}
      <span className="text-sm text-stone-700 dark:text-stone-300">
        {label}
      </span>
    </div>
  )
}

interface ExportItemProps {
  title: string
  description: string
  items: string[]
}

function ExportItem({ title, description, items }: ExportItemProps) {
  return (
    <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4">
      <h4 className="font-medium text-stone-900 dark:text-stone-100 mb-1">{title}</h4>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">{description}</p>
      <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface GenerateOptionProps {
  option: string
  command: string
  title: string
  description: string
  color: 'lime' | 'red' | 'emerald' | 'cyan' | 'orange'
}

function GenerateOption({ option, command, title, description, color }: GenerateOptionProps) {
  const colorClasses = {
    lime: {
      border: 'border-lime-200 dark:border-lime-800',
      bg: 'bg-lime-50 dark:bg-lime-900/20',
      badge: 'bg-lime-600',
      text: 'text-lime-700 dark:text-lime-300',
    },
    red: {
      border: 'border-red-200 dark:border-red-800',
      bg: 'bg-red-50 dark:bg-red-900/20',
      badge: 'bg-red-600',
      text: 'text-red-700 dark:text-red-300',
    },
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      badge: 'bg-emerald-600',
      text: 'text-emerald-700 dark:text-emerald-300',
    },
    cyan: {
      border: 'border-cyan-200 dark:border-cyan-800',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      badge: 'bg-cyan-600',
      text: 'text-cyan-700 dark:text-cyan-300',
    },
    orange: {
      border: 'border-orange-200 dark:border-orange-800',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      badge: 'bg-orange-600',
      text: 'text-orange-700 dark:text-orange-300',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg border ${colors.border} ${colors.bg}`}>
      <div className={`w-8 h-8 rounded-lg ${colors.badge} flex items-center justify-center shrink-0`}>
        <span className="text-white font-bold text-sm">{option}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-stone-900 dark:text-stone-100">{title}</h4>
        <p className="text-sm text-stone-600 dark:text-stone-400">{description}</p>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(command)}
        className={`px-3 py-1.5 rounded-md ${colors.badge} hover:opacity-90 text-white text-sm font-medium transition-opacity shrink-0`}
        title="Copy command"
      >
        Copy
      </button>
    </div>
  )
}

interface QuickGenerateCommandProps {
  option: string
  command: string
  title: string
  description: string
  color: 'lime' | 'red' | 'emerald' | 'cyan' | 'orange'
}

function QuickGenerateCommand({ option, command, title, description, color }: QuickGenerateCommandProps) {
  const colorClasses = {
    lime: {
      border: 'border-lime-200 dark:border-lime-800',
      bg: 'bg-lime-50 dark:bg-lime-900/20',
      badge: 'bg-lime-600',
    },
    red: {
      border: 'border-red-200 dark:border-red-800',
      bg: 'bg-red-50 dark:bg-red-900/20',
      badge: 'bg-red-600',
    },
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      badge: 'bg-emerald-600',
    },
    cyan: {
      border: 'border-cyan-200 dark:border-cyan-800',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      badge: 'bg-cyan-600',
    },
    orange: {
      border: 'border-orange-200 dark:border-orange-800',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      badge: 'bg-orange-600',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg border ${colors.border} ${colors.bg}`}>
      <div className={`w-8 h-8 rounded-lg ${colors.badge} flex items-center justify-center shrink-0`}>
        <span className="text-white font-bold text-sm">{option}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-stone-900 dark:text-stone-100">{title}</h4>
        <p className="text-sm text-stone-600 dark:text-stone-400">{description}</p>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(command)}
        className={`px-3 py-1.5 rounded-md ${colors.badge} hover:opacity-90 text-white text-sm font-medium transition-opacity shrink-0`}
        title="Copy command"
      >
        Copy
      </button>
    </div>
  )
}
