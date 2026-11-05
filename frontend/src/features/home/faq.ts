
import type { FAQItem } from "@/shared/faq's accordians/page";

export const MYP95_FAQS: FAQItem[] = [
  {
    question: "How does myP95 improve application performance?",
    answer:
      "myP95 helps engineering teams evaluate application behavior under different workloads, analyze performance metrics, identify bottlenecks and make data-driven optimization decisions.",
  },
  {
    question: "Which performance metrics can teams monitor?",
    answer:
      "Teams can evaluate key performance indicators such as response time, latency percentiles, throughput, error rates and resource utilization, depending on the available integrations and telemetry sources.",
  },
  {
    question: "How does myP95 help identify performance bottlenecks?",
    answer:
      "myP95 helps correlate performance test results with relevant engineering telemetry to investigate slow requests, resource constraints and potential bottlenecks.",
  },
  {
    question: "Can teams compare performance across test runs?",
    answer:
      "Repeatable performance testing helps teams compare results across test runs, identify regressions and understand how application behavior changes after code, configuration or infrastructure updates.",
  },
  {
    question: "How can myP95 fit into a CI/CD pipeline?",
    answer:
      "Performance testing workflows can be incorporated into software delivery processes to evaluate performance changes before release. The available automation options depend on the platform's supported integrations.",
  },
];
