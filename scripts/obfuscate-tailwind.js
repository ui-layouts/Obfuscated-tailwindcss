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

// Add this big map to your script
const TAILWIND_TO_CSS = {
  // Display
  block: "display: block;",
  "inline-block": "display: inline-block;",
  inline: "display: inline;",
  flex: "display: flex;",
  "inline-flex": "display: inline-flex;",
  grid: "display: grid;",
  "inline-grid": "display: inline-grid;",
  hidden: "display: none;",
  contents: "display: contents;",

  // Position
  static: "position: static;",
  fixed: "position: fixed;",
  absolute: "position: absolute;",
  relative: "position: relative;",
  sticky: "position: sticky;",

  // Overflow
  "overflow-auto": "overflow: auto;",
  "overflow-hidden": "overflow: hidden;",
  "overflow-visible": "overflow: visible;",
  "overflow-scroll": "overflow: scroll;",
  "overflow-x-auto": "overflow-x: auto;",
  "overflow-x-hidden": "overflow-x: hidden;",
  "overflow-y-auto": "overflow-y: auto;",
  "overflow-y-hidden": "overflow-y: hidden;",

  // Flex
  "flex-row": "flex-direction: row;",
  "flex-col": "flex-direction: column;",
  "flex-row-reverse": "flex-direction: row-reverse;",
  "flex-col-reverse": "flex-direction: column-reverse;",
  "flex-wrap": "flex-wrap: wrap;",
  "flex-nowrap": "flex-wrap: nowrap;",
  "flex-1": "flex: 1 1 0%;",
  "flex-auto": "flex: 1 1 auto;",
  "flex-none": "flex: none;",
  "flex-shrink-0": "flex-shrink: 0;",
  "flex-grow": "flex-grow: 1;",
  "shrink-0": "flex-shrink: 0;",
  grow: "flex-grow: 1;",
  "grow-0": "flex-grow: 0;",

  // Align / Justify
  "items-start": "align-items: flex-start;",
  "items-end": "align-items: flex-end;",
  "items-center": "align-items: center;",
  "items-baseline": "align-items: baseline;",
  "items-stretch": "align-items: stretch;",
  "justify-start": "justify-content: flex-start;",
  "justify-end": "justify-content: flex-end;",
  "justify-center": "justify-content: center;",
  "justify-between": "justify-content: space-between;",
  "justify-around": "justify-content: space-around;",
  "justify-evenly": "justify-content: space-evenly;",
  "self-auto": "align-self: auto;",
  "self-start": "align-self: flex-start;",
  "self-end": "align-self: flex-end;",
  "self-center": "align-self: center;",
  "self-stretch": "align-self: stretch;",

  // Sizing
  "w-0": "width: 0px;",
  "w-px": "width: 1px;",
  "w-0.5": "width: 0.125rem;",
  "w-1": "width: 0.25rem;",
  "w-1.5": "width: 0.375rem;",
  "w-2": "width: 0.5rem;",
  "w-2.5": "width: 0.625rem;",
  "w-3": "width: 0.75rem;",
  "w-3.5": "width: 0.875rem;",
  "w-4": "width: 1rem;",
  "w-5": "width: 1.25rem;",
  "w-6": "width: 1.5rem;",
  "w-7": "width: 1.75rem;",
  "w-8": "width: 2rem;",
  "w-9": "width: 2.25rem;",
  "w-10": "width: 2.5rem;",
  "w-11": "width: 2.75rem;",
  "w-12": "width: 3rem;",
  "w-14": "width: 3.5rem;",
  "w-16": "width: 4rem;",
  "w-20": "width: 5rem;",
  "w-24": "width: 6rem;",
  "w-28": "width: 7rem;",
  "w-32": "width: 8rem;",
  "w-36": "width: 9rem;",
  "w-40": "width: 10rem;",
  "w-44": "width: 11rem;",
  "w-48": "width: 12rem;",
  "w-52": "width: 13rem;",
  "w-56": "width: 14rem;",
  "w-60": "width: 15rem;",
  "w-64": "width: 16rem;",
  "w-72": "width: 18rem;",
  "w-80": "width: 20rem;",
  "w-96": "width: 24rem;",
  "w-full": "width: 100%;",
  "w-screen": "width: 100vw;",
  "w-fit": "width: fit-content;",
  "w-auto": "width: auto;",
  "w-1/2": "width: 50%;",
  "w-1/3": "width: 33.333333%;",
  "w-2/3": "width: 66.666667%;",
  "w-1/4": "width: 25%;",
  "w-3/4": "width: 75%;",

  "h-0": "height: 0px;",
  "h-px": "height: 1px;",
  "h-0.5": "height: 0.125rem;",
  "h-1": "height: 0.25rem;",
  "h-1.5": "height: 0.375rem;",
  "h-2": "height: 0.5rem;",
  "h-2.5": "height: 0.625rem;",
  "h-3": "height: 0.75rem;",
  "h-3.5": "height: 0.875rem;",
  "h-4": "height: 1rem;",
  "h-5": "height: 1.25rem;",
  "h-6": "height: 1.5rem;",
  "h-7": "height: 1.75rem;",
  "h-8": "height: 2rem;",
  "h-9": "height: 2.25rem;",
  "h-10": "height: 2.5rem;",
  "h-11": "height: 2.75rem;",
  "h-12": "height: 3rem;",
  "h-14": "height: 3.5rem;",
  "h-16": "height: 4rem;",
  "h-20": "height: 5rem;",
  "h-24": "height: 6rem;",
  "h-28": "height: 7rem;",
  "h-32": "height: 8rem;",
  "h-36": "height: 9rem;",
  "h-40": "height: 10rem;",
  "h-44": "height: 11rem;",
  "h-48": "height: 12rem;",
  "h-52": "height: 13rem;",
  "h-56": "height: 14rem;",
  "h-60": "height: 15rem;",
  "h-64": "height: 16rem;",
  "h-72": "height: 18rem;",
  "h-80": "height: 20rem;",
  "h-96": "height: 24rem;",
  "h-full": "height: 100%;",
  "h-screen": "height: 100vh;",
  "h-fit": "height: fit-content;",
  "h-auto": "height: auto;",
  "h-svh": "height: 100svh;",
  "h-dvh": "height: 100dvh;",

  // Min/Max
  "min-w-0": "min-width: 0px;",
  "min-w-full": "min-width: 100%;",
  "min-w-fit": "min-width: fit-content;",
  "max-w-none": "max-width: none;",
  "max-w-xs": "max-width: 20rem;",
  "max-w-sm": "max-width: 24rem;",
  "max-w-md": "max-width: 28rem;",
  "max-w-lg": "max-width: 32rem;",
  "max-w-xl": "max-width: 36rem;",
  "max-w-2xl": "max-width: 42rem;",
  "max-w-3xl": "max-width: 48rem;",
  "max-w-4xl": "max-width: 56rem;",
  "max-w-5xl": "max-width: 64rem;",
  "max-w-6xl": "max-width: 72rem;",
  "max-w-7xl": "max-width: 80rem;",
  "max-w-full": "max-width: 100%;",
  "max-w-fit": "max-width: fit-content;",
  "max-w-screen-sm": "max-width: 640px;",
  "max-w-screen-md": "max-width: 768px;",
  "max-w-screen-lg": "max-width: 1024px;",
  "max-w-screen-xl": "max-width: 1280px;",
  "max-w-screen-2xl": "max-width: 1536px;",
  "min-h-0": "min-height: 0px;",
  "min-h-full": "min-height: 100%;",
  "min-h-screen": "min-height: 100vh;",
  "min-h-fit": "min-height: fit-content;",
  "max-h-full": "max-height: 100%;",
  "max-h-screen": "max-height: 100vh;",
  "max-h-none": "max-height: none;",

  // Padding
  "p-0": "padding: 0px;",
  "p-px": "padding: 1px;",
  "p-0.5": "padding: 0.125rem;",
  "p-1": "padding: 0.25rem;",
  "p-1.5": "padding: 0.375rem;",
  "p-2": "padding: 0.5rem;",
  "p-2.5": "padding: 0.625rem;",
  "p-3": "padding: 0.75rem;",
  "p-3.5": "padding: 0.875rem;",
  "p-4": "padding: 1rem;",
  "p-5": "padding: 1.25rem;",
  "p-6": "padding: 1.5rem;",
  "p-7": "padding: 1.75rem;",
  "p-8": "padding: 2rem;",
  "p-9": "padding: 2.25rem;",
  "p-10": "padding: 2.5rem;",
  "p-11": "padding: 2.75rem;",
  "p-12": "padding: 3rem;",
  "p-14": "padding: 3.5rem;",
  "p-16": "padding: 4rem;",
  "p-20": "padding: 5rem;",
  "p-24": "padding: 6rem;",
  "px-0": "padding-left: 0px; padding-right: 0px;",
  "px-1": "padding-left: 0.25rem; padding-right: 0.25rem;",
  "px-2": "padding-left: 0.5rem; padding-right: 0.5rem;",
  "px-3": "padding-left: 0.75rem; padding-right: 0.75rem;",
  "px-4": "padding-left: 1rem; padding-right: 1rem;",
  "px-5": "padding-left: 1.25rem; padding-right: 1.25rem;",
  "px-6": "padding-left: 1.5rem; padding-right: 1.5rem;",
  "px-7": "padding-left: 1.75rem; padding-right: 1.75rem;",
  "px-8": "padding-left: 2rem; padding-right: 2rem;",
  "px-10": "padding-left: 2.5rem; padding-right: 2.5rem;",
  "px-12": "padding-left: 3rem; padding-right: 3rem;",
  "px-14": "padding-left: 3.5rem; padding-right: 3.5rem;",
  "px-16": "padding-left: 4rem; padding-right: 4rem;",
  "px-20": "padding-left: 5rem; padding-right: 5rem;",
  "py-0": "padding-top: 0px; padding-bottom: 0px;",
  "py-1": "padding-top: 0.25rem; padding-bottom: 0.25rem;",
  "py-2": "padding-top: 0.5rem; padding-bottom: 0.5rem;",
  "py-3": "padding-top: 0.75rem; padding-bottom: 0.75rem;",
  "py-4": "padding-top: 1rem; padding-bottom: 1rem;",
  "py-5": "padding-top: 1.25rem; padding-bottom: 1.25rem;",
  "py-6": "padding-top: 1.5rem; padding-bottom: 1.5rem;",
  "py-7": "padding-top: 1.75rem; padding-bottom: 1.75rem;",
  "py-8": "padding-top: 2rem; padding-bottom: 2rem;",
  "py-10": "padding-top: 2.5rem; padding-bottom: 2.5rem;",
  "py-12": "padding-top: 3rem; padding-bottom: 3rem;",
  "py-14": "padding-top: 3.5rem; padding-bottom: 3.5rem;",
  "py-16": "padding-top: 4rem; padding-bottom: 4rem;",
  "py-20": "padding-top: 5rem; padding-bottom: 5rem;",
  "pt-0": "padding-top: 0px;",
  "pt-1": "padding-top: 0.25rem;",
  "pt-2": "padding-top: 0.5rem;",
  "pt-3": "padding-top: 0.75rem;",
  "pt-4": "padding-top: 1rem;",
  "pt-5": "padding-top: 1.25rem;",
  "pt-6": "padding-top: 1.5rem;",
  "pt-8": "padding-top: 2rem;",
  "pt-10": "padding-top: 2.5rem;",
  "pt-12": "padding-top: 3rem;",
  "pt-14": "padding-top: 3.5rem;",
  "pt-16": "padding-top: 4rem;",
  "pt-20": "padding-top: 5rem;",
  "pt-24": "padding-top: 6rem;",
  "pb-0": "padding-bottom: 0px;",
  "pb-1": "padding-bottom: 0.25rem;",
  "pb-2": "padding-bottom: 0.5rem;",
  "pb-3": "padding-bottom: 0.75rem;",
  "pb-4": "padding-bottom: 1rem;",
  "pb-5": "padding-bottom: 1.25rem;",
  "pb-6": "padding-bottom: 1.5rem;",
  "pb-8": "padding-bottom: 2rem;",
  "pb-10": "padding-bottom: 2.5rem;",
  "pb-12": "padding-bottom: 3rem;",
  "pb-14": "padding-bottom: 3.5rem;",
  "pb-16": "padding-bottom: 4rem;",
  "pb-20": "padding-bottom: 5rem;",
  "pb-24": "padding-bottom: 6rem;",
  "pl-0": "padding-left: 0px;",
  "pl-1": "padding-left: 0.25rem;",
  "pl-2": "padding-left: 0.5rem;",
  "pl-3": "padding-left: 0.75rem;",
  "pl-4": "padding-left: 1rem;",
  "pl-5": "padding-left: 1.25rem;",
  "pl-6": "padding-left: 1.5rem;",
  "pl-8": "padding-left: 2rem;",
  "pr-0": "padding-right: 0px;",
  "pr-1": "padding-right: 0.25rem;",
  "pr-2": "padding-right: 0.5rem;",
  "pr-3": "padding-right: 0.75rem;",
  "pr-4": "padding-right: 1rem;",
  "pr-5": "padding-right: 1.25rem;",
  "pr-6": "padding-right: 1.5rem;",
  "pr-8": "padding-right: 2rem;",

  // Margin
  "m-0": "margin: 0px;",
  "m-auto": "margin: auto;",
  "m-1": "margin: 0.25rem;",
  "m-2": "margin: 0.5rem;",
  "m-3": "margin: 0.75rem;",
  "m-4": "margin: 1rem;",
  "mx-auto": "margin-left: auto; margin-right: auto;",
  "mx-0": "margin-left: 0px; margin-right: 0px;",
  "mx-1": "margin-left: 0.25rem; margin-right: 0.25rem;",
  "mx-2": "margin-left: 0.5rem; margin-right: 0.5rem;",
  "mx-3": "margin-left: 0.75rem; margin-right: 0.75rem;",
  "mx-4": "margin-left: 1rem; margin-right: 1rem;",
  "mx-5": "margin-left: 1.25rem; margin-right: 1.25rem;",
  "mx-6": "margin-left: 1.5rem; margin-right: 1.5rem;",
  "mx-8": "margin-left: 2rem; margin-right: 2rem;",
  "my-0": "margin-top: 0px; margin-bottom: 0px;",
  "my-1": "margin-top: 0.25rem; margin-bottom: 0.25rem;",
  "my-2": "margin-top: 0.5rem; margin-bottom: 0.5rem;",
  "my-3": "margin-top: 0.75rem; margin-bottom: 0.75rem;",
  "my-4": "margin-top: 1rem; margin-bottom: 1rem;",
  "my-5": "margin-top: 1.25rem; margin-bottom: 1.25rem;",
  "my-6": "margin-top: 1.5rem; margin-bottom: 1.5rem;",
  "my-8": "margin-top: 2rem; margin-bottom: 2rem;",
  "mt-0": "margin-top: 0px;",
  "mt-1": "margin-top: 0.25rem;",
  "mt-2": "margin-top: 0.5rem;",
  "mt-3": "margin-top: 0.75rem;",
  "mt-4": "margin-top: 1rem;",
  "mt-5": "margin-top: 1.25rem;",
  "mt-6": "margin-top: 1.5rem;",
  "mt-8": "margin-top: 2rem;",
  "mt-10": "margin-top: 2.5rem;",
  "mt-12": "margin-top: 3rem;",
  "mt-14": "margin-top: 3.5rem;",
  "mt-16": "margin-top: 4rem;",
  "mt-20": "margin-top: 5rem;",
  "mt-24": "margin-top: 6rem;",
  "mb-0": "margin-bottom: 0px;",
  "mb-1": "margin-bottom: 0.25rem;",
  "mb-2": "margin-bottom: 0.5rem;",
  "mb-3": "margin-bottom: 0.75rem;",
  "mb-4": "margin-bottom: 1rem;",
  "mb-5": "margin-bottom: 1.25rem;",
  "mb-6": "margin-bottom: 1.5rem;",
  "mb-8": "margin-bottom: 2rem;",
  "mb-10": "margin-bottom: 2.5rem;",
  "mb-12": "margin-bottom: 3rem;",
  "ml-0": "margin-left: 0px;",
  "ml-1": "margin-left: 0.25rem;",
  "ml-2": "margin-left: 0.5rem;",
  "ml-3": "margin-left: 0.75rem;",
  "ml-4": "margin-left: 1rem;",
  "ml-auto": "margin-left: auto;",
  "mr-0": "margin-right: 0px;",
  "mr-1": "margin-right: 0.25rem;",
  "mr-2": "margin-right: 0.5rem;",
  "mr-3": "margin-right: 0.75rem;",
  "mr-4": "margin-right: 1rem;",
  "mr-auto": "margin-right: auto;",

  // Gap
  "gap-0": "gap: 0px;",
  "gap-1": "gap: 0.25rem;",
  "gap-2": "gap: 0.5rem;",
  "gap-3": "gap: 0.75rem;",
  "gap-4": "gap: 1rem;",
  "gap-5": "gap: 1.25rem;",
  "gap-6": "gap: 1.5rem;",
  "gap-7": "gap: 1.75rem;",
  "gap-8": "gap: 2rem;",
  "gap-10": "gap: 2.5rem;",
  "gap-12": "gap: 3rem;",
  "gap-14": "gap: 3.5rem;",
  "gap-16": "gap: 4rem;",
  "gap-20": "gap: 5rem;",
  "gap-x-1": "column-gap: 0.25rem;",
  "gap-x-2": "column-gap: 0.5rem;",
  "gap-x-3": "column-gap: 0.75rem;",
  "gap-x-4": "column-gap: 1rem;",
  "gap-x-6": "column-gap: 1.5rem;",
  "gap-x-8": "column-gap: 2rem;",
  "gap-y-1": "row-gap: 0.25rem;",
  "gap-y-2": "row-gap: 0.5rem;",
  "gap-y-3": "row-gap: 0.75rem;",
  "gap-y-4": "row-gap: 1rem;",
  "gap-y-6": "row-gap: 1.5rem;",
  "gap-y-8": "row-gap: 2rem;",

  // Border radius
  "rounded-none": "border-radius: 0px;",
  "rounded-sm": "border-radius: 0.125rem;",
  rounded: "border-radius: 0.25rem;",
  "rounded-md": "border-radius: 0.375rem;",
  "rounded-lg": "border-radius: 0.5rem;",
  "rounded-xl": "border-radius: 0.75rem;",
  "rounded-2xl": "border-radius: 1rem;",
  "rounded-3xl": "border-radius: 1.5rem;",
  "rounded-full": "border-radius: 9999px;",
  "rounded-t-none":
    "border-top-left-radius: 0px; border-top-right-radius: 0px;",
  "rounded-t-sm":
    "border-top-left-radius: 0.125rem; border-top-right-radius: 0.125rem;",
  "rounded-t":
    "border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem;",
  "rounded-t-md":
    "border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem;",
  "rounded-t-lg":
    "border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;",
  "rounded-t-xl":
    "border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem;",
  "rounded-t-full":
    "border-top-left-radius: 9999px; border-top-right-radius: 9999px;",
  "rounded-b-none":
    "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;",
  "rounded-b-sm":
    "border-bottom-left-radius: 0.125rem; border-bottom-right-radius: 0.125rem;",
  "rounded-b":
    "border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0.25rem;",
  "rounded-b-md":
    "border-bottom-left-radius: 0.375rem; border-bottom-right-radius: 0.375rem;",
  "rounded-b-lg":
    "border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;",
  "rounded-b-xl":
    "border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem;",
  "rounded-b-full":
    "border-bottom-left-radius: 9999px; border-bottom-right-radius: 9999px;",
  "rounded-l-none":
    "border-top-left-radius: 0px; border-bottom-left-radius: 0px;",
  "rounded-l-sm":
    "border-top-left-radius: 0.125rem; border-bottom-left-radius: 0.125rem;",
  "rounded-l":
    "border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem;",
  "rounded-l-md":
    "border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem;",
  "rounded-l-lg":
    "border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem;",
  "rounded-l-xl":
    "border-top-left-radius: 0.75rem; border-bottom-left-radius: 0.75rem;",
  "rounded-l-full":
    "border-top-left-radius: 9999px; border-bottom-left-radius: 9999px;",
  "rounded-r-none":
    "border-top-right-radius: 0px; border-bottom-right-radius: 0px;",
  "rounded-r-sm":
    "border-top-right-radius: 0.125rem; border-bottom-right-radius: 0.125rem;",
  "rounded-r":
    "border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem;",
  "rounded-r-md":
    "border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;",
  "rounded-r-lg":
    "border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem;",
  "rounded-r-xl":
    "border-top-right-radius: 0.75rem; border-bottom-right-radius: 0.75rem;",
  "rounded-r-full":
    "border-top-right-radius: 9999px; border-bottom-right-radius: 9999px;",
  "rounded-tl-none": "border-top-left-radius: 0px;",
  "rounded-tl-sm": "border-top-left-radius: 0.125rem;",
  "rounded-tl": "border-top-left-radius: 0.25rem;",
  "rounded-tl-md": "border-top-left-radius: 0.375rem;",
  "rounded-tl-lg": "border-top-left-radius: 0.5rem;",
  "rounded-tl-xl": "border-top-left-radius: 0.75rem;",
  "rounded-tl-full": "border-top-left-radius: 9999px;",
  "rounded-tr-none": "border-top-right-radius: 0px;",
  "rounded-tr-sm": "border-top-right-radius: 0.125rem;",
  "rounded-tr": "border-top-right-radius: 0.25rem;",
  "rounded-tr-md": "border-top-right-radius: 0.375rem;",
  "rounded-tr-lg": "border-top-right-radius: 0.5rem;",
  "rounded-tr-xl": "border-top-right-radius: 0.75rem;",
  "rounded-tr-full": "border-top-right-radius: 9999px;",
  "rounded-bl-none": "border-bottom-left-radius: 0px;",
  "rounded-bl-sm": "border-bottom-left-radius: 0.125rem;",
  "rounded-bl": "border-bottom-left-radius: 0.25rem;",
  "rounded-bl-md": "border-bottom-left-radius: 0.375rem;",
  "rounded-bl-lg": "border-bottom-left-radius: 0.5rem;",
  "rounded-bl-xl": "border-bottom-left-radius: 0.75rem;",
  "rounded-bl-full": "border-bottom-left-radius: 9999px;",
  "rounded-br-none": "border-bottom-right-radius: 0px;",
  "rounded-br-sm": "border-bottom-right-radius: 0.125rem;",
  "rounded-br": "border-bottom-right-radius: 0.25rem;",
  "rounded-br-md": "border-bottom-right-radius: 0.375rem;",
  "rounded-br-lg": "border-bottom-right-radius: 0.5rem;",
  "rounded-br-xl": "border-bottom-right-radius: 0.75rem;",
  "rounded-br-full": "border-bottom-right-radius: 9999px;",

  // Border
  border: "border-width: 1px;",
  "border-0": "border-width: 0px;",
  "border-2": "border-width: 2px;",
  "border-4": "border-width: 4px;",
  "border-8": "border-width: 8px;",
  "border-t": "border-top-width: 1px;",
  "border-t-0": "border-top-width: 0px;",
  "border-t-2": "border-top-width: 2px;",
  "border-b": "border-bottom-width: 1px;",
  "border-b-0": "border-bottom-width: 0px;",
  "border-b-2": "border-bottom-width: 2px;",
  "border-l": "border-left-width: 1px;",
  "border-l-0": "border-left-width: 0px;",
  "border-l-2": "border-left-width: 2px;",
  "border-r": "border-right-width: 1px;",
  "border-r-0": "border-right-width: 0px;",
  "border-r-2": "border-right-width: 2px;",
  "border-x": "border-left-width: 1px; border-right-width: 1px;",
  "border-y": "border-top-width: 1px; border-bottom-width: 1px;",
  "border-solid": "border-style: solid;",
  "border-dashed": "border-style: dashed;",
  "border-dotted": "border-style: dotted;",
  "border-none": "border-style: none;",

  // Typography
  "text-xs": "font-size: 0.75rem; line-height: 1rem;",
  "text-sm": "font-size: 0.875rem; line-height: 1.25rem;",
  "text-base": "font-size: 1rem; line-height: 1.5rem;",
  "text-lg": "font-size: 1.125rem; line-height: 1.75rem;",
  "text-xl": "font-size: 1.25rem; line-height: 1.75rem;",
  "text-2xl": "font-size: 1.5rem; line-height: 2rem;",
  "text-3xl": "font-size: 1.875rem; line-height: 2.25rem;",
  "text-4xl": "font-size: 2.25rem; line-height: 2.5rem;",
  "text-5xl": "font-size: 3rem; line-height: 1;",
  "text-6xl": "font-size: 3.75rem; line-height: 1;",
  "text-7xl": "font-size: 4.5rem; line-height: 1;",
  "text-8xl": "font-size: 6rem; line-height: 1;",
  "text-9xl": "font-size: 8rem; line-height: 1;",
  "text-left": "text-align: left;",
  "text-center": "text-align: center;",
  "text-right": "text-align: right;",
  "text-justify": "text-align: justify;",
  "font-thin": "font-weight: 100;",
  "font-extralight": "font-weight: 200;",
  "font-light": "font-weight: 300;",
  "font-normal": "font-weight: 400;",
  "font-medium": "font-weight: 500;",
  "font-semibold": "font-weight: 600;",
  "font-bold": "font-weight: 700;",
  "font-extrabold": "font-weight: 800;",
  "font-black": "font-weight: 900;",
  italic: "font-style: italic;",
  "not-italic": "font-style: normal;",
  uppercase: "text-transform: uppercase;",
  lowercase: "text-transform: lowercase;",
  capitalize: "text-transform: capitalize;",
  "normal-case": "text-transform: none;",
  underline: "text-decoration-line: underline;",
  overline: "text-decoration-line: overline;",
  "line-through": "text-decoration-line: line-through;",
  "no-underline": "text-decoration-line: none;",
  truncate: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
  "leading-none": "line-height: 1;",
  "leading-tight": "line-height: 1.25;",
  "leading-snug": "line-height: 1.375;",
  "leading-normal": "line-height: 1.5;",
  "leading-relaxed": "line-height: 1.625;",
  "leading-loose": "line-height: 2;",
  "tracking-tighter": "letter-spacing: -0.05em;",
  "tracking-tight": "letter-spacing: -0.025em;",
  "tracking-normal": "letter-spacing: 0em;",
  "tracking-wide": "letter-spacing: 0.025em;",
  "tracking-wider": "letter-spacing: 0.05em;",
  "tracking-widest": "letter-spacing: 0.1em;",
  "whitespace-normal": "white-space: normal;",
  "whitespace-nowrap": "white-space: nowrap;",
  "whitespace-pre": "white-space: pre;",
  "whitespace-pre-line": "white-space: pre-line;",
  "whitespace-pre-wrap": "white-space: pre-wrap;",

  // Opacity
  "opacity-0": "opacity: 0;",
  "opacity-5": "opacity: 0.05;",
  "opacity-10": "opacity: 0.1;",
  "opacity-20": "opacity: 0.2;",
  "opacity-25": "opacity: 0.25;",
  "opacity-30": "opacity: 0.3;",
  "opacity-40": "opacity: 0.4;",
  "opacity-50": "opacity: 0.5;",
  "opacity-60": "opacity: 0.6;",
  "opacity-70": "opacity: 0.7;",
  "opacity-75": "opacity: 0.75;",
  "opacity-80": "opacity: 0.8;",
  "opacity-90": "opacity: 0.9;",
  "opacity-95": "opacity: 0.95;",
  "opacity-100": "opacity: 1;",

  // Z-index
  "z-0": "z-index: 0;",
  "z-10": "z-index: 10;",
  "z-20": "z-index: 20;",
  "z-30": "z-index: 30;",
  "z-40": "z-index: 40;",
  "z-50": "z-index: 50;",
  "z-auto": "z-index: auto;",
  "-z-10": "z-index: -10;",

  // Position values
  "top-0": "top: 0px;",
  "top-1": "top: 0.25rem;",
  "top-2": "top: 0.5rem;",
  "top-4": "top: 1rem;",
  "top-8": "top: 2rem;",
  "top-auto": "top: auto;",
  "top-full": "top: 100%;",
  "top-1/2": "top: 50%;",
  "bottom-0": "bottom: 0px;",
  "bottom-1": "bottom: 0.25rem;",
  "bottom-2": "bottom: 0.5rem;",
  "bottom-4": "bottom: 1rem;",
  "bottom-8": "bottom: 2rem;",
  "bottom-auto": "bottom: auto;",
  "bottom-full": "bottom: 100%;",
  "left-0": "left: 0px;",
  "left-1": "left: 0.25rem;",
  "left-2": "left: 0.5rem;",
  "left-4": "left: 1rem;",
  "left-8": "left: 2rem;",
  "left-auto": "left: auto;",
  "left-full": "left: 100%;",
  "left-1/2": "left: 50%;",
  "right-0": "right: 0px;",
  "right-1": "right: 0.25rem;",
  "right-2": "right: 0.5rem;",
  "right-4": "right: 1rem;",
  "right-8": "right: 2rem;",
  "right-auto": "right: auto;",
  "right-full": "right: 100%;",
  "inset-0": "inset: 0px;",
  "inset-auto": "inset: auto;",
  "inset-x-0": "left: 0px; right: 0px;",
  "inset-y-0": "top: 0px; bottom: 0px;",

  // Cursor
  "cursor-auto": "cursor: auto;",
  "cursor-default": "cursor: default;",
  "cursor-pointer": "cursor: pointer;",
  "cursor-wait": "cursor: wait;",
  "cursor-text": "cursor: text;",
  "cursor-move": "cursor: move;",
  "cursor-not-allowed": "cursor: not-allowed;",
  "cursor-grab": "cursor: grab;",
  "cursor-grabbing": "cursor: grabbing;",

  // Pointer events
  "pointer-events-none": "pointer-events: none;",
  "pointer-events-auto": "pointer-events: auto;",

  // Select
  "select-none": "user-select: none;",
  "select-text": "user-select: text;",
  "select-all": "user-select: all;",
  "select-auto": "user-select: auto;",

  // Transition
  transition:
    "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
  "transition-all":
    "transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
  "transition-colors":
    "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
  "transition-opacity":
    "transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
  "transition-transform":
    "transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
  "transition-none": "transition-property: none;",
  "duration-75": "transition-duration: 75ms;",
  "duration-100": "transition-duration: 100ms;",
  "duration-150": "transition-duration: 150ms;",
  "duration-200": "transition-duration: 200ms;",
  "duration-300": "transition-duration: 300ms;",
  "duration-500": "transition-duration: 500ms;",
  "duration-700": "transition-duration: 700ms;",
  "duration-1000": "transition-duration: 1000ms;",
  "ease-linear": "transition-timing-function: linear;",
  "ease-in": "transition-timing-function: cubic-bezier(0.4, 0, 1, 1);",
  "ease-out": "transition-timing-function: cubic-bezier(0, 0, 0.2, 1);",
  "ease-in-out": "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",

  // Transform
  transform:
    "transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));",
  "transform-none": "transform: none;",
  "-translate-x-1/2": "transform: translateX(-50%);",
  "-translate-y-1/2": "transform: translateY(-50%);",
  "translate-x-0": "transform: translateX(0px);",
  "translate-y-0": "transform: translateY(0px);",
  "rotate-0": "transform: rotate(0deg);",
  "rotate-45": "transform: rotate(45deg);",
  "rotate-90": "transform: rotate(90deg);",
  "rotate-180": "transform: rotate(180deg);",
  "-rotate-45": "transform: rotate(-45deg);",
  "-rotate-90": "transform: rotate(-90deg);",
  "scale-0": "transform: scale(0);",
  "scale-50": "transform: scale(.5);",
  "scale-75": "transform: scale(.75);",
  "scale-90": "transform: scale(.9);",
  "scale-95": "transform: scale(.95);",
  "scale-100": "transform: scale(1);",
  "scale-105": "transform: scale(1.05);",
  "scale-110": "transform: scale(1.1);",

  // Misc
  "sr-only":
    "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;",
  "not-sr-only":
    "position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal;",
  "appearance-none": "appearance: none;",
  "outline-none": "outline: 2px solid transparent; outline-offset: 2px;",
  outline: "outline-style: solid;",
  "resize-none": "resize: none;",
  resize: "resize: both;",
  "list-none": "list-style-type: none;",
  "list-disc": "list-style-type: disc;",
  "list-decimal": "list-style-type: decimal;",
  antialiased:
    "-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;",
  "subpixel-antialiased":
    "-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;",
  visible: "visibility: visible;",
  invisible: "visibility: hidden;",
  "object-cover": "object-fit: cover;",
  "object-contain": "object-fit: contain;",
  "object-fill": "object-fit: fill;",
  "object-none": "object-fit: none;",
  "object-center": "object-position: center;",
  "aspect-auto": "aspect-ratio: auto;",
  "aspect-square": "aspect-ratio: 1 / 1;",
  "aspect-video": "aspect-ratio: 16 / 9;",
  "space-x-reverse": "--tw-space-x-reverse: 1;",
  "place-items-center": "place-items: center;",
  "place-content-center": "place-content: center;",
  "grid-cols-1": "grid-template-columns: repeat(1, minmax(0, 1fr));",
  "grid-cols-2": "grid-template-columns: repeat(2, minmax(0, 1fr));",
  "grid-cols-3": "grid-template-columns: repeat(3, minmax(0, 1fr));",
  "grid-cols-4": "grid-template-columns: repeat(4, minmax(0, 1fr));",
  "grid-cols-5": "grid-template-columns: repeat(5, minmax(0, 1fr));",
  "grid-cols-6": "grid-template-columns: repeat(6, minmax(0, 1fr));",
  "grid-cols-12": "grid-template-columns: repeat(12, minmax(0, 1fr));",
  "col-span-1": "grid-column: span 1 / span 1;",
  "col-span-2": "grid-column: span 2 / span 2;",
  "col-span-3": "grid-column: span 3 / span 3;",
  "col-span-4": "grid-column: span 4 / span 4;",
  "col-span-full": "grid-column: 1 / -1;",
  "row-span-1": "grid-row: span 1 / span 1;",
  "row-span-2": "grid-row: span 2 / span 2;",
  "row-span-full": "grid-row: 1 / -1;",
  shrink: "flex-shrink: 1;",
  "basis-full": "flex-basis: 100%;",
  "basis-auto": "flex-basis: auto;",
  "order-first": "order: -9999;",
  "order-last": "order: 9999;",
  "order-none": "order: 0;",
};

