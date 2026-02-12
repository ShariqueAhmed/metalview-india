/**
 * People Also Ask Component
 * Displays common search questions with answers
 * Optimized for "People Also Ask" featured snippets
 */

'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface PeopleAlsoAskItem {
  question: string;
  answer: string;
}

interface PeopleAlsoAskProps {
  questions: PeopleAlsoAskItem[];
  title?: string;
}

export default function PeopleAlsoAsk({ questions, title = 'People Also Ask' }: PeopleAlsoAskProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
          <HelpCircle className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h2>
      </div>
      <div className="space-y-3">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <button
              onClick={() => toggleQuestion(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleQuestion(index);
                }
              }}
              className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 rounded-lg"
              aria-expanded={openIndex === index}
              aria-controls={`paa-answer-${index}`}
            >
              <span className="font-semibold text-slate-900 dark:text-slate-50 pr-4 flex-1 text-base">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
              )}
            </button>
            {openIndex === index && (
              <div
                id={`paa-answer-${index}`}
                className="px-4 sm:px-6 pb-4 text-slate-600 dark:text-slate-300 leading-relaxed"
                role="region"
                aria-labelledby={`paa-question-${index}`}
              >
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
