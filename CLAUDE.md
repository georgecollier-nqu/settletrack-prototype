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

## Commands

- `npm run dev` - Start development server
- `npm run lint` - Auto-fix and format code
- `npm run build` - Build for production