// Known Tailwind prefixes to validate real Tailwind classes
const TAILWIND_PREFIXES = [
  "flex",
  "grid",
  "block",
  "inline",
  "hidden",
  "absolute",
  "relative",
  "fixed",
  "sticky",
  "static",
  "overflow",
  "z-",
  "w-",
  "h-",
  "min-",
  "max-",
  "p-",
  "px-",
  "py-",
  "pt-",
  "pb-",
  "pl-",
  "pr-",
  "m-",
  "mx-",
  "my-",
  "mt-",
  "mb-",
  "ml-",
  "mr-",
  "text-",
  "font-",
  "leading-",
  "tracking-",
  "bg-",
  "border-",
  "rounded-",
  "shadow-",
  "opacity-",
  "cursor-",
  "select-",
  "pointer-",
  "transition-",
  "duration-",
  "ease-",
  "delay-",
  "animate-",
  "scale-",
  "rotate-",
  "translate-",
  "skew-",
  "origin-",
  "appearance-",
  "outline-",
  "ring-",
  "divide-",
  "space-",
  "place-",
  "items-",
  "justify-",
  "content-",
  "self-",
  "order-",
  "col-",
  "row-",
  "gap-",
  "object-",
  "aspect-",
  "top-",
  "bottom-",
  "left-",
  "right-",
  "inset-",
  "float-",
  "clear-",
  "table-",
  "caption-",
  "align-",
  "indent-",
  "whitespace-",
  "break-",
  "list-",
  "decoration-",
  "underline",
  "overline",
  "line-through",
  "no-underline",
  "uppercase",
  "lowercase",
  "capitalize",
  "normal-case",
  "truncate",
  "sr-only",
  "not-sr-only",
  "drop-shadow",
  "blur-",
  "brightness-",
  "contrast-",
  "grayscale",
  "hue-rotate-",
  "invert",
  "saturate-",
  "sepia",
  "backdrop-",
  "fill-",
  "stroke-",
  "accent-",
  "caret-",
  "scroll-",
  "snap-",
  "touch-",
  "will-change-",
  "container",
  "prose",
  "dark:",
  "hover:",
  "focus:",
  "active:",
  "disabled:",
  "visited:",
  "checked:",
  "focus-within:",
  "focus-visible:",
  "group-",
  "peer-",
  "first:",
  "last:",
  "odd:",
  "even:",
  "sm:",
  "md:",
  "lg:",
  "xl:",
  "2xl:",
  "motion-",
  "print:",
  "rtl:",
  "ltr:",
];
const SKIP_CLASSES = [
  "hover:",
  "dark:",
  "focus:",
  "active:",
  "lg:",
  "md:",
  "sm:",
  "xl:",
  "2xl:",
  "lg:",
];
function isTailwindClass(cls) {
  if (cls.includes("[") || cls.includes("]")) return false;
  if (cls.includes("(") || cls.includes(")")) return false;
  if (cls.includes(",")) return false;
  if (cls.includes("`")) return false; // template literals
  if (cls.includes("$")) return false; // dynamic classes
  if (cls.includes("{") || cls.includes("}")) return false; // dynamic classes

  // Skip incomplete classes that end with a dash
  if (cls.endsWith("-")) return false;

  // Skip single character or empty
  if (cls.length <= 1) return false;

  if (cls.endsWith(":")) return false;

  // Skip deprecated/invalid
  if (SKIP_CLASSES.includes(cls)) return false;

  // Must start with a known Tailwind prefix or be a known standalone class
  return (
    TAILWIND_PREFIXES.some((prefix) => cls.startsWith(prefix)) ||
    [
      "flex",
      "grid",
      "block",
      "inline",
      "hidden",
      "underline",
      "overline",
      "container",
      "truncate",
      "italic",
      "not-italic",
      "antialiased",
      "subpixel-antialiased",
      "line-through",
      "no-underline",
    ].includes(cls)
  );
}

