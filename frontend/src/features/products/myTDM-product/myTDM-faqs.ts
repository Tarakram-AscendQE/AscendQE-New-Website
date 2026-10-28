import type { FAQItem } from "@/shared/faq's accordians/page";

export const MYTDM_FAQS: FAQItem[] = [
  {
    question: "What is myTDM?",
    answer:
      "myTDM is an AI-powered Test Data Management platform that helps enterprises discover test-data needs, generate data, protect sensitive information, validate datasets, provision test data and reuse trusted data assets.",
  },
  {
    question: "Does myTDM generate synthetic test data?",
    answer:
      "Yes.\n\nmyTDM can generate realistic, scenario-specific synthetic test data based on application schemas, relationships, constraints and testing requirements.",
  },
  {
    question: "How does myTDM protect sensitive data?",
    answer:
      "myTDM supports capabilities such as sensitive-data identification, masking and privacy protection while preserving the relationships and usability required for testing.",
  },
  {
    question: "Can myTDM create subsets of production-like data?",
    answer:
      "Yes. myTDM can support intelligent data subsetting so testing teams can work with smaller, relevant datasets while maintaining required relationships and consistency.",
  },
  {
    question: "How does myTDM handle application or schema changes?",
    answer:
      "myTDM can detect changes that affect existing test datasets and help determine whether data needs to be regenerated, transformed or revalidated.",
  },
  {
    question: "Can test data created by myTDM be reused?",
    answer:
      "Yes.\n\nmyTDM is designed to create governed, reusable test-data assets that can support regression suites, automation, APIs, integration testing and repeatable business scenarios.",
  },
];
