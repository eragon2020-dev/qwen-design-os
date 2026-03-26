# Generate Product for Laravel Livewire

This command generates a complete Laravel Livewire v4 export package automatically, without asking for framework selection.

## Prerequisites Check

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

If required files are missing:

"To generate your Laravel Livewire product, you need at minimum:
- A product overview (`/product-vision`)
- A roadmap with sections (`/product-roadmap`)
- At least one section with screen designs

Please complete these first using `/product-vision`, `/product-roadmap`, and `/design-screen` commands."

Stop here if required files are missing.

## Show Warning for Missing Recommended Items

If recommended files are missing, show warnings but continue:

"Note: Some recommended items are missing:
- [ ] Product entities — Run `/data-shape` for consistent entity naming
- [ ] Design tokens — Run `/design-tokens` for consistent styling
- [ ] Application shell — Run `/design-shell` for navigation structure

Continuing with Laravel Livewire generation without these..."

## Execute Export with Livewire Target

Execute the full export process from `/export-product` with the following pre-configured settings:

**TARGET_FRAMEWORK = laravel**

This means:
- Generate Livewire v4 component classes
- Generate Blade views
- Generate PHP type definitions
- Generate Laravel-specific instructions and prompts
- Create Laravel Livewire handoff documentation

## Generate All Export Files

Follow all steps from the `/export-product` command for Laravel Livewire:

1. **Create Directory Structure** — Laravel Livewire format
2. **Generate product-overview.md** — With Livewire export format section
3. **Generate Milestone Instructions** — Livewire-specific shell and section instructions
4. **Generate one-shot-instructions.md** — Combined milestones with Livewire preamble
5. **Transform Components** — Generate Livewire classes and Blade views from React screen designs
6. **Generate Section READMEs** — Livewire format with properties and actions
7. **Generate Test Instructions** — Framework-agnostic test specs
8. **Generate Design System Files** — tokens.css, tailwind-colors.md, fonts.md
9. **Generate Data Shapes** — overview.php with PHP classes
10. **Generate Prompt Files** — Laravel Livewire one-shot and section prompts
11. **Generate README.md** — Laravel Livewire handoff guide
12. **Copy Screenshots** — From product/ to product-plan/
13. **Create Zip File** — product-plan.zip

## Confirm Completion

Let the user know:

"I've generated the complete **Laravel Livewire** export package at `product-plan/` and `product-plan.zip`.

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

- Transform React components to Livewire classes and Blade views
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important Laravel-specific questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real Eloquent models are wired up
- The export is self-contained — no dependencies on Design OS
- Livewire components are portable — they work with any Laravel 13+ setup
- Remember to run migrations after each milestone: `php artisan migrate`
- Register any new policies in `AuthServiceProvider`