function generateRandomClassName() {
  // Always start with a letter to be valid CSS
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chars = letters + "0123456789";
  let result = letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 1; i < CONFIG.randomNameLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function extractTailwindClasses(content) {
  const classes = new Set();

  let match;
  while ((match = TAILWIND_CLASS_REGEX.exec(content)) !== null) {
    match[1]
      .split(/\s+/)
      .filter(isTailwindClass)
      .forEach((cls) => classes.add(cls));
  }
  TAILWIND_CLASS_REGEX.lastIndex = 0;

  while ((match = CLASS_ATTR_REGEX.exec(content)) !== null) {
    match[1]
      .split(/\s+/)
      .filter(isTailwindClass)
      .forEach((cls) => classes.add(cls));
  }
  CLASS_ATTR_REGEX.lastIndex = 0;

  return classes;
}

async function scanForClasses() {
  console.log("🔍 Scanning for Tailwind classes...");
  const allClasses = new Set();

  for (const pattern of CONFIG.filesToScan) {
    try {
      const files = await glob(pattern, { ignore: CONFIG.excludePatterns });
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, "utf8");
          extractTailwindClasses(content).forEach((cls) => allClasses.add(cls));
        } catch (err) {
          console.warn(`⚠️  Could not read file: ${file}`);
        }
      }
    } catch (err) {
      console.warn(`⚠️  Error with pattern ${pattern}:`, err.message);
    }
  }

  console.log(`✅ Found ${allClasses.size} unique Tailwind classes`);
  return allClasses;
}

