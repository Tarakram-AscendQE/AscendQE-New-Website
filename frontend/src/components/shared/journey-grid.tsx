import React from 'react';
import { Container } from '../ui/container';
import { SectionHeading } from './section-heading';
import { Monitor, Workflow, Smartphone, Database, Route } from 'lucide-react';

const journeys = [
  {
    title: 'Web',
    subtitle: 'UI workflows',
    icon: Monitor,
    description: 'Dynamic browser flows, complex form states, responsive layouts, and cross-browser consistency.',
  },
  {
    title: 'API',
    subtitle: 'Connected services',
    icon: Workflow,
    description: 'REST, GraphQL, and microservice payload contracts, authentication, error recovery, and schemas.',
  },
  {
    title: 'Mobile',
    subtitle: 'Application journeys',
    icon: Smartphone,
    description: 'iOS and Android user flows, deep links, native gestures, and simulated real-world device contexts.',
  },
  {
    title: 'Data',
    subtitle: 'Database validation',
    icon: Database,
    description: 'State verification, schema constraints, migration sanity, and transactional integrity.',
  },
  {
    title: 'End to end',
    subtitle: 'Business outcomes',
    icon: Route,
    description: 'Cross-system business journeys connecting user actions directly to backend fulfillment.',
  },
];

export const JourneyGrid: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-surface-border">
      <Container size="xl">
        <SectionHeading
          eyebrow="ACROSS THE JOURNEY"
          title={
            <>
              One journey.<br />
              <span className="text-ink-muted">More than one screen.</span>
            </>
          }
          subtitle="Real enterprise testing crosses frontends, backends, databases, and microservices. AscendQE connects the entire chain."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {journeys.map((j) => {
            const Icon = j.icon;
            return (
              <div
                key={j.title}
                className="group p-6 rounded-2xl bg-surface-subtle border border-surface-border hover:border-blue hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-light text-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">{j.title}</h3>
                  <span className="text-xs font-semibold text-blue tracking-wide uppercase block mt-0.5 mb-3">
                    {j.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {j.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-ink-muted/80 text-center">
          Supported applications, frameworks, devices and environments are confirmed during scoping.
        </p>
      </Container>
    </section>
  );
};

