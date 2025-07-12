# Prototyping Repository

This repository is for rapid prototyping of web applications using Next.js, Tailwind CSS, and shadcn/ui components.

## Important Guidelines

1. **Always use Tailwind CSS classes** for styling - avoid custom CSS
2. **Always use shadcn/ui components** when available - they're all installed in `src/components/ui/`
3. **Follow the design system** - check `/project_information/design-system.md` for colors, spacing, and typography
4. **Check project scope** - refer to `/project_information/project-details.md` for current prototype requirements

Before beginning a task, it is ESSENTIAL that you read the full design system and project details files for context.

## Quick Start

- Create new pages in `src/app/[page-name]/page.tsx`
- Use existing shadcn components for consistency
- Follow Tailwind design tokens for spacing and colors
- Keep prototypes simple and focused on demonstrating functionality

## Git Workflow

1. **Always work in feature branches** - When your work is done, ask the user if they'd like to merge it into main.
2. **Create descriptive branch names** - Use format: `feature/description` or `fix/description`
3. **Write meaningful commit messages** - Follow conventional commits (e.g., `feat:`, `fix:`, `docs:`)
4. **Make atomic commits** - Each commit should represent one logical change
5. **Pull latest changes before starting** - Always `git pull origin main` before creating a new branch

### Git Best Practices

- Before starting work: `git checkout main && git pull origin main`
- Create new branch: `git checkout -b feature/your-feature-name`
- Stage changes thoughtfully - don't use `git add .` blindly
- Write clear commit messages that explain the "why" not just the "what"
- Keep commits small and focused on a single change
- Test your changes before committing
- Run `npm run lint` before committing to ensure code quality

## Commands

- `npm run dev` - Start development server
- `npm run lint` - Auto-fix and format code
- `npm run build` - Build for production
