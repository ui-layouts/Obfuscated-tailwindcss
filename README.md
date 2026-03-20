# Obfuscated TailwindCSS

A Next.js project built with TailwindCSS, TypeScript, and shadcn/ui components that demonstrates TailwindCSS class obfuscation for production builds. This project converts readable Tailwind utility classes into obfuscated CSS class names to reduce bundle size and obscure your styling implementation.

## 📦 Installation

### Step 1: Add Required Dependencies

Add these dependencies to your existing Next.js project:

```bash
npm install uuid
npm install -D glob @types/uuid
# or
bun add uuid
bun add -d glob @types/uuid
# or
yarn add uuid
yarn add --dev glob @types/uuid
```

### Step 2: Add Obfuscation Script

Create `scripts/obfuscate-tailwind.js` in your project with the obfuscation script content.

### Step 3: Update Package.json Scripts

Add these scripts to your `package.json`:

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

### Step 4: Build with Obfuscation

```bash
npm run build
```

### Step 5: Add CSS Import

Add this import to your `app/layout.tsx`:

```tsx
import "./obfuscated-styles.css";
```

Place it right after your `globals.css` import.

## 🔧 How Obfuscation Works

### 1. Class Detection
The script scans these file patterns for Tailwind classes:
- `src/**/*.{jsx,tsx,js,ts,html}`
- `pages/**/*.{jsx,tsx}`
- `components/**/*.{jsx,tsx}`
- `app/**/*.{jsx,tsx}`

### 2. Class Replacement
- Finds `className="..."` and `class="..."` attributes
- Replaces Tailwind classes with obfuscated names
- Generates random 8-character class names

### 3. CSS Generation
- Creates `app/obfuscated-styles.css` with converted CSS rules
- Maps obfuscated names back to original Tailwind CSS

### 4. Mapping File
- Generates `.obfuscation-map.json` for debugging
- Shows the relationship between original and obfuscated classes

## 🚀 Usage Example

### Before Obfuscation
```tsx
<div className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg">
  <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

### After Obfuscation
```tsx
<div className="a1b2c3d4 e5f6g7h8 i9j0k1l2 m3n4o5p6 q7r8s9t0 u1v2w3x4">
  <h1 className="y5z6a7b8 c9d0e1f2">Hello World</h1>
</div>
```

### Generated CSS
```css
.a1b2c3d4 { display: flex; }
.e5f6g7h8 { align-items: center; }
.i9j0k1l2 { justify-content: center; }
.m3n4o5p6 { padding: 1rem; }
.q7r8s9t0 { background-color: #3b82f6; }
.u1v2w3x4 { color: white; }
.y5z6a7b8 { font-size: 1.5rem; }
.c9d0e1f2 { font-weight: 700; }
```

## 🎨 Customization

### Modifying Obfuscation Settings
Edit `scripts/obfuscate-tailwind.js` to change:
- `randomNameLength`: Length of generated class names
- `filesToScan`: File patterns to scan
- `outputCssPath`: Where to save generated CSS
- `excludePatterns`: Files/directories to ignore


## 📁 Project Structure

```
obfuscated-tailwindcss/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with documentation
│   └── obfuscated-styles.css  # Generated obfuscated CSS
├── components/             # React components
│   ├── ui/               # Shadcn/ui components
│   └── hero-footer.tsx   # Example component
├── scripts/               # Build scripts
│   └── obfuscate-tailwind.js  # Main obfuscation script
├── lib/                  # Utility libraries
├── public/               # Static assets
└── package.json          # Project configuration
```


## 📊 Benefits

- **Smaller Bundle Size**: Obfuscated class names are shorter than Tailwind utilities
- **Code Obfuscation**: Hides your styling implementation from competitors
- **Performance**: Reduced CSS parsing time
- **Security**: Makes it harder to reverse-engineer your design system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build`
5. Submit a pull request

## 📄 License

MIT License - feel free to use this in your projects!
