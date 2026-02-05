/**
 * FAQ Section Component
 * Displays FAQs visually on the page for users
 */

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <button
              onClick={() => toggleFAQ(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFAQ(index);
                }
              }}
              className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2 rounded-lg"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-slate-900 dark:text-slate-50 pr-4 flex-1">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
              )}
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-4 sm:px-6 pb-4 text-slate-600 dark:text-slate-300 leading-relaxed"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
