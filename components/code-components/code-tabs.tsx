import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { highlightCode } from '@/lib/shiki-highlighter';

import { CopyButton } from './copy-button';

type CodeBlockNode = {
  props?: {
    children?: {
      props?: {
        children?: string;
        className?: string;
      };
    };
  };
};

export default async function CodeWithTabs({ children }: { children: ReactNode }) {
  const blocks = Array.isArray(children) ? children : [children];
  const parsed = (blocks as CodeBlockNode[]).map((node) => {
    const codeNode = node?.props?.children?.props;

    return {
      value: codeNode?.children || '',
      lang: codeNode?.className?.replace('language-', '') || 'txt',
    };
  });

  const highlighted = await Promise.all(
    parsed.map(({ value, lang }) => highlightCode(value, lang))
  );

  if (parsed.length === 1) {
    return (
      <div className='relative my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-950/95'>
        <div className='flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80'>
          <span className='text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400'>
            {parsed[0].lang}
          </span>
          <CopyButton
            code={parsed[0].value}
            classname='static border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
          />
        </div>
        <div
          className='[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4 [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-6'
          dangerouslySetInnerHTML={{ __html: highlighted[0] }}
        />
      </div>
    );
  }

  const tabs = parsed.map((tab, index) => ({
    value: `snippet-${index + 1}`,
    label: tab.lang.toUpperCase(),
    html: highlighted[index],
    code: tab.value,
  }));

  return (
    <Tabs
      defaultValue={tabs[0].value}
      className='my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-950/95'
    >
      <div className='flex flex-col gap-3 border-b border-slate-200/80 px-4 py-3 md:flex-row md:items-center md:justify-between dark:border-slate-800/80'>
        <TabsList className='h-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-900'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='min-w-20 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase data-active:bg-white data-active:text-slate-900 dark:text-slate-400 dark:data-active:bg-slate-950 dark:data-active:text-slate-100'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='m-0'>
          <div className='flex justify-end px-4 pt-3'>
            <CopyButton
              code={tab.code}
              classname='static border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
            />
          </div>
          <div
            className='[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4 [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-6'
            dangerouslySetInnerHTML={{ __html: tab.html }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
