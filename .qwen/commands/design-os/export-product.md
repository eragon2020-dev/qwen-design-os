# Export Product

You are helping the user export their complete product design as a handoff package for implementation. This generates all files needed to integrate the UI designs into a real codebase.

## Step 0: Ask About Target Framework

Before generating the export, ask the user:

"Which framework would you like to export for?

1. **React** (default) — Portable React components with props-based API
2. **Laravel Livewire** — Blade components with Livewire v4 classes for Laravel 13+

Type `react` or `laravel` (or just press Enter for React)."

Store their choice as `TARGET_FRAMEWORK`. Default to `react` if not specified.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

**Recommended (show warning if missing):**
- `/product/data-shape/data-shape.md` — Product entities
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `src/shell/components/AppShell.tsx` — Application shell

If required files are missing:

"To export your product, you need at minimum:
- A product overview (`/product-vision`)
- A roadmap with sections (`/product-roadmap`)
- At least one section with screen designs

Please complete these first."

Stop here if required files are missing.

If recommended files are missing, show warnings but continue:

"Note: Some recommended items are missing:
- [ ] Product entities — Run `/data-shape` for consistent entity naming
- [ ] Design tokens — Run `/design-tokens` for consistent styling
- [ ] Application shell — Run `/design-shell` for navigation structure

You can proceed without these, but they help ensure a complete handoff."

## Step 2: Gather Export Information

Read all relevant files:

1. `/product/product-overview.md` — Product name, description, features
2. `/product/product-roadmap.md` — List of sections in order
3. `/product/data-shape/data-shape.md` (if exists)
4. `/product/design-system/colors.json` (if exists)
5. `/product/design-system/typography.json` (if exists)
6. `/product/shell/spec.md` (if exists)
7. For each section: `spec.md`, `data.json`, `types.ts`
8. List screen design components in `src/sections/` and `src/shell/`

## Step 3: Create Export Directory Structure

Create the `product-plan/` directory with this structure:

For **React** (TARGET_FRAMEWORK = react):

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary (always provide)
│
├── prompts/                     # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md       # Prompt for full implementation
│   └── section-prompt.md        # Prompt template for section-by-section
│
├── instructions/                # Implementation instructions
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # For milestone-by-milestone implementation
│       ├── 01-shell.md
│       ├── 02-[first-section].md
│       ├── 03-[second-section].md
│       └── ...
│
├── design-system/               # Design tokens
│   ├── tokens.css
│   ├── tailwind-colors.md
│   └── fonts.md
│
├── data-shapes/                 # UI data contracts
│   ├── README.md
│   └── overview.ts
│
├── shell/                       # Shell components
│   ├── README.md
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── screenshot.png (if exists)
│
└── sections/                    # Section components
    └── [section-id]/
        ├── README.md
        ├── tests.md               # UI behavior test specs
        ├── components/
        │   ├── [Component].tsx
        │   └── index.ts
        ├── types.ts
        ├── sample-data.json
        └── screenshot.png (if exists)
```

For **Laravel Livewire** (TARGET_FRAMEWORK = laravel):

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary (always provide)
│
├── prompts/                     # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md       # Prompt for full implementation
│   └── section-prompt.md        # Prompt template for section-by-section
│
├── instructions/                # Implementation instructions
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # For milestone-by-milestone implementation
│       ├── 01-shell.md
│       ├── 02-[first-section].md
│       ├── 03-[second-section].md
│       └── ...
│
├── design-system/               # Design tokens
│   ├── tokens.css
│   ├── tailwind-colors.md
│   └── fonts.md
│
├── data-shapes/                 # UI data contracts
│   ├── README.md
│   └── overview.php             # PHP type definitions
│
├── shell/                       # Shell components
│   ├── README.md
│   ├── livewire/                # Livewire component classes
│   │   ├── AppShell.php
│   │   ├── MainNav.php
│   │   └── UserMenu.php
│   ├── blade/                   # Blade views
│   │   ├── app-shell.blade.php
│   │   ├── main-nav.blade.php
│   │   └── user-menu.blade.php
│   └── screenshot.png (if exists)
│
└── sections/                    # Section components
    └── [section-id]/
        ├── README.md
        ├── tests.md               # UI behavior test specs
        ├── livewire/              # Livewire component classes
        │   ├── [ComponentName].php
        │   └── ...
        ├── blade/                 # Blade views
        │   ├── [component-name].blade.php
        │   └── ...
        ├── types.php              # PHP type definitions
        ├── sample-data.json
        └── screenshot.png (if exists)
```

## Step 4: Generate product-overview.md

Create `product-plan/product-overview.md`:

```markdown
# [Product Name] — Product Overview

## Summary

[Product description from product-overview.md]

## Planned Sections

[Ordered list of sections from roadmap with descriptions]

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
...

## Product Entities

[If data shape exists: list entity names and brief descriptions]
[If not: "Entities to be defined during implementation"]

## Design System

**Colors:**
- Primary: [color or "Not defined"]
- Secondary: [color or "Not defined"]
- Neutral: [color or "Not defined"]

**Typography:**
- Heading: [font or "Not defined"]
- Body: [font or "Not defined"]
- Mono: [font or "Not defined"]

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell
2. **[Section 1]** — [Brief description]
3. **[Section 2]** — [Brief description]
...

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

## Export Format

**Target Framework:** [React or Laravel Livewire]

[If Laravel Livewire:]
This export includes:
- **Livewire v4 component classes** — PHP classes with properties, actions, and lifecycle hooks
- **Blade templates** — Full-scope views with Tailwind CSS styling
- **PHP type definitions** — Data contracts as PHP interfaces/classes
- **Laravel 13+ conventions** — Using modern Laravel and Livewire best practices
```

## Step 5: Generate Milestone Instructions

Each milestone instruction file should begin with the following preamble (adapt the milestone-specific details):

**For React:**
```markdown
---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---
```

