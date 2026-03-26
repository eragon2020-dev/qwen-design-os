# Generate Product for React

This command generates a complete React export package automatically, without asking for framework selection.

## Prerequisites Check

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

If required files are missing:

"To generate your React product, you need at minimum:
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

Continuing with React generation without these..."

## Execute Export with React Target

Execute the full export process from `/export-product` with the following pre-configured settings:

**TARGET_FRAMEWORK = react**

This means:
- Generate portable React components with props-based API
- Generate TypeScript type definitions
- Generate React-specific instructions and prompts
- Create React handoff documentation

## Generate All Export Files

Follow all steps from the `/export-product` command for React:

1. **Create Directory Structure** — React format
2. **Generate product-overview.md** — With React export format section
3. **Generate Milestone Instructions** — React-specific shell and section instructions
4. **Generate one-shot-instructions.md** — Combined milestones with React preamble
5. **Copy Components** — Transform import paths and remove Design OS-specific imports
6. **Generate Section READMEs** — React format with callback props
7. **Generate Test Instructions** — Framework-agnostic test specs
8. **Generate Design System Files** — tokens.css, tailwind-colors.md, fonts.md
9. **Generate Data Shapes** — overview.ts with TypeScript interfaces
10. **Generate Prompt Files** — React one-shot and section prompts
11. **Generate README.md** — React handoff guide
12. **Copy Screenshots** — From product/ to product-plan/
13. **Create Zip File** — product-plan.zip

## Confirm Completion

Let the user know:

"I've generated the complete **React** export package at `product-plan/` and `product-plan.zip`.

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

## Important Notes

- Always transform import paths when copying components
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important clarifying questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real APIs are built
- The export is self-contained — no dependencies on Design OS
- Components are portable — they work with any React setup
