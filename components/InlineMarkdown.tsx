import type React from 'react';

import { stripSimpleMarkdown } from '@/utils/markdownText';

interface InlineMarkdownProps {
  text: string;
  strongClassName?: string;
}

export function renderInlineMarkdown(
  text: string,
  strongClassName = 'font-semibold text-slate-900 dark:text-slate-100'
): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${stripSimpleMarkdown(part)}-${index}`} className={strongClassName}>
          {stripSimpleMarkdown(part)}
        </strong>
      );
    }

    return part;
  });
}

export default function InlineMarkdown({ text, strongClassName }: InlineMarkdownProps) {
  return <>{renderInlineMarkdown(text, strongClassName)}</>;
}