function createClassMapping(classes) {
  console.log("🔐 Generating obfuscation mapping...");

  // Load existing mapping if it exists
  let mapping = {};
  if (fs.existsSync(CONFIG.mapFilePath)) {
    mapping = JSON.parse(fs.readFileSync(CONFIG.mapFilePath, "utf8"));
    console.log(
      `📂 Loaded existing mapping with ${Object.keys(mapping).length} classes`,
    );
  }

  const usedNames = new Set(Object.values(mapping));

  for (const tailwindClass of classes) {
    if (mapping[tailwindClass]) continue; // Already mapped, skip

    let obfuscatedName;
    do {
      obfuscatedName = generateRandomClassName();
    } while (usedNames.has(obfuscatedName));

    usedNames.add(obfuscatedName);
    mapping[tailwindClass] = obfuscatedName;
  }

  console.log(`✅ Total mapping: ${Object.keys(mapping).length} classes`);
  return mapping;
}

function replaceClassesInFile(filePath, mapping) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  const replacer = (match, classString) => {
    const classes = classString.split(/\s+/).filter((c) => c.length > 0);
    const obfuscated = classes
      .map((cls) => {
        if (!isTailwindClass(cls)) return cls; // Leave non-tailwind / already obfuscated as-is
        return mapping[cls] || cls;
      })
      .join(" ");

    if (obfuscated !== classString) modified = true;
    return match.replace(classString, obfuscated);
  };

  content = content.replace(TAILWIND_CLASS_REGEX, replacer);
  content = content.replace(CLASS_ATTR_REGEX, replacer);

  if (modified) fs.writeFileSync(filePath, content, "utf8");
  return modified;
}

