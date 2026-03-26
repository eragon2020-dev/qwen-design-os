# Design OS for Qwen — Getting Started Guide

A step-by-step guide to using Design OS with Qwen. This tool helps you define your product vision, design your UI, and generate a complete handoff package for implementation.

---

## Quick Start

```bash
# 1. Start the dev server
npm run dev

# 2. Use commands in this order:
/product-vision      # Define your product
/design-tokens       # Choose colors and fonts
/design-shell        # Design the navigation
/shape-section       # Define a section's spec
/design-screen       # Create screen designs
/export-product      # Generate handoff package
```

---

## Complete Workflow

### Phase 1: Define Your Product

#### Step 1: `/product-vision`

**What it does:** Creates the foundation for your product by defining the overview, roadmap, and data shape.

**Run this first.** Qwen will ask you questions about:
- What problem your product solves
- Who it's for
- Key features
- Main sections/screens
- Core data entities

**Output files:**
- `product/product-overview.md`
- `product/product-roadmap.md`
- `product/data-shape/data-shape.md`

**Example conversation:**
```
You: /product-vision

Qwen: I'd love to help you define your product vision. Tell me about 
the product you're building...

You: I want to build an invoice management tool for freelancers...

[After a few questions, Qwen creates all three files automatically]
```

---

#### Step 2: `/design-tokens`

**What it does:** Defines your product's visual identity — colors and typography.

**Prerequisites:** Product vision must exist.

Qwen will help you choose:
- **Colors** from Tailwind's palette (primary, secondary, neutral)
- **Fonts** from Google Fonts (heading, body, mono)

**Output files:**
- `product/design-system/colors.json`
- `product/design-system/typography.json`

**Tips:**
- If you have brand colors, mention them
- Qwen will suggest palettes based on your product type
- These tokens apply to all screen designs

---

#### Step 3: `/design-shell`

**What it does:** Designs the application shell — the persistent navigation and layout that wraps all sections.

**Prerequisites:** Product overview and roadmap must exist.

Qwen will ask about:
- Layout pattern (sidebar, top nav, or minimal header)
- Navigation structure
- User menu placement
- Responsive behavior

**Output files:**
- `product/shell/spec.md`
- `src/shell/components/AppShell.tsx`
- `src/shell/components/MainNav.tsx`
- `src/shell/components/UserMenu.tsx`
- `src/shell/ShellPreview.tsx`

**Important:** Restart your dev server after this step to see the shell.

---

### Phase 2: Design Each Section

For **each section** in your roadmap, repeat these steps:

#### Step 4: `/shape-section`

**What it does:** Defines the specification for a section — user flows, UI requirements, and sample data.

**Prerequisites:** Product roadmap must exist.

Qwen will ask:
- Which section to work on
- What users do in this section
- Key user flows
- UI patterns needed

**Output files (per section):**
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`

**Tips:**
- Focus on user experience, not backend details
- Be specific about what users see and do
- Sample data is generated automatically

---

#### Step 5: `/design-screen`

**What it does:** Creates the actual screen design — a props-based React component.

**Prerequisites:** Section spec, data, and types must exist.

Qwen will:
1. Read the `frontend-design` skill for high-quality design
2. Analyze your spec and sample data
3. Create a distinctive, production-grade interface

**Output files (per section):**
- `src/sections/[section-id]/components/[ViewName].tsx`
- `src/sections/[section-id]/components/index.ts`
- `src/sections/[section-id]/[ViewName].tsx` (preview wrapper)

**Important:** Restart your dev server to see the screen design.

**Design features:**
- Mobile responsive
- Light and dark mode support
- Uses your design tokens
- Props-based (portable to any React setup)

---

#### Step 6: `/screenshot-design` *(Optional)*

**What it does:** Captures a screenshot of your screen design for documentation.

**Prerequisites:** 
- Screen design must exist
- Playwright MCP must be installed

**Install Playwright MCP (if needed):**
```bash
npx @playwright/mcp@latest
```

**Output:**
- `product/sections/[section-id]/[screen-name].png`

**Tips:**
- Qwen starts the dev server automatically
- Screenshots capture full page (not just viewport)
- Navigation bar is hidden for clean documentation

---

### Phase 3: Export for Implementation

#### Step 7: `/export-product`

**What it does:** Generates a complete handoff package with all components, instructions, and prompts for implementation.

**Prerequisites:** 
- Product overview must exist
- At least one section with screen designs

**Output:**
- `product-plan/` directory with everything needed
- `product-plan.zip` for download

**What's included:**

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary
├── prompts/
│   ├── one-shot-prompt.md       # Full implementation prompt
│   └── section-prompt.md        # Section-by-section prompt
├── instructions/
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # Step-by-step guides
│       ├── 01-shell.md
│       ├── 02-[section-1].md
│       └── 03-[section-2].md
├── design-system/               # Colors, fonts, tokens
├── data-shapes/                 # TypeScript types
├── shell/                       # Shell components
└── sections/                    # Section components
    └── [section-id]/
        ├── README.md
        ├── tests.md             # UI test specs
        ├── components/
        ├── types.ts
        └── sample-data.json
```

