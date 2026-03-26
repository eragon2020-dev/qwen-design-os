# Generate Product for Laravel Inertia 3 with Vue 3

This command generates a complete Laravel Inertia 3 export package with Vue 3 frontend automatically, without asking for framework selection.

## Prerequisites Check

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

If required files are missing:

"To generate your Laravel Inertia Vue product, you need at minimum:
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

Continuing with Laravel Inertia Vue generation without these..."

## Execute Export with Inertia Vue Target

Execute the full export process from `/export-product` with the following pre-configured settings:

**TARGET_FRAMEWORK = inertia**
**INERTIA_FRONTEND = vue**

This means:
- Generate Laravel RESTful controllers
- Generate Inertia page components with Vue 3 Composition API
- Generate reusable Vue components
- Generate TypeScript type definitions
- Generate Laravel Inertia-specific instructions and prompts
- Create Laravel Inertia Vue handoff documentation

## Generate All Export Files

Follow all steps from the `/export-product` command for Laravel Inertia 3 with Vue:

1. **Create Directory Structure** — Laravel Inertia format
2. **Generate product-overview.md** — With Inertia Vue export format section
3. **Generate Milestone Instructions** — Inertia-specific shell and section instructions
4. **Generate one-shot-instructions.md** — Combined milestones with Inertia preamble
5. **Transform Components** — Generate controllers and Vue page components from React screen designs
6. **Generate Section READMEs** — Inertia format with props and controller methods
7. **Generate Test Instructions** — Framework-agnostic test specs
8. **Generate Design System Files** — tokens.css, tailwind-colors.md, fonts.md
9. **Generate Data Shapes** — overview.ts with TypeScript interfaces
10. **Generate Prompt Files** — Laravel Inertia Vue one-shot and section prompts
11. **Generate README.md** — Laravel Inertia Vue handoff guide
12. **Copy Screenshots** — From product/ to product-plan/
13. **Create Zip File** — product-plan.zip

## Confirm Completion

Let the user know:

"I've generated the complete **Laravel Inertia 3 with Vue 3** export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full Laravel + Inertia implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Instructions:**
- `product-overview.md` — Product summary (always provide with instructions)
- `instructions/one-shot-instructions.md` — All milestones combined (Laravel Inertia version)
- `instructions/incremental/` — [N] milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-shapes/` — TypeScript data contracts and type reference
- `shell/` — Inertia layout components (Vue)
- `sections/` — [N] section packages with controllers, Inertia pages (Vue), components, and test specs

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your Laravel 13+ project root
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes about your setup, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about:
   - Laravel version and existing setup
   - Vue 3 + Vite configuration
   - Database and migrations
   - Authentication (Breeze, Jetstream, Fortify, or custom)
   - Authorization policies
5. Let the agent implement based on the instructions
6. Run migrations: `php artisan migrate`
7. Install dependencies: `npm install`
8. Build assets: `npm run build` or `npm run dev`

The Inertia pages follow Laravel conventions — controllers return `Inertia::render()` with props, and pages receive data through props. Vue 3 components use Composition API with `<script setup>` syntax. How you architect Eloquent relationships, business logic, and authorization is up to you."

## Important Notes

- Transform React components to Inertia pages and Laravel controllers
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important Laravel and Vue questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real Eloquent models are wired up
- The export is self-contained — no dependencies on Design OS
- Inertia pages are portable — they work with any Laravel 13+ + Inertia v3 + Vue 3 setup
- Remember to run migrations after each milestone: `php artisan migrate`
- Build assets after adding components: `npm run build` or `npm run dev`
- Register any new policies in `AuthServiceProvider`
- Use TypeScript types from `types.ts` for consistent Vue typing
