import type { FAQItem } from "@/shared/faq's accordians/page";

export const MYUT_FAQS: FAQItem[] = [
  {
    question: "What is myUT?",
    answer:
      "myUT is an AI-powered Unit Testing platform that helps engineering teams understand application code, identify testable units, generate unit tests and continuously improve developer-level test coverage.",
  },
  {
    question: "Can myUT generate unit tests automatically?",
    answer:
      "Yes. myUT can analyze application code and generate unit tests based on code behavior, dependencies, branches and testing opportunities.",
  },
  {
    question: "Does myUT only focus on code coverage?",
    answer:
      "No.\n\nCoverage is one signal.\n\nmyUT aims to improve the quality and relevance of unit tests, including behavioral scenarios, boundary conditions, negative cases and areas where existing tests may be insufficient.",
  },
  {
    question: "Who would normally use myUT?",
    answer:
      "myUT is primarily useful for developers, engineering teams, development leads and Quality Engineering teams seeking to strengthen quality earlier in the Software Development Lifecycle.",
  },
  {
    question: "Can myUT work with existing projects?",
    answer:
      "Yes. myUT is intended to analyze existing codebases and work alongside established development and unit-testing frameworks.",
  },
];
