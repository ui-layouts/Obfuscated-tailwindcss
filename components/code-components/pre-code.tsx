import { highlightCode } from "@/lib/shiki-highlighter";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";
import { CopyNpmCommandButton } from "./copy-npm-button";

const codeShellClassName =
  "not-prose overflow-x-auto rounded-lg border border-border bg-neutral-100";

const codeHeaderClassName =
  "flex items-center justify-between gap-3 border-b border-border/80 px-4 py-1";

const codeBodyClassName =
  "[&_pre]:m-0 [&_pre]:max-h-[550px] [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4 [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-6";

export async function PreCode({
  codeblock,
  classname,
  cssclass,
  metahide,
}: {
  codeblock: { value: string; lang: string; meta: string };
  classname?: string;
  cssclass?: string;
  metahide?: boolean;
}) {
  const { value, lang, meta } = codeblock;
  const normalizedLang = lang || "txt";
  const highlightedHtml = await highlightCode(value, normalizedLang);
  const isPackageInstallCommand = /^npm\s+(install|i)\b/.test(value.trim());
  const label =
    normalizedLang === "bash" ? "Terminal" : normalizedLang.toUpperCase();

  return (
    <div className={cn("relative not-prose", classname, cssclass)}>
      {!metahide && meta && (
        <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {meta}
        </div>
      )}

      <div className={codeShellClassName}>
        <div className={codeHeaderClassName}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-chart-1" />
              <span className="h-2 w-2 rounded-full bg-chart-2" />
              <span className="h-2 w-2 rounded-full bg-chart-3" />
            </div>
            <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {label}
            </span>
          </div>

          {isPackageInstallCommand ? (
            <CopyNpmCommandButton code={value} classname="border-border" />
          ) : (
            <CopyButton code={value} classname="border-border" />
          )}
        </div>

        <div
          className={codeBodyClassName}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>
    </div>
  );
}
