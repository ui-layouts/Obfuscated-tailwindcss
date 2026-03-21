import { highlightCode } from '@/lib/shiki-highlighter';
import { cn } from '@/lib/utils';

import { CopyButton } from './copy-button';
import { CopyNpmCommandButton } from './copy-npm-button';

const codeShellClassName =
  'not-prose overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-950/95';

const codeHeaderClassName =
  'flex items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80';

const codeBodyClassName =
  '[&_pre]:m-0 [&_pre]:max-h-[550px] [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4 [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-6';

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
  const normalizedLang = lang || 'txt';
  const highlightedHtml = await highlightCode(value, normalizedLang);
  const isPackageInstallCommand = /^npm\s+(install|i)\b/.test(value.trim());
  const label = normalizedLang === 'bash' ? 'Terminal' : normalizedLang.toUpperCase();

  return (
    <div className={cn('relative my-5', classname, cssclass)}>
      {!metahide && meta && (
        <div className='mb-2 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium tracking-wide text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'>
          {meta}
        </div>
      )}

      <div className={codeShellClassName}>
        <div className={codeHeaderClassName}>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1.5'>
              <span className='h-2.5 w-2.5 rounded-full bg-rose-400/90' />
              <span className='h-2.5 w-2.5 rounded-full bg-amber-400/90' />
              <span className='h-2.5 w-2.5 rounded-full bg-emerald-400/90' />
            </div>
            <span className='text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400'>
              {label}
            </span>
          </div>

          {isPackageInstallCommand ? (
            <CopyNpmCommandButton
              code={value}
              classname='static border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
            />
          ) : (
            <CopyButton
              code={value}
              classname='static border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
            />
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