**For Laravel Livewire:**
```markdown
---

## About This Handoff

**What you're receiving:**
- Finished UI designs (Livewire v4 components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these Livewire components into your Laravel application
- Wire up actions and properties to your routes and business logic
- Replace sample data with real data from your backend/Eloquent models
- Implement loading, error, and empty states

The components follow Livewire conventions — they have public properties for data and methods for actions. How you architect the backend, data layer, and business logic is up to you.

---
```

### 01-shell.md

Place in `product-plan/instructions/incremental/01-shell.md`:

```markdown
# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

[Include the preamble above]

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

[If design tokens exist:]
Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

[If not:]
Define your own design tokens based on your brand guidelines.

### 2. Application Shell

[If shell exists:]

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

Connect navigation to your routing:

[List nav items from shell spec]

**User Menu:**

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

[If shell doesn't exist:]

Design and implement your own application shell with:
- Navigation for all sections
- User menu
- Responsive layout

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference

## Done When

- [ ] Design tokens are configured
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Responsive on mobile
```

### [NN]-[section-id].md (for each section)

Place in `product-plan/instructions/incremental/[NN]-[section-id].md` (starting at 02 for the first section):

```markdown
# Milestone [N]: [Section Title]

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, plus any prior section milestones

[Include the preamble above]

## Goal

Implement the [Section Title] feature — [brief description from roadmap].

## Overview

[One paragraph describing what this section enables users to do. Focus on the user's perspective and the value they get from this feature. Extract from spec.md overview.]

**Key Functionality:**
- [Bullet point 1 — e.g., "View a list of all projects with status indicators"]
- [Bullet point 2 — e.g., "Create new projects with name, description, and due date"]
- [Bullet point 3 — e.g., "Edit existing project details inline"]
- [Bullet point 4 — e.g., "Delete projects with confirmation"]
- [Bullet point 5 — e.g., "Filter projects by status or search by name"]

[List 3-6 key capabilities that the UI components support]

## Components Provided

Copy the section components from `product-plan/sections/[section-id]/components/`:

[List components with brief descriptions]

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

[Key types from types.ts — show the main interfaces briefly]

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onView` | User clicks to view details |
| `onEdit` | User clicks to edit |
| `onDelete` | User clicks to delete |
| `onCreate` | User clicks to create new |

[Adjust based on actual Props interface]

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: [Primary Flow Name — e.g., "Create a New Project"]

1. User [starting action — e.g., "clicks 'New Project' button"]
2. User [next step — e.g., "fills in project name and description"]
3. User [next step — e.g., "clicks 'Create' to save"]
4. **Outcome:** [Expected result — e.g., "New project appears in the list"]

### Flow 2: [Secondary Flow Name — e.g., "Edit an Existing Project"]

1. User [starting action — e.g., "clicks on a project row"]
2. User [next step — e.g., "modifies the project details"]
3. User [next step — e.g., "clicks 'Save' to confirm changes"]
4. **Outcome:** [Expected result — e.g., "Project updates in place"]

### Flow 3: [Additional Flow — e.g., "Delete a Project"]

1. User [starting action — e.g., "clicks delete icon on a project"]
2. User [next step — e.g., "confirms deletion in the modal"]
3. **Outcome:** [Expected result — e.g., "Project removed from list, empty state shown if last item"]

[Include 2-4 flows covering the main user journeys in this section. Reference the specific UI elements and button labels from the components.]

## Empty States

The components include empty state designs. Make sure to handle:

- **No data yet:** Show the empty state UI when the primary list/collection is empty
- **No related records:** Handle cases where associated records don't exist (e.g., a project with no tasks)
- **First-time experience:** Guide users to create their first item with clear CTAs

## Testing

See `product-plan/sections/[section-id]/tests.md` for UI behavior test specs covering:
- User flow success and failure paths
- Empty state rendering
- Component interactions and edge cases

## Files to Reference

- `product-plan/sections/[section-id]/README.md` — Feature overview and design intent
- `product-plan/sections/[section-id]/tests.md` — UI behavior test specs
- `product-plan/sections/[section-id]/components/` — React components
- `product-plan/sections/[section-id]/types.ts` — TypeScript interfaces
- `product-plan/sections/[section-id]/sample-data.json` — Test data
- `product-plan/sections/[section-id]/screenshot.png` — Visual reference

## Done When

- [ ] Components render with real data
- [ ] Empty states display properly when no records exist
- [ ] All callback props are wired to working functionality
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
```

### Laravel Livewire: 01-shell.md

For Laravel Livewire exports, replace the shell section with:

```markdown
# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

[Include the Laravel Livewire preamble]

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

[If design tokens exist:]
Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

[If not:]
Define your own design tokens based on your brand guidelines.

### 2. Application Shell

[If shell exists:]

Copy the shell Livewire components to your Laravel project:

**Livewire Classes:**
Copy from `product-plan/shell/livewire/` to `app/Livewire/`:
- `AppShell.php` — Main layout wrapper component
- `MainNav.php` — Navigation component
- `UserMenu.php` — User menu with avatar

**Blade Views:**
Copy from `product-plan/shell/blade/` to `resources/views/livewire/`:
- `app-shell.blade.php` — Main shell view
- `main-nav.blade.php` — Navigation view
- `user-menu.blade.php` — User menu view

**Wire Up Navigation:**

Connect navigation to your routes:

[List nav items from shell spec with example route names]

Example:
```php
// In MainNav.php
public function getNavItems(): array
{
    return [
        ['label' => 'Dashboard', 'route' => 'dashboard'],
        ['label' => 'Projects', 'route' => 'projects.index'],
        // ...
    ];
}
```

**User Menu:**

The user menu expects:
- Authenticated user's name
- Avatar URL (optional, from user model)
- Logout action (wire:click to logout method)

