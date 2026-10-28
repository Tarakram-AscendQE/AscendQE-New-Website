import React from 'react';
import { pricingFaqs } from '../../data/pricingPlans';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';

export const PricingFaq: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm mt-12">
      <h3 className="text-xl sm:text-2xl font-bold text-ink mb-6">
        Frequently Asked Commercial Questions
      </h3>

      <Accordion type="single" collapsible defaultValue="item-0">
        {pricingFaqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

