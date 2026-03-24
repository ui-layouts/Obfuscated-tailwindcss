const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const CONFIG = {
  filesToScan: [
    "src/**/*.{jsx,tsx,js,ts,html}",
    "pages/**/*.{jsx,tsx}",
    "components/**/*.{jsx,tsx}",
    "app/**/*.{jsx,tsx}",
  ],
  excludePatterns: ["node_modules", ".next", "dist", ".git"],
  outputCssPath: "app/obfuscated-styles.css",
  mapFilePath: ".obfuscation-map.json",
  randomNameLength: 8,
};

const TAILWIND_CLASS_REGEX = /className\s*=\s*["']([^"']+)["']/g;
const CLASS_ATTR_REGEX = /class\s*=\s*["']([^"']+)["']/g;

const CUSTOM_CLASSES = [
  "container-wrapper",
  "container",
  "slider_content",
  "prose",
  "rainbow-banner-gradient-1",
  "rainbow-banner-gradient-2",
  "cpu-architecture",
  "cpu-line-1",
  "cpu-line-2",
  "cpu-line-3",
  "cpu-line-4",
  "cpu-line-5",
  "group",
  "peer",
  "cpu-line-6",
  "cpu-line-7",
  "cpu-line-8",
  "spotlight-main",
  "spotlight-shadow",
  "spotlight-elipse",
  "spotlight-base",
  "spotlight-fade",
  "spotlight-left",
  "spotlight-right",
  "glass-button",
  "glass-btn",
  "gradient-wrapper",
  "mdxcard",
  "animated-btn",
  "blur-vignette",
  "animated-text",
  "scrollbar-none",
  "shiki",
  "dark",
];

const SKIP_CLASSES = [
  "bg-opacity-20",
  "bg-opacity-40",
  "bg-opacity-50",
  "bg-opacity-60",
  "bg-opacity-80",
  "bg-opacity-100",
  "bg-blue",
  "text-pirmary",
  "rounded-rt-lg",
  "group",
  "peer",
  "group-hover",
  "group-focus",
  "prose",
  "not-prose",
];

function generateRandomClassName() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chars = letters + "0123456789";
  let result = letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 1; i < CONFIG.randomNameLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isPureCustomClass(classString) {
  const classes = classString.trim().split(/\s+/);
  return classes.every((cls) => CUSTOM_CLASSES.includes(cls));
}

function shouldSkipClass(cls) {
  if (SKIP_CLASSES.includes(cls)) return true;
  if (CUSTOM_CLASSES.includes(cls)) return true;
  if (
    SKIP_CLASSES.some(
      (skip) => cls.startsWith(skip + "-") || cls.startsWith(skip + ":"),
    )
  )
    return true;
  return false;
}

function getValidClassString(classString) {
  if (!classString || classString.trim().length === 0) return null;

  const validClasses = classString
    .trim()
    .split(/\s+/)
    .filter((cls) => {
      if (!cls || cls.length < 2) return false;
      if (cls.includes(",")) return false;
      if (cls.includes("`") || cls.includes("$")) return false;
      if (cls.includes("{") || cls.includes("}")) return false;
      if (cls.endsWith("-")) return false;
      if (cls.endsWith(":")) return false;
      if (shouldSkipClass(cls)) return false;
      if (cls.includes("[") && !cls.includes("]")) return false;
      if (cls.includes("]") && !cls.includes("[")) return false;
      return true;
    });

  if (validClasses.length === 0) return null;
  return validClasses.join(" "); // ← calling .join on a STRING, not array!
}

function extractClassStrings(content) {
  const classStrings = new Set();

  let match;
  while ((match = TAILWIND_CLASS_REGEX.exec(content)) !== null) {
    const raw = (match[1] || "").trim();
    if (!raw) continue;
    if (isPureCustomClass(raw)) continue;
    const valid = getValidClassString(raw);
    if (valid) classStrings.add(raw);
  }
  TAILWIND_CLASS_REGEX.lastIndex = 0;

  while ((match = CLASS_ATTR_REGEX.exec(content)) !== null) {
    const raw = (match[1] || "").trim();
    if (!raw) continue;
    if (isPureCustomClass(raw)) continue;
    const valid = getValidClassString(raw);
    if (valid) classStrings.add(raw);
  }
  CLASS_ATTR_REGEX.lastIndex = 0;

  return classStrings;
}

function createClassMapping(classStrings) {
  console.log("🔐 Generating obfuscation mapping...");

  let mapping = {};
  if (fs.existsSync(CONFIG.mapFilePath)) {
    mapping = JSON.parse(fs.readFileSync(CONFIG.mapFilePath, "utf8"));
    console.log(
      `📂 Loaded existing mapping with ${Object.keys(mapping).length} entries`,
    );
  }

  const usedNames = new Set(Object.values(mapping));

  for (const classString of classStrings) {
    if (mapping[classString]) continue;

    let obfuscatedName;
    do {
      obfuscatedName = generateRandomClassName();
    } while (usedNames.has(obfuscatedName));

    usedNames.add(obfuscatedName);
    mapping[classString] = obfuscatedName;
  }

  console.log(`✅ Total mapping: ${Object.keys(mapping).length} class strings`);
  return mapping;
}