[If shell doesn't exist:]

Design and implement your own application shell with:
- Navigation for all sections using Laravel routing
- User menu with authentication integration
- Responsive layout using Tailwind CSS

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/livewire/` — Livewire component classes
- `product-plan/shell/blade/` — Blade views
- `product-plan/shell/screenshot.png` — Shell visual reference

## Done When

- [ ] Design tokens are configured
- [ ] Shell Livewire components render correctly
- [ ] Navigation links route to correct pages
- [ ] User menu shows authenticated user info
- [ ] Logout functionality works
- [ ] Responsive on mobile
```

### Laravel Livewire: [NN]-[section-id].md

For Laravel Livewire exports, replace the section instructions with:

```markdown
# Milestone [N]: [Section Title]

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, plus any prior section milestones

[Include the Laravel Livewire preamble]

## Goal

Implement the [Section Title] feature — [brief description from roadmap].

## Overview

[One paragraph describing what this section enables users to do. Focus on the user's perspective and the value they get from this feature. Extract from spec.md overview.]

**Key Functionality:**
- [Bullet point 1 — e.g., "View a list of all projects with status indicators"]
- [Bullet point 2 — e.g., "Create new projects with name, description, and due date"]
- [Bullet point 3 — e.g., "Edit existing project details inline"]
- [Bullet point 4 — e.g., "Delete projects with confirmation"]
- [Bullet point 5 — e.g., "Filter projects by status or search by name"]

[List 3-6 key capabilities that the UI components support]

## Components Provided

Copy the section Livewire components to your Laravel project:

**Livewire Classes:**
Copy from `product-plan/sections/[section-id]/livewire/` to `app/Livewire/[SectionId]/`:
[List component names with brief descriptions]

**Blade Views:**
Copy from `product-plan/sections/[section-id]/blade/` to `resources/views/livewire/[section-id]/`:
[List view names]

## Properties & Actions Reference

The Livewire components have these public properties (see `types.php` for full definitions):

**Data properties:**

[Key properties from types.php — show the main class properties briefly]

**Actions (methods):**

| Method | Triggered When |
|--------|---------------|
| `view($id)` | User clicks to view details |
| `edit($id)` | User clicks to edit |
| `delete($id)` | User clicks to delete |
| `create()` | User clicks to create new |

[Adjust based on actual component]

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: [Primary Flow Name — e.g., "Create a New Project"]

1. User [starting action — e.g., "clicks 'New Project' button"]
2. User [next step — e.g., "fills in project name and description"]
3. User [next step — e.g., "clicks 'Create' to save"]
4. **Outcome:** [Expected result — e.g., "New project appears in the list"]

### Flow 2: [Secondary Flow Name — e.g., "Edit an Existing Project"]

1. User [starting action — e.g., "clicks on a project row"]
2. User [next step — e.g., "modifies the project details"]
3. User [next step — e.g., "clicks 'Save' to confirm changes"]
4. **Outcome:** [Expected result — e.g., "Project updates in place"]

### Flow 3: [Additional Flow — e.g., "Delete a Project"]

1. User [starting action — e.g., "clicks delete icon on a project"]
2. User [next step — e.g., "confirms deletion in the modal"]
3. **Outcome:** [Expected result — e.g., "Project removed from list, empty state shown if last item"]

[Include 2-4 flows covering the main user journeys in this section. Reference the specific UI elements and button labels from the components.]

## Empty States

The components include empty state designs. Make sure to handle:

- **No data yet:** Show the empty state UI when the primary list/collection is empty
- **No related records:** Handle cases where associated records don't exist (e.g., a project with no tasks)
- **First-time experience:** Guide users to create their first item with clear CTAs

## Testing

See `product-plan/sections/[section-id]/tests.md` for UI behavior test specs covering:
- User flow success and failure paths
- Empty state rendering
- Component interactions and edge cases

## Files to Reference

- `product-plan/sections/[section-id]/README.md` — Feature overview and design intent
- `product-plan/sections/[section-id]/tests.md` — UI behavior test specs
- `product-plan/sections/[section-id]/livewire/` — Livewire component classes
- `product-plan/sections/[section-id]/blade/` — Blade views
- `product-plan/sections/[section-id]/types.php` — PHP type definitions
- `product-plan/sections/[section-id]/sample-data.json` — Test data
- `product-plan/sections/[section-id]/screenshot.png` — Visual reference

## Done When

- [ ] Livewire components render with real data from Eloquent
- [ ] Empty states display properly when no records exist
- [ ] All actions are wired to working functionality
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
- [ ] Uses Laravel validation and authorization where appropriate
```

## Step 6: Generate one-shot-instructions.md

Create `product-plan/instructions/one-shot-instructions.md` by combining all milestone content into a single document. Include the preamble at the very top:

```markdown
# [Product Name] — Complete Implementation Instructions

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

[Include product-overview.md content]

---

# Milestone 1: Shell

[Include 01-shell.md content WITHOUT the preamble — it's already at the top. This includes design tokens AND application shell.]

---

# Milestone 2: [First Section Name]

[Include first section handoff content WITHOUT the preamble]

---

# Milestone 3: [Second Section Name]

[Include second section handoff content WITHOUT the preamble]

[Repeat for all sections, incrementing milestone numbers]
```

## Step 7: Copy and Transform Components

### For React Exports

**Shell Components:**

Copy from `src/shell/components/` to `product-plan/shell/components/`:

- Transform import paths from `@/...` to relative paths
- Remove any Design OS-specific imports
- Ensure components are self-contained

**Section Components:**

For each section, copy from `src/sections/[section-id]/components/` to `product-plan/sections/[section-id]/components/`:

- Transform import paths:
  - `@/../product/sections/[section-id]/types` → `../types`
- Remove Design OS-specific imports
- Keep only the exportable components (not preview wrappers)

**Types Files:**

Copy `product/sections/[section-id]/types.ts` to `product-plan/sections/[section-id]/types.ts`

**Sample Data:**

Copy `product/sections/[section-id]/data.json` to `product-plan/sections/[section-id]/sample-data.json`

### For Laravel Livewire Exports

For Laravel Livewire exports, you need to **transform** the React screen designs into Livewire components. This is a more involved process than copying — you're generating new files based on the designs.

**Transform Process:**

For each React component in `src/sections/[section-id]/components/`, generate:

1. **Livewire Class** → `product-plan/sections/[section-id]/livewire/[ComponentName].php`
2. **Blade View** → `product-plan/sections/[section-id]/blade/[component-name].blade.php`
3. **PHP Types** → `product-plan/sections/[section-id]/types.php`

**Livewire Class Generation:**

For each screen design component, create a Livewire v4 class:

```php
<?php

namespace App\Livewire\[SectionId];

use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Layout('layouts.app')]
class [ComponentName] extends Component
{
    // Public properties for data (from types.ts interfaces)
    public array [entities] = [];
    public ?[EntityType] $selected[EntityType] = null;

    // State properties
    public bool $showModal = false;
    public string $search = '';
    public ?string $statusFilter = null;

    /**
     * Mount the component with initial data
     */
    public function mount(array $[entities] = []): void
    {
        $this->[entities] = $[entities];
    }

    /**
     * Render the Blade view
     */
    public function render()
    {
        return view('livewire.[section-id].[component-name]')
            ->layout('layouts.app');
    }

    // Actions (from React callback props)

    public function view([EntityType] $[entity]): void
    {
        $this->selected[EntityType] = $[entity];
        $this->showModal = true;
        // Or redirect: redirect()->route('[section].show', $[entity]->id);
    }

    public function edit([EntityType] $[entity]): void
    {
        redirect()->route('[section].edit', $[entity]->id);
    }

    public function delete([EntityType] $[entity]): void
    {
        $this->authorize('delete', $[entity]);
        $[entity]->delete();

        $this->[entities] = array_filter(
            $this->[entities],
            fn($e) => $e->id !== $[entity]->id
        );

        $this->dispatch('[entity]-deleted');
    }

    public function create(): void
    {
        redirect()->route('[section].create');
    }

    // Computed properties
    public function getFiltered[Entities]Property()
    {
        return collect($this->[entities])
            ->when($this->search, fn($q) => $q->filter(fn($e) => str_contains(strtolower($e->name), strtolower($this->search))))
            ->when($this->statusFilter, fn($q) => $q->where('status', $this->statusFilter))
            ->values()
            ->all();
    }
}
```

**Blade View Generation:**

Transform the React JSX into Blade syntax:

Key transformations:
- `className` → `class`
- `{variable}` → `{{ $variable }}` or `{{ $variable->property }}`
- `{condition && <Component />}` → `@if($condition) <x-component /> @endif`
- `{items.map(item => <Component />)}` → `@foreach($items as $item) <x-component /> @endforeach`
- `onClick={() => action()}` → `wire:click="action"`
- `wire:model` for form inputs
- Use `@props` at top of view for component props

Example Blade view structure:

```blade
<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    {{-- Header with actions --}}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                [Section Title]
            </h1>
            <button
                wire:click="create"
                class="px-4 py-2 bg-[primary]-600 hover:bg-[primary]-700 text-white rounded-lg"
            >
                Create New
            </button>
        </div>

        {{-- Search and filters --}}
        <div class="mt-6 flex gap-4">
            <input
                type="text"
                wire:model.live.debounce.300ms="search"
                placeholder="Search..."
                class="flex-1 rounded-lg border-gray-300 dark:border-gray-700"
            />
            <select wire:model.live="statusFilter" class="rounded-lg border-gray-300">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>

        {{-- Main content --}}
        <div class="mt-8">
            @if(count($this->filtered[Entities]) === 0)
                {{-- Empty state --}}
                <div class="text-center py-12">
                    <p class="text-gray-500 dark:text-gray-400">No [entities] yet</p>
                    <button wire:click="create" class="mt-4 text-[primary]-600 hover:text-[primary]-700">
                        Create your first [entity]
                    </button>
                </div>
            @else
                {{-- List/Grid of items --}}
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    @foreach($this->filtered[Entities] as $[entity])
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <h3 class="font-semibold text-gray-900 dark:text-white">
                                {{ $[entity]->name }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {{ $[entity]->description }}
                            </p>
                            <div class="mt-4 flex gap-2">
                                <button
                                    wire:click="view({{ $[entity]->id }})"
                                    class="text-[primary]-600 hover:text-[primary]-700 text-sm"
                                >
                                    View
                                </button>
                                <button
                                    wire:click="edit({{ $[entity]->id }})"
                                    class="text-gray-600 hover:text-gray-700 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    wire:click="delete({{ $[entity]->id }})"
                                    wire:confirm="Are you sure?"
                                    class="text-red-600 hover:text-red-700 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    {{-- Modal (if needed) --}}
    @if($showModal)
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
                {{-- Modal content --}}
                <button wire:click="$set('showModal', false)" class="absolute top-4 right-4">
                    <x-heroicon-o-x-mark class="w-5 h-5" />
                </button>
                {{-- Details here --}}
            </div>
        </div>
    @endif
</div>
```

**PHP Types Generation:**

Transform TypeScript interfaces to PHP classes/types:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * [Entity Name]
 *
 * [Description from TypeScript interface]
 */
class [Entity] extends Model
{
    // Properties (from TypeScript interface)
    // public int $id;
    // public string $name;
    // public ?string $description;
    // public string $status;
    // public \Carbon\Carbon $created_at;
    // public \Carbon\Carbon $updated_at;

    // Fillable attributes
    protected $fillable = [
        'name',
        'description',
        'status',
    ];

    // Casts
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
```

**Sample Data:**

Copy `product/sections/[section-id]/data.json` to `product-plan/sections/[section-id]/sample-data.json` (same as React)

## Step 8: Generate Section READMEs

### For React Exports

For each section, create `product-plan/sections/[section-id]/README.md`:

```markdown
# [Section Title]

## Overview

[From spec.md overview]

## User Flows

[From spec.md user flows]

## Design Decisions

[Notable design choices from the screen design]

## Data Shapes

**Entities:** [List entities from types.ts]

**From global entities:** [Which entities from data shape are used, if applicable]

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `[Component]` — [Brief description]
- `[SubComponent]` — [Brief description]

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onView` | User clicks to view details |
| `onEdit` | User clicks to edit |
| `onDelete` | User clicks to delete |
| `onCreate` | User clicks to create new |

[Adjust based on actual Props interface]
```

### For Laravel Livewire Exports

For each section, create `product-plan/sections/[section-id]/README.md`:

```markdown
# [Section Title]

## Overview

[From spec.md overview]

## User Flows

[From spec.md user flows]

## Design Decisions

[Notable design choices from the screen design]

## Data Shapes

**Entities:** [List entities from types.php]

**From global entities:** [Which entities from data shape are used, if applicable]

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

**Livewire Classes:**
- `[Component]` — Livewire component class
- `[SubComponent]` — Livewire sub-component (if applicable)

**Blade Views:**
- `[component-name].blade.php` — Main view
- `[sub-component].blade.php` — Sub-component view (if applicable)

## Properties & Actions

**Public Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `$[entities]` | `array` | List of [entities] to display |
| `$search` | `string` | Search query |
| `$statusFilter` | `?string` | Selected status filter |

**Actions (Methods):**

| Method | Parameters | Triggered When |
|--------|------------|---------------|
| `view()` | `[EntityType] $[entity]` | User clicks to view details |
| `edit()` | `[EntityType] $[entity]` | User clicks to edit |
| `delete()` | `[EntityType] $[entity]` | User clicks to delete |
| `create()` | none | User clicks to create new |

[Adjust based on actual component]
```

## Step 9: Generate Section Test Instructions

For each section, create `product-plan/sections/[section-id]/tests.md` with UI behavior test specs based on the section's spec, user flows, and UI design.

```markdown
# Test Specs: [Section Title]

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

[Brief description of what this section does and the key functionality to test]

---

## User Flow Tests

### Flow 1: [Primary User Flow Name]

**Scenario:** [Describe what the user is trying to accomplish]

#### Success Path

**Setup:**
- [Preconditions - what state the app should be in]
- [Sample data to use - reference types from types.ts]

**Steps:**
1. User navigates to [page/route]
2. User sees [specific UI element - be specific about labels, text]
3. User clicks [specific button/link with exact label]
4. User enters [specific data in specific field]
5. User clicks [submit button with exact label]

**Expected Results:**
- [ ] [Specific UI change - e.g., "Success message appears: 'Item created'"]
- [ ] [Data change - e.g., "New item appears in the list"]
- [ ] [State change - e.g., "Form is cleared and reset"]
- [ ] [Navigation - e.g., "User is redirected to /items/:id"]

#### Failure Path: [Specific Failure Scenario]

**Steps:**
1. [Same steps as success path, or modified steps]

**Expected Results:**
- [ ] [Error message - e.g., "Error message appears: 'Unable to save. Please try again.'"]
- [ ] [UI state - e.g., "Form data is preserved, not cleared"]

#### Failure Path: [Validation Error]

**Steps:**
1. User leaves [specific field] empty
2. User clicks [submit button]

**Expected Results:**
- [ ] [Validation message - e.g., "Field shows error: 'Name is required'"]
- [ ] [Form state - e.g., "Form is not submitted"]

---

### Flow 2: [Secondary User Flow Name]

[Repeat the same structure for additional flows]

---

## Empty State Tests

### Primary Empty State

**Scenario:** User has no [primary records] yet (first-time or all deleted)

**Setup:**
- [Primary data collection] is empty (`[]`)

**Expected Results:**
- [ ] [Empty state message is visible - e.g., "Shows heading 'No projects yet'"]
- [ ] [Helpful description - e.g., "Shows text 'Create your first project to get started'"]
- [ ] [Primary CTA is visible - e.g., "Shows button 'Create Project'"]
- [ ] [CTA is functional - e.g., "Clicking 'Create Project' opens the create form/modal"]

### Related Records Empty State

**Scenario:** A [parent record] exists but has no [child records] yet

**Setup:**
- [Parent record] exists with valid data
- [Child records collection] is empty (`[]`)

**Expected Results:**
- [ ] [Parent renders correctly with its data]
- [ ] [Child section shows empty state - e.g., "Shows 'No tasks yet' in the tasks panel"]
- [ ] [CTA to add child record - e.g., "Shows 'Add Task' button"]

---

## Component Interaction Tests

### [Component Name]

**Renders correctly:**
- [ ] [Specific element is visible - e.g., "Displays item title 'Sample Item'"]
- [ ] [Data display - e.g., "Shows formatted date 'Dec 12, 2025'"]

**User interactions:**
- [ ] [Click behavior - e.g., "Clicking 'Edit' button calls onEdit with item id"]
- [ ] [Hover behavior - e.g., "Hovering row shows action buttons"]
- [ ] [Keyboard - e.g., "Pressing Escape closes the modal"]

---

## Edge Cases

- [ ] [Edge case 1 - e.g., "Handles very long item names with text truncation"]
- [ ] [Edge case 2 - e.g., "Works correctly with 1 item and 100+ items"]
- [ ] [Edge case 3 - e.g., "Preserves data when navigating away and back"]
- [ ] [Transition from empty to populated - e.g., "After creating first item, list renders correctly"]
- [ ] [Transition from populated to empty - e.g., "After deleting last item, empty state appears"]

---

## Accessibility Checks

- [ ] [All interactive elements are keyboard accessible]
- [ ] [Form fields have associated labels]
- [ ] [Error messages are announced to screen readers]
- [ ] [Focus is managed appropriately after actions]

---

## Sample Test Data

Use the data from `sample-data.json` or create variations:

[Include 2-3 example data objects based on types.ts that tests can use]

```typescript
// Populated state
const mockItem = {
  id: "test-1",
  name: "Test Item",
  // ... other fields from types.ts
};

const mockItems = [mockItem, /* ... more items */];

// Empty states
const mockEmptyList = [];

const mockItemWithNoChildren = {
  id: "test-1",
  name: "Test Item",
  children: [],
};
```
```

### Guidelines for Writing tests.md

When generating tests.md for each section:

1. **Read the spec.md thoroughly** — Extract all user flows and requirements
2. **Study the screen design components** — Note exact button labels, field names, UI text
3. **Review types.ts** — Understand the data shapes for assertions
4. **Include specific UI text** — Tests should verify exact labels, messages, placeholders
5. **Cover success and failure paths** — Every action should have both tested
6. **Always test empty states** — Primary lists with no items, parent records with no children
7. **Be specific about assertions** — "Shows error" is too vague; "Shows red border and message 'Email is required' below the field" is specific
8. **Include edge cases** — Boundary conditions, transitions between empty and populated states
9. **Stay framework-agnostic** — Describe WHAT to test (UI behavior), not HOW to write the test code

## Step 10: Generate Design System Files

### tokens.css

```css
/* Design Tokens for [Product Name] */

:root {
  /* Colors */
  --color-primary: [Tailwind color];
  --color-secondary: [Tailwind color];
  --color-neutral: [Tailwind color];

  /* Typography */
  --font-heading: '[Heading Font]', sans-serif;
  --font-body: '[Body Font]', sans-serif;
  --font-mono: '[Mono Font]', monospace;
}
```

### tailwind-colors.md

```markdown
# Tailwind Color Configuration

## Color Choices

- **Primary:** `[color]` — Used for buttons, links, key accents
- **Secondary:** `[color]` — Used for tags, highlights, secondary elements
- **Neutral:** `[color]` — Used for backgrounds, text, borders

## Usage Examples

Primary button: `bg-[primary]-600 hover:bg-[primary]-700 text-white`
Secondary badge: `bg-[secondary]-100 text-[secondary]-800`
Neutral text: `text-[neutral]-600 dark:text-[neutral]-400`
```

### fonts.md

```markdown
# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[Heading+Font]&family=[Body+Font]&family=[Mono+Font]&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** [Heading Font]
- **Body text:** [Body Font]
- **Code/technical:** [Mono Font]
```

## Step 11: Generate Data Shapes Files

### data-shapes/README.md

Create `product-plan/data-shapes/README.md`:

```markdown
# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

[List all entities across sections with brief descriptions]

- **[Entity1]** — [Description] (used in: [section-name])
- **[Entity2]** — [Description] (used in: [section-name])
- **[Entity3]** — [Description] (used in: [section-name-1], [section-name-2])

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/[section-1]/types.ts`
- `sections/[section-2]/types.ts`
- ...

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
```

### data-shapes/overview.ts

Create `product-plan/data-shapes/overview.ts` by aggregating all section types:

```typescript
// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/[section-1]
// -----------------------------------------------------------------------------

[Copy entity types from section-1/types.ts — data interfaces only, not Props]

// -----------------------------------------------------------------------------
// From: sections/[section-2]
// -----------------------------------------------------------------------------

[Copy entity types from section-2/types.ts — data interfaces only, not Props]

// [Repeat for all sections]
```

Only include the data shape interfaces (e.g., `Invoice`, `LineItem`), not the component Props interfaces. The Props interfaces stay in each section's own `types.ts`.

### data-shapes/overview.php (For Laravel Livewire)

For Laravel Livewire exports, create `product-plan/data-shapes/overview.php`:

```php
<?php

// =============================================================================
// UI Data Shapes — Combined Reference
//
// These classes define the data that Livewire components expect to work with.
// They represent the UI data contracts, not database schemas. How you model,
// store, and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/[section-1]
// -----------------------------------------------------------------------------

/**
 * [Entity Name]
 *
 * [Description from TypeScript interface]
 */
class [Entity]
{
    public int $id;
    public string $name;
    public ?string $description;
    public string $status;
    public \Carbon\Carbon $created_at;
    public \Carbon\Carbon $updated_at;

    public function __construct(array $attributes = [])
    {
        $this->id = $attributes['id'] ?? null;
        $this->name = $attributes['name'] ?? '';
        $this->description = $attributes['description'] ?? null;
        $this->status = $attributes['status'] ?? 'draft';
        $this->created_at = $attributes['created_at'] ?? now();
        $this->updated_at = $attributes['updated_at'] ?? now();
    }
}

// -----------------------------------------------------------------------------
// From: sections/[section-2]
// -----------------------------------------------------------------------------

// [Repeat for all sections]
```

Only include the data shape classes (e.g., `Invoice`, `LineItem`), not the Livewire component classes. The component classes stay in each section's own `livewire/` folder.

## Step 12: Generate Prompt Files

Create the `product-plan/prompts/` directory with two ready-to-use prompt files.

### one-shot-prompt.md

Create `product-plan/prompts/one-shot-prompt.md`:

**For React:**
```markdown
# One-Shot Implementation Prompt

I need you to implement a complete web application based on detailed UI designs and product specifications I'm providing.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary with sections and entity overview
2. **@product-plan/instructions/one-shot-instructions.md** — Complete implementation instructions for all milestones

After reading these, also review:
- **@product-plan/design-system/** — Color and typography tokens
- **@product-plan/data-shapes/** — UI data contracts (the shapes of data the components expect)
- **@product-plan/shell/** — Application shell components
- **@product-plan/sections/** — All section components with types, sample data, and test specs

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **My tech stack** — What framework, language, and tools I'm using, and any existing codebase conventions
2. **Authentication & users** — How users should sign up, log in, and what permissions exist
3. **Product requirements** — Anything in the specs or user flows that needs clarification
4. **Anything else** — Whatever you need to know before implementing

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding.
```

**For Laravel Livewire:**
```markdown
# One-Shot Implementation Prompt (Laravel Livewire)

I need you to implement a complete Laravel web application with Livewire v4 components based on detailed UI designs and product specifications I'm providing.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary with sections and entity overview
2. **@product-plan/instructions/one-shot-instructions.md** — Complete implementation instructions for all milestones (Laravel Livewire version)

After reading these, also review:
- **@product-plan/design-system/** — Color and typography tokens
- **@product-plan/data-shapes/** — UI data contracts (PHP classes the Livewire components work with)
- **@product-plan/shell/** — Application shell Livewire components and Blade views
- **@product-plan/sections/** — All section Livewire components, Blade views, PHP types, sample data, and test specs

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **My Laravel setup** — Laravel version (should be 13+), existing codebase, database choice (MySQL, PostgreSQL, SQLite), and any conventions
2. **Livewire configuration** — Any existing Livewire setup, layout preferences, and component naming conventions
3. **Authentication & users** — How users should sign up, log in (Breeze, Jetstream, Fortify, custom), and what permissions/authorization exist
4. **Eloquent models** — Whether models already exist or need to be created, and any relationships to consider
5. **Product requirements** — Anything in the specs or user flows that needs clarification

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding. The plan should include:

1. Migration files for database tables
2. Eloquent model classes with relationships
3. Livewire component classes (already provided, but may need adjustment)
4. Blade view integration
5. Route definitions
6. Controllers (if needed beyond Livewire)
7. Authorization policies
8. Validation rules
9. Testing setup (PHPUnit/Pest)
```

### section-prompt.md

Create `product-plan/prompts/section-prompt.md`:

**For React:**
```markdown
# Section Implementation Prompt

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Invoices" or "Project Dashboard"]
- **SECTION_ID** = [Folder name in sections/, e.g., "invoices" or "project-dashboard"]
- **NN** = [Milestone number, e.g., "02" or "03" — sections start at 02 since 01 is Shell]

---

I need you to implement the **SECTION_NAME** section of my application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — UI behavior test specs
- **@product-plan/sections/SECTION_ID/components/** — React components to integrate
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **Integration** — How this section connects to existing features and any APIs already built
2. **Product requirements** — Anything in the specs or user flows that needs clarification
3. **Anything else** — Whatever you need to know before implementing

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, proceed with implementation.
```

**For Laravel Livewire:**
```markdown
# Section Implementation Prompt (Laravel Livewire)

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Invoices" or "Project Dashboard"]
- **SECTION_ID** = [Folder name in sections/, e.g., "invoices" or "project-dashboard"]
- **NN** = [Milestone number, e.g., "02" or "03" — sections start at 02 since 01 is Shell]

---

I need you to implement the **SECTION_NAME** section of my Laravel application using Livewire v4.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section (Laravel Livewire version)

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — UI behavior test specs
- **@product-plan/sections/SECTION_ID/livewire/** — Livewire component classes
- **@product-plan/sections/SECTION_ID/blade/** — Blade views
- **@product-plan/sections/SECTION_ID/types.php** — PHP type definitions
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **Integration** — How this section connects to existing features, routes, and Eloquent models
2. **Eloquent models** — Whether the models already exist or need to be created with relationships
3. **Authorization** — What policies or gates need to be in place for CRUD operations
4. **Validation** — Any existing validation patterns or rules to follow
5. **Product requirements** — Anything in the specs or user flows that needs clarification

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, proceed with implementation. The implementation should include:

1. Migration for database tables (if not already created)
2. Eloquent model with relationships
3. Livewire component integration with real data
4. Blade view rendering with proper data binding
5. Route definitions
6. Authorization policies
7. Form validation
8. Tests (PHPUnit/Pest) based on the test specs
```

## Step 13: Generate README.md

Create `product-plan/README.md`:

**For React:**
```markdown
# [Product Name] — Design Handoff

This folder contains everything needed to implement [Product Name].

## What's Included

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt template for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section implementation

**Instructions:**
- `product-overview.md` — Product summary (always provide with every implementation)
- `instructions/one-shot-instructions.md` — All milestones combined for full implementation
- `instructions/incremental/` — Milestone-by-milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, design tokens
- `data-shapes/` — UI data contracts (the shapes of data components expect)
- `shell/` — Application shell components
- `sections/` — All section components, types, sample data, and test specs

## How to Use This

### Option A: Incremental (Recommended)

Build your app milestone by milestone for better control:

1. Copy the `product-plan/` folder to your codebase
2. Start with Shell (`instructions/incremental/01-shell.md`) — includes design tokens and application shell
3. For each section:
   - Open `prompts/section-prompt.md`
   - Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
   - Copy/paste into your coding agent
   - Answer questions and implement
4. Review and test after each milestone

### Option B: One-Shot

Build the entire app in one session:

1. Copy the `product-plan/` folder to your codebase
2. Open `prompts/one-shot-prompt.md`
3. Add any additional notes to the prompt
4. Copy/paste the prompt into your coding agent
5. Answer the agent's clarifying questions about your tech stack and requirements
6. Let the agent plan and implement everything

## Testing

Each section includes a `tests.md` file with UI behavior test specs. For best results:

1. Read `sections/[section-id]/tests.md` before implementing
2. Write tests for key user flows
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test specs are **framework-agnostic** — they describe WHAT to test (user-facing behavior), not HOW. Adapt to your testing setup.

## Tips

- **Use the pre-written prompts** — They prompt for important clarifying questions about your tech stack and requirements.
- **Add your own notes** — Customize prompts with project-specific context when needed.
- **Build on your designs** — Use completed sections as the starting point for future feature development.
- **Review thoroughly** — Check plans and implementations carefully to catch details and inconsistencies.
- **The components are flexible** — They accept data and fire callbacks. How you architect the backend is up to you.

---

*Generated by Design OS*
```

**For Laravel Livewire:**
```markdown
# [Product Name] — Laravel Livewire Handoff

This folder contains everything needed to implement [Product Name] as a Laravel application with Livewire v4 components.

## What's Included

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full Laravel + Livewire implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section implementation

**Instructions:**
- `product-overview.md` — Product summary (always provide with every implementation)
- `instructions/one-shot-instructions.md` — All milestones combined for full implementation
- `instructions/incremental/` — Milestone-by-milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, design tokens
- `data-shapes/` — UI data contracts (PHP classes)
- `shell/` — Application shell Livewire components and Blade views
- `sections/` — All section Livewire components, Blade views, PHP types, sample data, and test specs

## Prerequisites

- Laravel 13+
- PHP 8.2+
- Livewire v4
- Tailwind CSS v4
- MySQL, PostgreSQL, or SQLite

## How to Use This

### Option A: Incremental (Recommended)

Build your Laravel application milestone by milestone:

1. Copy the `product-plan/` folder to your Laravel project root
2. Start with Shell (`instructions/incremental/01-shell.md`) — includes design tokens and application shell
3. For each section:
   - Open `prompts/section-prompt.md`
   - Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
   - Copy/paste into your coding agent
   - Answer questions about Eloquent models, routes, and authorization
   - Implement and test
4. Run migrations after each milestone: `php artisan migrate`
5. Review and test after each milestone

### Option B: One-Shot

Build the entire Laravel application in one session:

1. Copy the `product-plan/` folder to your Laravel project root
2. Open `prompts/one-shot-prompt.md`
3. Add any additional notes about your setup
4. Copy/paste the prompt into your coding agent
5. Answer the agent's clarifying questions about:
   - Laravel version and existing setup
   - Database choice and existing migrations
   - Authentication (Breeze, Jetstream, Fortify, or custom)
   - Authorization patterns
6. Let the agent plan and implement everything
7. Run migrations: `php artisan migrate`
8. Test the full application

## Testing

Each section includes a `tests.md` file with UI behavior test specs. For best results:

1. Read `sections/[section-id]/tests.md` before implementing
2. Write Pest or PHPUnit tests for key user flows
3. Implement the Livewire component to make tests pass
4. Refactor while keeping tests green

The test specs are **framework-agnostic** — they describe WHAT to test (user-facing behavior), not HOW. Adapt to Pest or PHPUnit.

Example test structure:
```php
it('can create a new project', function () {
    Livewire::test(CreateProject::class)
        ->set('name', 'Test Project')
        ->call('create')
        ->assertRedirect(route('projects.show', Project::first()));
});
```

## Livewire Component Structure

Each section includes:

**Livewire Classes** (`app/Livewire/[SectionId]/`):
- Component class with public properties for data
- Actions as methods (view, edit, delete, create)
- Computed properties for filtered/sorted data

**Blade Views** (`resources/views/livewire/[section-id]/`):
- Full-scope views with Tailwind CSS
- wire:click for actions
- wire:model for form inputs
- @foreach and @if for conditionals

## Tips

- **Use the pre-written prompts** — They prompt for important clarifying questions about your Laravel setup.
- **Add your own notes** — Customize prompts with project-specific context.
- **Run migrations** — Always run `php artisan migrate` after new migrations are created.
- **Check authorization** — Ensure policies are registered and working.
- **Test thoroughly** — Use the test specs to write comprehensive Pest/PHPUnit tests.
- **Livewire is flexible** — Components accept data through public properties and handle actions through methods. How you architect Eloquent relationships and business logic is up to you.

---

*Generated by Design OS*
```

## Step 14: Copy Screenshots

Copy any `.png` files from:
- `product/shell/` → `product-plan/shell/`
- `product/sections/[section-id]/` → `product-plan/sections/[section-id]/`

## Step 15: Create Zip File

After generating all the export files, create a zip archive of the product-plan folder:

```bash
# Remove any existing zip file
rm -f product-plan.zip

# Create the zip file
cd . && zip -r product-plan.zip product-plan/
```

This creates `product-plan.zip` in the project root, which will be available for download on the Export page.

## Step 16: Confirm Completion

Let the user know:

**For React:**
"I've created the complete export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Instructions:**
- `product-overview.md` — Product summary (always provide with instructions)
- `instructions/one-shot-instructions.md` — All milestones combined
- `instructions/incremental/` — [N] milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-shapes/` — UI data contracts and combined type reference
- `shell/` — Application shell components
- `sections/` — [N] section component packages with test specs

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your implementation codebase
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about your tech stack, auth, etc.
5. Let the agent implement based on the instructions

The components are props-based and portable — they accept data and callbacks, letting your implementation agent handle routing, data fetching, and state management however fits your stack."

**For Laravel Livewire:**
"I've created the complete Laravel Livewire export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full Laravel + Livewire implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Instructions:**
- `product-overview.md` — Product summary (always provide with instructions)
- `instructions/one-shot-instructions.md` — All milestones combined (Laravel version)
- `instructions/incremental/` — [N] milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-shapes/` — PHP data contracts and combined type reference
- `shell/` — Application shell Livewire components and Blade views
- `sections/` — [N] section Livewire component packages with test specs

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your Laravel 13+ project root
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes about your setup, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about:
   - Laravel version and existing setup
   - Database and migrations
   - Authentication (Breeze, Jetstream, Fortify, or custom)
   - Authorization policies
5. Let the agent implement based on the instructions
6. Run migrations: `php artisan migrate`

The Livewire components follow Laravel conventions — they have public properties for data and methods for actions. How you architect Eloquent relationships, business logic, and authorization is up to you."

## Important Notes

**For React:**
- Always transform import paths when copying components
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important clarifying questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real APIs are built
- The export is self-contained — no dependencies on Design OS
- Components are portable — they work with any React setup

**For Laravel Livewire:**
- Transform React components to Livewire classes and Blade views
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important Laravel-specific questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real Eloquent models are wired up
- The export is self-contained — no dependencies on Design OS
- Livewire components are portable — they work with any Laravel 13+ setup
- Remember to run migrations after each milestone: `php artisan migrate`
- Register any new policies in `AuthServiceProvider`
