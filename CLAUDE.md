# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Project Setup

```bash
npm install          # Install all dependencies
npm run dev          # Start development environment
```

## Technology Stack

**Framework**: Next.js 14 (App Router)
**Language**: TypeScript with strict mode
**Styling**: TailwindCSS with custom design system
**UI Components**: Radix UI primitives + custom components
**Forms**: React Hook Form with Zod validation
**Icons**: Lucide React
**Fonts**: Inter (body text), Oswald (headings)

## Architecture Overview

### Component Structure

- **Landing Page Components**: Located in `/components/` - each section is a standalone component (Hero, QuoteForm, FAQ, etc.)
- **App Router**: Uses Next.js 14 App Router with layout.tsx and page.tsx in `/app/`
- **Form Integration**: QuoteForm.tsx contains a TODO for backend integration at line 24

### Design System

- **Colors**: Black (#0D0D0D) primary, Yellow (#FFD100) accent, custom CSS variables for theme
- **Typography**: Bebas Neue for headings (via font-bebas class), Inter for body text
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Animations**: Custom fadeInUp keyframes and bounce animations defined in tailwind.config.js

### Internationalization Structure

- Translation files in `/public/locales/` for Spanish (default), English, and Portuguese
- Language selector implementation in Header component
- Spanish (es_AR) is the default locale as specified in layout.tsx metadata

### Key Configuration Notes

- **Build Configuration**: TypeScript and ESLint errors are ignored during builds (next.config.js:6-7)
- **Image Handling**: Unoptimized images enabled for placeholder.svg domain
- **Path Aliases**: `@/*` resolves to project root via tsconfig.json
- **Styling**: CSS variables system integrated with Tailwind for theme consistency

### Form Integration Point

The QuoteForm component at `/components/QuoteForm.tsx:24` contains a TODO comment where backend integration should be implemented. The form currently simulates submission with a setTimeout.

### Brand Assets

- Custom SVG logo in Logo.tsx component
- Hero and route images stored in `/public/images/`
- Design follows premium adventure motorcycle transport branding