async function replaceAllClasses(mapping) {
  console.log("🔄 Replacing classes in files...");
  let replacedCount = 0;

  for (const pattern of CONFIG.filesToScan) {
    try {
      const files = await glob(pattern, { ignore: CONFIG.excludePatterns });
      for (const file of files) {
        try {
          if (replaceClassesInFile(file, mapping)) replacedCount++;
        } catch (err) {
          console.warn(`⚠️  Could not process file: ${file}`);
        }
      }
    } catch (err) {
      console.warn(`⚠️  Error with pattern ${pattern}`);
    }
  }

  console.log(`✅ Updated ${replacedCount} files`);
}

function generateMappingCss(mapping) {
  console.log("📝 Generating CSS mapping file...");

  let css = "/* Auto-generated Tailwind class obfuscation mapping */\n";
  css += "/* DO NOT EDIT MANUALLY - This file is regenerated on build */\n\n";
  css += '@reference "tailwindcss";\n\n';
  css += '@reference "./token.css";\n\n';

  css +=
    "@theme { --color-bgbackground: #ffffff; --color-base-dark: #0a0a0a; --color-accent: #your-color; }";

  for (const [tailwindClass, obfuscatedName] of Object.entries(mapping)) {
    css += `.${obfuscatedName} { @apply ${tailwindClass}; }\n`;
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

  // Already imported, skip
  if (content.includes(importLine)) {
    console.log("✅ Import already exists in layout.tsx");
    return;
  }

  // Add after the last import line
  const lastImportIndex = content.lastIndexOf("import ");
  const endOfLastImport = content.indexOf("\n", lastImportIndex);

  content =
    content.slice(0, endOfLastImport + 1) +
    importLine +
    "\n" +
    content.slice(endOfLastImport + 1);

  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("✅ Added import to layout.tsx");
}
async function main() {
  try {
    console.log("\n🚀 Starting Tailwind class obfuscation...\n");

    const classes = await scanForClasses();

    if (classes.size === 0) {
      console.log("⚠️  No Tailwind classes found. Skipping obfuscation.");
      return;
    }

    const mapping = createClassMapping(classes);
    await replaceAllClasses(mapping);
    generateMappingCss(mapping);
    addImportToLayout(); // ✅ add this
    saveMapping(mapping);

    console.log("\n✅ Obfuscation complete!\n");
    console.log(`   - Classes obfuscated: ${classes.size}`);
    console.log(`   - CSS file: ${CONFIG.outputCssPath}`);
    console.log(`   - Mapping file: ${CONFIG.mapFilePath}\n`);
  } catch (err) {
    console.error("❌ Error during obfuscation:", err);
    process.exit(1);
  }
}

main();
