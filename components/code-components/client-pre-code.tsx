'use client';

import { CopyButton } from './copy-button';
import { cn } from '@/lib/utils';

export function ClientPreCode({
  html,
  raw,
  className,
}: {
  html: string;
  raw: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-950/95',
        className
      )}
    >
      <div className='flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80'>
        <span className='text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400'>
          Code
        </span>
        <CopyButton
          code={raw}
          classname='static border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
        />
      </div>

      <div
        className='[&_pre]:m-0 [&_pre]:max-h-[550px] [&_pre]:overflow-x-auto [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4 [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-6'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
