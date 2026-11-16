import type { FAQItem } from "@/shared/faq's accordians/page";

export const PRCHECK_FAQS: FAQItem[] = [
  {
    question: "Does it replace our testing?",
    answer:
      "No. Your tests check that features work. PRCheck.live checks that every change still obeys your enterprise rules, independently.",
  },
  {
    question: "Where do the rules come from?",
    answer:
      "From the controls you already have: internal policies, regulatory directions, audit findings. We turn the ones that apply into checkable rules your owners approve.",
  },
  {
    question: "Who writes the checks?",
    answer:
      "An independent assurance team, from the policies. Never the team whose change is being checked.",
  },
  {
    question: "How do we start?",
    answer:
      "With one critical application and five or six high-risk rules. Most of the value shows on the first pull request.",
  },
];
