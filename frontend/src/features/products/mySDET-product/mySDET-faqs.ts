import type { FAQItem } from "@/shared/faq's accordians/page";

export const MYSDET_FAQS: FAQItem[] = [
  {
    question: "What is mySDET?",
    answer:
      "mySDET is an AI-powered Test Automation platform designed to discover applications, generate automation, execute tests, analyze failures, heal selected automation issues and continuously adapt tests as software changes.",
  },
  {
    question: "What types of applications can mySDET automate?",
    answer:
      "mySDET is designed to support:\n\n• Web UI\n• API\n• Mobile applications\n• Web + API testing\n• End-to-end business journeys",
  },
  {
    question: "Does mySDET only generate test scripts?",
    answer:
      "No.\n\nmySDET covers a broader automation lifecycle including application discovery, scenario identification, test-data support, automation generation, execution, evidence collection, failure analysis, healing and change-impact analysis.",
  },
  {
    question: "Does mySDET support existing automation repositories?",
    answer:
      "Yes. mySDET can work with existing repositories and understand established project structures and automation patterns.\n\nFor new projects, standardized automation repository structures can also be provisioned.",
  },
  {
    question: "How does self-healing work in mySDET?",
    answer:
      "When automation fails, mySDET can analyze the failure, identify likely causes and apply controlled healing strategies where appropriate.\n\nHealing is intended to be evidence-based and governed, rather than silently changing tests without visibility.",
  },
];
