# Generate Product for Laravel with Laravel Boost

This command creates a new Laravel application inside the current directory with a custom app name and sets up Laravel Boost for AI-assisted development.

## Prerequisites Check

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`
- PHP 8.2+ installed
- Composer installed
- Node.js 18+ installed

If required files are missing:

"To generate your Laravel product with Laravel Boost, you need at minimum:
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

Continuing with Laravel Boost generation without these..."

## Ask for App Name

Prompt the user:

"What would you like to name your Laravel application? (e.g., my-awesome-app, blog, saas-platform)"

Wait for user input. Use this as the directory name for the Laravel installation.

## Create Laravel Application

Execute the Laravel installer with the custom app name:

```bash
composer create-project laravel/laravel [app-name]
```

This creates a fresh Laravel installation in a directory named `[app-name]` inside the current working directory.

**Note:** If the directory already exists, warn the user:

"⚠️ A directory named '[app-name]' already exists. Please choose a different name or remove the existing directory."

## Install Laravel Boost

Navigate into the Laravel app directory and install Laravel Boost:

```bash
cd [app-name]
composer require laravel/boost
```

## Set Up Laravel Boost MCP Server

Guide the user to set up Laravel Boost for their AI coding assistant:

**For Claude Code users:**

1. Start the Boost MCP server:
```bash
php artisan boost:mcp
```

2. Add to your Claude Code configuration (`~/.claude/settings.json` or project-level `.claude/settings.json`):

```json
{
  "mcpServers": {
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"],
      "cwd": "/path/to/your/[app-name]"
    }
  }
}
```

3. Restart Claude Code to enable the plugin

**For other MCP-compatible AI assistants:**

Configure the MCP server with:
- Command: `php`
- Args: `["artisan", "boost:mcp"]`
- Working directory: Absolute path to your Laravel app

## Install Frontend Dependencies

Set up the frontend stack:

```bash
npm install
npm run build
```

## Set Up Environment

Configure the `.env` file:

```bash
cp .env.example .env
php artisan key:generate
```

Ask the user about their database preference:

"Which database will you use? (sqlite, mysql, postgresql)"

- For **SQLite**: Update `.env` to use `DB_CONNECTION=sqlite` and create the database file
- For **MySQL/PostgreSQL**: Update `.env` with database credentials

## Run Migrations

Execute initial migrations:

```bash
php artisan migrate
```

## Confirm Completion

Let the user know:

"I've created your **Laravel application** with **Laravel Boost** enabled!

**What's Set Up:**

✅ Laravel [version] installed in `./[app-name]/`
✅ Laravel Boost MCP server configured
✅ Frontend dependencies installed
✅ Environment configured

**Next Steps:**

1. **Start Laravel Boost** (for AI assistance):
   ```bash
   cd [app-name]
   php artisan boost:mcp
   ```

2. **Configure your AI assistant** with the MCP server settings above

3. **Start the development server**:
   ```bash
   php artisan serve
   ```

4. **Visit your app**: http://localhost:8000

**Laravel Boost Features:**

With Laravel Boost enabled, your AI assistant can:
- Generate migrations with `php artisan make:migration`
- Create Eloquent models with relationships
- Set up API routes and controllers
- Run Artisan commands intelligently
- Provide context-aware Laravel code generation
- Access your app's structure for better assistance

**How to Use:**

1. Copy `product-plan/` export files to your Laravel app
2. Open prompts from your export package
3. Ask your AI assistant to implement features using Laravel Boost
4. Laravel Boost will help with:
   - Creating migrations and models
   - Setting up routes and controllers
   - Generating Livewire/Inertia components
   - Running tests and optimizations

**Important:**
- Keep the Boost MCP server running while working with your AI assistant
- Laravel Boost works best when your AI assistant has direct MCP access
- All generated code follows Laravel conventions and best practices"

## Important Notes

- Laravel Boost requires PHP 8.2+ and Laravel 11+
- The MCP server must be running for AI assistance features
- Laravel Boost integrates with your AI coding assistant, not your application runtime
- Export packages from Design OS work seamlessly with Laravel Boost
- Boost provides intelligent suggestions for Eloquent, migrations, routing, and more
- Keep your Laravel app directory path absolute in MCP configuration for reliability
