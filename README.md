<img width="1280" height="640" alt="Design OS" src="https://github.com/user-attachments/assets/a9c04258-7b9a-45b6-8475-3431cdf5dbe9" />

## The missing design process between your idea and your codebase.

[Design OS](https://buildermethods.com/design-os) is a product planning and design tool that helps you define your product vision, sketch out your data shape, design your UI, and export production-ready components for implementation. Rather than jumping straight into code, you work through a guided process that captures what you're building and why—then hands off everything your coding agent needs to build it right.

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

# 3. Generate your app (optional):
/generate-product-laravel-boost    # Laravel with AI assistance
/generate-product-react            # Portable React components
```

---

## All Available Commands

### Design OS Commands (Product Planning Workflow)

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/product-vision` | Define product vision, roadmap, and data shape | First step - start here |
| `/design-tokens` | Choose color palette and typography | After product vision |
| `/design-shell` | Design app navigation and layout | After design tokens |
| `/shape-section` | Define requirements for a feature section | For each feature area |
| `/design-screen` | Create screen designs for a section | After shape-section |
| `/screenshot-design` | Capture screenshots for documentation | Optional - for docs |
| `/export-product` | Generate complete handoff package | Final step - for implementation |
| `/generate-product-laravel-boost` | Generate Laravel app with AI assistance | When ready to build |
| `/generate-product-livewire` | Generate Laravel Livewire v4 app | Alternative stack |
| `/generate-product-inertia-react` | Generate Inertia 3 + React app | Alternative stack |
| `/generate-product-inertia-vue` | Generate Inertia 3 + Vue app | Alternative stack |
| `/generate-product-inertia-svelte` | Generate Inertia 3 + Svelte app | Alternative stack |
| `/generate-product-react` | Generate portable React components | Alternative stack |

### Impeccable Commands (Design Quality)

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/teach-impeccable` | One-time setup: gather design context | Run once per project |
| `/audit` | Technical quality checks (a11y, performance, etc.) | Before making changes |
| `/critique` | UX design review with scoring | When you want design feedback |
| `/normalize` | Align with design system standards | After audit |
| `/polish` | Final pass before shipping | Last step before release |
| `/distill` | Strip to essence, remove complexity | When UI is cluttered |
| `/clarify` | Improve unclear UX copy | When text is confusing |
| `/optimize` | Performance improvements | When UI is slow |
| `/harden` | Error handling, i18n, edge cases | Before production |
| `/animate` | Add purposeful motion | When UI feels static |
| `/colorize` | Add strategic color | When UI is monochromatic |
| `/bolder` | Amplify boring designs | When UI is too safe |
| `/quieter` | Tone down overly bold designs | When UI is overwhelming |
| `/delight` | Add moments of joy | For polish and personality |
| `/extract` | Create reusable components | When code is duplicated |
| `/adapt` | Adapt for different devices | For responsive design |
| `/onboard` | Design onboarding flows | For first-time users |
| `/typeset` | Fix typography | When text looks off |
| `/arrange` | Fix layout and spacing | When layout feels wrong |
| `/overdrive` | Add technically ambitious effects | When you want to wow |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/update-now` | Pull latest from git repos and sync all commands/skills |

---

## The Impeccable Integration

This repository includes **Impeccable** - a design quality system with 20 commands for auditing, critiquing, and improving UI design. Impeccable works alongside Design OS:

- **Design OS** = Product planning workflow (define → design → export)
- **Impeccable** = Design quality commands (audit → critique → polish)

### Using Impeccable with Design OS

```bash
# Typical workflow:
/product-vision         # Define product (Design OS)
/design-tokens          # Choose colors (Design OS)
/design-screen          # Create screen (Design OS)

# Then improve quality:
/audit                  # Check quality (Impeccable)
/critique               # UX review (Impeccable)
/normalize              # Fix inconsistencies (Impeccable)
/polish                 # Final refinements (Impeccable)
```

### Keeping Commands Updated

Run `/update-now` to:
1. Pull latest updates from design-os and impeccable git repos
2. Transform source files (remove YAML, replace placeholders)
3. Sync all commands to `.qwen/commands/`
4. Sync skills to `.qwen/skills/`

```bash
/update-now    # Run this after git pulls or when setting up
```

## The Problem

AI coding tools are incredible at building fast. But the results often miss the mark. You describe what you want, the agent builds *something*, but it's not what you envisioned. The UI looks generic. Features get half-implemented. You spend as much time fixing and redirecting as you would have spent building.

**The core issue:** we're asking coding agents to figure out what to build *and* build it simultaneously. Design decisions get made on the fly, buried in code, impossible to adjust without starting over. There's no spec. No shared understanding. No source of truth for what "done" looks like.

## The Design OS Process

Design OS powers a guided design and architecture process. You + AI, working together through structured steps:

1. **Product Planning** — Define your vision, break down your roadmap, and model your data
2. **Design System** — Choose colors, typography, and design your application shell
3. **Section Design** — For each feature area: specify requirements, generate sample data, and design the screens
4. **Export** — Generate a complete handoff package for implementation
5. **Generate** — Automatically create production-ready Laravel apps with Laravel Boost for AI-assisted development

Each step is a conversation. The AI asks questions, you provide direction, and together you shape a product that matches your vision—before any implementation begins.

### From Design to Code in One Command

Once your designs are complete, generate a production-grade Laravel application automatically:

```bash
# Recommended: Laravel with Laravel Boost for AI-assisted development
/generate-product-laravel-boost

# Or choose your stack:
/generate-product-livewire         # Laravel Livewire v4
/generate-product-inertia-react    # Laravel Inertia 3 + React
/generate-product-inertia-vue      # Laravel Inertia 3 + Vue 3
/generate-product-inertia-svelte   # Laravel Inertia 3 + Svelte
/generate-product-react            # Portable React components
```

The generate commands create a complete Laravel application with your custom app name, install Laravel Boost for intelligent AI assistance, and prepare everything for implementation. Your AI coding agent can then build features from your export package with Laravel Boost providing context-aware Laravel expertise.

---

## Documentation & Installation

Docs, installation, usage, & best practices 👉 [It's all here](https://buildermethods.com/design-os)

---

## Support, Training & Community

For official support, training, and community as you use Design OS—for yourself or with your team, consider joining _Builder Methods Pro_. You'll get access to Brian Casel (the creator) for questions, a community of builders using Design OS, plus all Builder Methods workshops and training on AI-first development.

👉 [Join Builder Methods Pro](https://buildermethods.com/pro)

---

## Follow updates & releases

Read the [changelog](CHANGELOG.md)

[Subscribe to be notified of major new releases of Design OS](https://buildermethods.com/design-os)

---

## Created by Brian Casel @ Builder Methods

Created by Brian Casel, the creator of [Builder Methods](https://buildermethods.com), where Brian helps professional software developers and teams build with AI.

Get Brian's free resources on building with AI:
- [Builder Briefing newsletter](https://buildermethods.com)
- [YouTube](https://youtube.com/@briancasel)
# studyline
