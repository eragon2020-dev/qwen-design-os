# Export

When your designs are complete, export everything your implementation agent (or team) needs to build the product.

## When to Export

You're ready to export when:

- Product vision and roadmap are defined
- At least one section has screen designs
- You're satisfied with the design direction

You can export at any point—it doesn't have to be "complete." Exporting generates a snapshot of your current designs. You can always export again later as you add more sections.

## Running the Export

```
/export-product
```

The export command:

1. **Checks prerequisites** — Verifies required files exist
2. **Gathers all design assets** — Components, types, data, tokens
3. **Generates implementation instructions** — Including ready-to-use prompts
4. **Generates test instructions** — TDD specs for each section
5. **Creates the export package** — A complete `product-plan/` directory
6. **Creates a zip file** — `product-plan.zip` for easy download

## What's Included

### Ready-to-Use Prompts

```
product-plan/prompts/
├── one-shot-prompt.md     # Prompt for full implementation
└── section-prompt.md      # Prompt template for section-by-section
```

These are pre-written prompts you copy/paste into your coding agent. They reference the instruction files and guide your agent to review the designs and ask clarifying questions before implementing.

### Instructions

```
product-plan/
├── product-overview.md              # Product summary (always provide)
└── instructions/
    ├── one-shot-instructions.md     # All milestones combined
    └── incremental/                 # Milestone-by-milestone implementation
        ├── 01-shell.md              # Design tokens + application shell
        ├── 02-[section-id].md        # One per section (e.g., 02-invoices.md)
        └── ...
```

**product-overview.md** provides context about the full product—always include it with any implementation session.

**one-shot-instructions.md** combines all milestones into a single document. Use this with `one-shot-prompt.md` for full implementation.

**Incremental instructions** break the work into milestones. Use these with `section-prompt.md` for step-by-step implementation.

### Design System

```
product-plan/design-system/
├── tokens.css           # CSS custom properties
├── tailwind-colors.md   # Tailwind configuration guide
└── fonts.md             # Google Fonts setup
```

### Data Shapes

```
product-plan/data-shapes/
├── README.md            # UI data contracts overview
└── overview.ts          # Combined type reference (all sections)
```

### Shell Components

```
product-plan/shell/
├── README.md            # Design intent
├── components/
│   ├── AppShell.tsx     # Main layout wrapper
│   ├── MainNav.tsx      # Navigation
│   ├── UserMenu.tsx     # User menu
│   └── index.ts         # Exports
└── screenshot.png       # Visual reference (if captured)
```

### Section Components

For each section:

```
product-plan/sections/[section-id]/
├── README.md            # Feature overview, user flows
├── tests.md             # UI behavior test specs
├── components/
│   ├── [Component].tsx  # Exportable components
│   └── index.ts         # Exports
├── types.ts             # TypeScript interfaces
├── sample-data.json     # Test data
└── screenshot.png       # Visual reference (if captured)
```

### Test Instructions

Each section includes a `tests.md` file with framework-agnostic test-writing instructions:

- **User flow tests** — Success and failure paths for key interactions
- **Empty state tests** — Verifying UI when no records exist
- **Component interaction tests** — Specific UI elements and behaviors to verify

These instructions describe WHAT to test, not HOW—your coding agent adapts them to your test framework (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

## About the Components

Exported components are:

- **Props-based** — Accept data and callbacks via props, never import data directly
- **Portable** — Work with any React setup, no Design OS dependencies
- **Complete** — Full styling, responsive design, dark mode support
- **Production-ready** — Not prototypes or mockups

```tsx
// Components expect data and callbacks as props
<InvoiceList
  invoices={data}
  onView={(id) => navigate(`/invoices/${id}`)}
  onEdit={(id) => navigate(`/invoices/${id}/edit`)}
  onDelete={(id) => confirmDelete(id)}
  onCreate={() => navigate('/invoices/new')}
/>
```

Your implementation agent's job is to:
- Wire up callbacks to routing and API calls
- Replace sample data with real data from your backend
- Implement proper error handling and loading states
- Implement empty states when no records exist (first-time users, after deletions)
- Build the backend APIs the components need
- Write tests based on the provided test instructions (TDD approach)

## Using the Export

See [Codebase Implementation](codebase-implementation.md) for detailed guidance on implementing your design in your codebase.

## Quick Start: Generate a Production-Ready App

Instead of manually implementing from the export package, you can use the **Generate Product** commands to automatically create a complete, production-grade Laravel application with Laravel Boost for AI-assisted development.

### Available Generate Commands

**For Laravel with Laravel Boost (Recommended):**
```
/generate-product-laravel-boost
```
Creates a new Laravel application with Laravel Boost MCP server for AI-assisted development. Perfect for starting fresh with AI tooling built-in.

**For Laravel Livewire:**
```
/generate-product-livewire
```
Generates a complete Laravel Livewire v4 export package with Blade components and Livewire classes.

**For Laravel Inertia 3:**
```
/generate-product-inertia-react    # React frontend
/generate-product-inertia-vue      # Vue 3 frontend
/generate-product-inertia-svelte   # Svelte frontend
```
Generates a full-stack Laravel Inertia 3 application with your chosen frontend framework.

**For React (Portable):**
```
/generate-product-react
```
Generates portable React components with props-based API for any React setup.

### How Generate Commands Work

1. **Run the command** — e.g., `/generate-product-laravel-boost`
2. **Provide app name** — Enter your desired application name (e.g., `my-saas`, `blog-platform`)
3. **Automatic setup** — The command:
   - Creates the Laravel application in your current directory
   - Installs all dependencies (Composer, npm)
   - Configures Laravel Boost MCP server (for AI assistance)
   - Sets up environment and database
   - Runs initial migrations
4. **Start building** — Your AI assistant (with Laravel Boost) can now implement features from your export package

### Using Laravel Boost

Laravel Boost is an officially maintained MCP server that provides intelligent assistance for Laravel applications:

**What it does:**
- Intelligent Artisan commands via AI
- Eloquent model and relationship generation
- Route and controller setup
- Migration creation with proper schema
- Context-aware Laravel code generation

**Setup:**
1. After running `/generate-product-laravel-boost`, the MCP server is configured
2. Add to your AI assistant's MCP configuration:
```json
{
  "mcpServers": {
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"],
      "cwd": "/path/to/your/app-name"
    }
  }
}
```
3. Restart your AI assistant
4. Start building: "Create a migration for posts table with title, content, and published_at columns"

**Benefits:**
- AI understands your Laravel app structure
- Generates code following Laravel conventions
- Automates repetitive Artisan commands
- Provides intelligent suggestions for Eloquent, migrations, routing

### Next Steps After Generation

1. **Copy export files** — Move `product-plan/` contents to your new Laravel app
2. **Open prompts** — Use `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. **Add notes** — Include any project-specific requirements
4. **Prompt your AI assistant** — Copy/paste into your AI coding agent
5. **Answer questions** — Your agent will ask about auth, database, policies
6. **Let it build** — Laravel Boost assists with Laravel-specific implementation

See [Codebase Implementation](codebase-implementation.md) for more details on implementation approaches and best practices.
