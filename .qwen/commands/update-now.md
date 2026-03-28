# Update Now

Pull latest updates from git repositories and sync all commands to `.qwen/commands/` and `.qwen/skills/`.

---

## What This Does

This command:
1. **Pulls latest from design-os repo** (this repository)
2. **Pulls latest from impeccable repo** (`impeccable/` subdirectory)
3. **Transforms and syncs** all commands to `.qwen/commands/`
4. **Syncs skills** to `.qwen/skills/`

Run this when:
- You want to get the latest command updates from upstream
- Source files have changed and need to be synced
- Setting up a fresh clone of the repository

---

## Execution

### Step 1: Pull Latest from Git

**Pull design-os updates** (current directory):
```bash
git pull origin main
```

**Pull impeccable updates** (subdirectory):
```bash
cd impeccable && git pull origin main && cd ..
```

If either pull fails (not a git repo, no remote, etc.), report the error but continue with available sources.

### Step 2: Verify Source Directories

Check that source directories exist after pull:
- `.qwen/commands/design-os/` - design-os command source files
- `impeccable/source/skills/` - Impeccable skill source files

If `impeccable/source/skills/` doesn't exist, inform the user that the impeccable folder is missing and cannot sync Impeccable commands.

### Step 3: Sync design-os Commands

The design-os commands in `.qwen/commands/design-os/` are already in the correct format. No transformation needed - they are the source of truth.

List the design-os commands found:
- Read each `.md` file in `.qwen/commands/design-os/`
- Report count and names

### Step 4: Sync Impeccable Commands

For each skill in `impeccable/source/skills/`:

1. **Read the source file**: `impeccable/source/skills/{skill-name}/SKILL.md`
2. **Transform the file**:
   - Remove YAML frontmatter (everything between `---` and `---` at the top)
   - Replace placeholders:
     - `{{command_prefix}}` → `/`
     - `{{available_commands}}` → `/audit, /critique, /normalize, /polish, /distill, /clarify, /optimize, /harden, /animate, /colorize, /bolder, /quieter, /delight, /extract, /adapt, /onboard, /typeset, /arrange, /overdrive, /teach-impeccable`
     - `{{ask_instruction}}` → `ask the user for clarification`
     - `{{config_file}}` → `.impeccable.md`
     - `{{model}}` → `your AI assistant`
3. **Write to destination**: `.qwen/commands/impeccable/{skill-name}.md`

**Skip these skills** (not user commands):
- `frontend-design` - This is a skill, not a command (sync to `.qwen/skills/frontend-design/` instead)

### Step 5: Sync frontend-design Skill

For the `frontend-design` skill:
1. **Read source**: `impeccable/source/skills/frontend-design/SKILL.md`
2. **Transform**:
   - Remove YAML frontmatter
   - Replace `{{command_prefix}}`, `{{model}}`, `{{config_file}}`, `{{available_commands}}`, `{{ask_instruction}}` with same values as above
3. **Write to**: `.qwen/skills/frontend-design/SKILL.md`

Also copy any reference files from `impeccable/source/skills/frontend-design/reference/` to `.qwen/skills/frontend-design/reference/`.

### Step 6: Report Results

Present a summary:

```
✓ Update complete!

**Git Pull:**
  - design-os: ✓ Updated (or "Already up to date" / "Skipped: not a git repo")
  - impeccable: ✓ Updated (or "Already up to date" / "Skipped: not a git repo")

**design-os commands** (N files):
  - product-vision.md
  - design-tokens.md
  ...

**Impeccable commands** (N files):
  - audit.md
  - critique.md
  ...

**Skills synced:**
  - frontend-design (with N reference files)

All commands and skills updated from upstream sources.
```

---

## Important Notes

- **Source of truth**: 
  - design-os: `.qwen/commands/design-os/*.md` (direct source)
  - Impeccable: `impeccable/source/skills/*/SKILL.md` (transformed source)
- **Never edit** `.qwen/commands/impeccable/*.md` or `.qwen/skills/frontend-design/*` directly - edit the source files and run `/update-now`
- **design-os commands** are already in final format - no transformation needed
- **Impeccable commands** require transformation (YAML removal, placeholder replacement)

---

## Error Handling

- If git pull fails (not a git repo, no remote, merge conflicts), report the error but continue with available sources
- If a source file is missing, report it but continue with other files
- If transformation fails for a file, report the error and skip that file
- If destination directory doesn't exist, create it before writing