function replaceClassesInFile(filePath, mapping) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  TAILWIND_CLASS_REGEX.lastIndex = 0;
  CLASS_ATTR_REGEX.lastIndex = 0;

  const makeReplacer =
    () =>
    (match, ...groups) => {
      try {
        const classString = (
          groups.slice(0, 4).find((g) => g != null) || ""
        ).trim();
        if (!classString) return match;
        const obfuscated = mapping[classString];
        if (!obfuscated) return match;
        modified = true;

        // ✅ Keep group/peer in HTML alongside obfuscated class
        const keepInHtml = classString
          .split(/\s+/)
          .filter((cls) => ["group", "peer"].includes(cls))
          .join(" ");

        const replacement = keepInHtml
          ? `${keepInHtml} ${obfuscated}`
          : obfuscated;

        return match.split(classString).join(replacement);
      } catch (e) {
        return match;
      }
    };

  try {
    content = content.replace(TAILWIND_CLASS_REGEX, makeReplacer());
  } catch (e) {}
  try {
    content = content.replace(CLASS_ATTR_REGEX, makeReplacer());
  } catch (e) {}

  if (modified) fs.writeFileSync(filePath, content, "utf8");
  return modified;
}

async function replaceAllClasses(mapping) {
  console.log("🔄 Replacing classes in files...");
  let replacedCount = 0;

  for (const pattern of CONFIG.filesToScan) {
    try {
      const files = await glob(pattern, {
        ignore: CONFIG.excludePatterns,
        windowsPathsNoEscape: true,
        dot: true,
      });
      for (const file of files) {
        try {
          if (replaceClassesInFile(file, mapping)) replacedCount++;
        } catch (err) {
          console.warn(`⚠️  Could not process file: ${file}`, err.message);
        }
      }
    } catch (err) {
      console.warn(`⚠️  Error with pattern ${pattern}`, err.message);
    }
  }

  console.log(`✅ Updated ${replacedCount} files`);
}

function generateMappingCss(mapping) {
  let css = "/* Auto-generated obfuscation mapping */\n";
  css += "/* DO NOT EDIT MANUALLY - regenerated on build */\n\n";
  css += '@reference "tailwindcss";\n';
  css += '@reference "./token.css";\n\n';

  for (const [classString, obfuscatedName] of Object.entries(mapping)) {
    // Keep variant classes like dark:, hover:, md:, 2xl: in @apply
    // they work correctly when grouped together in one rule
    const validClasses = classString
      .split(/\s+/)
      .filter((cls) => {
        if (!cls || cls.length < 2) return false;
        if (cls.includes(",")) return false;
        if (cls.includes("`") || cls.includes("$")) return false;
        if (cls.includes("{") || cls.includes("}")) return false;
        if (cls.endsWith("-")) return false;
        if (cls.endsWith(":")) return false;
        if (shouldSkipClass(cls)) return false;
        if (cls.includes("[") && !cls.includes("]")) return false;
        if (cls.includes("]") && !cls.includes("[")) return false;

        return true;
      })
      .join(" ");

    if (!validClasses) continue;

    css += `.${obfuscatedName} { @apply ${validClasses}; }\n`;
  }

  const dir = path.dirname(CONFIG.outputCssPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(CONFIG.outputCssPath, css, "utf8");
  console.log(`✅ Generated CSS file: ${CONFIG.outputCssPath}`);
}

function saveMapping(mapping) {
  fs.writeFileSync(
    CONFIG.mapFilePath,
    JSON.stringify(mapping, null, 2),
    "utf8",
  );
  console.log(`✅ Saved mapping to: ${CONFIG.mapFilePath}`);
}

function addImportToLayout() {
  const layoutPath = "app/layout.tsx";

  if (!fs.existsSync(layoutPath)) {
    console.warn("⚠️  layout.tsx not found, skipping import injection");
    return;
  }

  let content = fs.readFileSync(layoutPath, "utf8");
  const importLine = `import "./obfuscated-styles.css";`;

  if (content.includes(importLine)) {
    console.log("✅ Import already exists in layout.tsx");
    return;
  }

  // Inject BEFORE globals.css so Tailwind utilities always win
  if (content.includes(`import "./globals.css"`)) {
    content = content.replace(
      `import "./globals.css"`,
      `import "./obfuscated-styles.css";\nimport "./globals.css"`,
    );
  } else {
    const lastImportIndex = content.lastIndexOf("import ");
    const endOfLastImport = content.indexOf("\n", lastImportIndex);
    content =
      content.slice(0, endOfLastImport + 1) +
      importLine +
      "\n" +
      content.slice(endOfLastImport + 1);
  }

  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("✅ Added import to layout.tsx");
}

async function main() {
  try {
    console.log("\n🚀 Starting Tailwind class obfuscation...\n");

    console.log("🔍 Scanning for className strings...");
    const allClassStrings = new Set();

    for (const pattern of CONFIG.filesToScan) {
      try {
        const files = await glob(pattern, {
          ignore: CONFIG.excludePatterns,
          windowsPathsNoEscape: true,
          dot: true,
        });
        for (const file of files) {
          try {
            const content = fs.readFileSync(file, "utf8");
            extractClassStrings(content).forEach((s) => allClassStrings.add(s));
          } catch (err) {
            console.warn(`⚠️  Could not read file: ${file}`);
          }
        }
      } catch (err) {
        console.warn(`⚠️  Error with pattern ${pattern}:`, err.message);
      }
    }

    console.log(`✅ Found ${allClassStrings.size} unique className strings`);

    if (allClassStrings.size === 0) {
      console.log("⚠️  No className strings found. Skipping.");
      return;
    }

    const mapping = createClassMapping(allClassStrings);
    await replaceAllClasses(mapping);
    generateMappingCss(mapping);
    saveMapping(mapping);
    addImportToLayout();

    console.log("\n✅ Obfuscation complete!\n");
    console.log(`   - Class strings mapped: ${allClassStrings.size}`);
    console.log(`   - CSS file: ${CONFIG.outputCssPath}`);
    console.log(`   - Mapping file: ${CONFIG.mapFilePath}\n`);
  } catch (err) {
    console.error("❌ Error during obfuscation:", err);
    process.exit(1);
  }
}

main();
