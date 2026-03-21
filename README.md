# Obfuscated TailwindCSS

Obfuscated TailwindCSS is a build-time approach for Next.js projects that rewrites readable Tailwind utility strings into short generated class names, then emits a stylesheet that maps those generated selectors back to the original Tailwind rules.

This repository demonstrates the full flow, including the token setup required for semantic Tailwind utilities such as `bg-primary`, `text-primary-foreground`, and `bg-background`.

## How it works

1. The build script scans your project for `className="..."` and `class="..."` strings.
2. Each full utility string is assigned a generated class name.
3. The script replaces the original class string in your source files.
4. It generates `app/obfuscated-styles.css` with `@apply` rules for every generated selector.
5. It saves `.obfuscation-map.json` so you can inspect the mapping.

## Install the dependencies

```bash
npm install uuid
npm install -D glob @types/uuid
```

Alternative package managers:

```bash
bun add uuid
bun add -d glob @types/uuid
```

```bash
yarn add uuid
yarn add --dev glob @types/uuid
```

## Add the build step

Create `scripts/obfuscate-tailwind.js` in your project, then run it before `next build`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "node scripts/obfuscate-tailwind.js && next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

## Import the generated stylesheet

Import the generated CSS file from `app/layout.tsx`:

```tsx
import "./obfuscated-styles.css";
import "./globals.css";
```

## Important: create a separate `token.css`

If your project uses semantic Tailwind utilities such as `bg-primary`, `bg-background`, `text-foreground`, `border-border`, or similar token-backed classes, create a dedicated `token.css` file and keep your design tokens there.

### 1. Create `app/token.css`

Move your shared theme variables and `@theme inline` mappings into this file:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
}
```

### 2. Import `token.css` in `app/globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./token.css";
```

### 3. Uncomment the token reference in the generator

Inside `scripts/obfuscate-tailwind.js`, make sure the generated CSS includes both references:

```js
css += '@reference "tailwindcss";\n';
css += '@reference "./token.css";\n\n';
```

That separate `token.css` file fixes the main issue with generated token utilities. Without it, classes like `bg-primary` and `bg-background` may not resolve correctly inside `app/obfuscated-styles.css`.

## Example

### Source component

```tsx
<div className="flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg">
  <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

### Obfuscated output

```tsx
<div className="a1b2c3d4">
  <h1 className="e5f6g7h8">Hello World</h1>
</div>
```

### Generated CSS

```css
.a1b2c3d4 {
  @apply flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg;
}

.e5f6g7h8 {
  @apply text-2xl font-bold;
}
```

## Generated files

After a build, you should have:

- `app/obfuscated-styles.css`
- `.obfuscation-map.json`

## Documentation routes in this demo

- `/docs/getting-started`
- `/docs/examples`

These routes are backed by actual MDX content in this repository.