**How to use the export:**

1. Copy `product-plan/` to your implementation codebase
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Copy/paste into your coding agent (Qwen, Cursor, etc.)
4. Answer clarifying questions about your tech stack
5. Let the agent implement based on the instructions

---

## Command Reference

| Command | When to Use | Output |
|---------|-------------|--------|
| `/product-vision` | First step — define your product | Overview, roadmap, data shape |
| `/product-roadmap` | Update sections after initial creation | Updated roadmap |
| `/data-shape` | Update entities after initial creation | Updated data shape |
| `/design-tokens` | After product vision | Colors and typography |
| `/design-shell` | After design tokens | Navigation and layout |
| `/shape-section` | For each section | Spec, sample data, types |
| `/sample-data` | Update section data | Updated data and types |
| `/design-screen` | After shape-section | Screen design components |
| `/screenshot-design` | Optional — for docs | PNG screenshot |
| `/export-product` | Final step — handoff | Complete export package |

---

## File Structure Overview

```
my-project-design/
├── product/                    # Your product definition
│   ├── product-overview.md
│   ├── product-roadmap.md
│   ├── data-shape/data-shape.md
│   ├── design-system/
│   │   ├── colors.json
│   │   └── typography.json
│   ├── shell/spec.md
│   └── sections/
│       └── [section-name]/
│           ├── spec.md
│           ├── data.json
│           ├── types.ts
│           └── screenshot.png
│
├── src/                        # Design OS + screen designs
│   ├── shell/
│   │   └── components/
│   └── sections/
│       └── [section-name]/
│           ├── components/     # Exportable components
│           └── [ViewName].tsx  # Preview wrapper
│
└── product-plan/               # Generated export (handoff)
    └── [everything needed for implementation]
```

---

## Tips for Best Results

### 1. Follow the Sequence
Don't skip steps. Each phase builds on the previous one.

### 2. Be Specific in Your Answers
When Qwen asks questions, provide concrete details:
- ❌ "Users manage stuff"
- ✅ "Users create projects, add tasks, and track progress"

### 3. Review Files After Creation
Qwen generates files automatically. Review them and request changes if needed:
```
"This looks good, but can you add a filter option to the invoice list?"
```

### 4. Use the Export Prompts
The pre-written prompts in `product-plan/prompts/` are designed to:
- Ask about your tech stack
- Clarify requirements
- Generate implementation plans

Don't skip this step — it ensures smooth handoff.

### 5. Restart Dev Server Often
After creating components, restart to see changes:
```bash
# Stop server (Ctrl+C), then:
npm run dev
```

---

## Troubleshooting

### "Command not found"
Make sure you're running commands with the `/` prefix:
- ✅ `/product-vision`
- ❌ `product-vision`

### Screen designs not showing
1. Restart the dev server
2. Check that the preview wrapper has a `default export`
3. Verify the section route in your app

### Export missing files
Check that all prerequisites exist:
- Product overview
- At least one section with screen designs
- Components in `src/sections/`

### Playwright screenshot errors
Install Playwright MCP:
```bash
npx @playwright/mcp@latest
```

---

## Next Steps

1. **Start with `/product-vision`** — Define what you're building
2. **Follow the workflow** — Each step builds on the last
3. **Export when ready** — Generate your handoff package
4. **Implement** — Use the prompts to build in your codebase

For detailed command documentation, see the files in `.qwen/commands/design-os/`.

---

*Design OS — Product planning and design for Qwen users*
