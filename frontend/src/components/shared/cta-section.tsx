import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Badge } from '../ui/badge';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-surface-subtle border-t border-surface-border">
      <Container size="lg">
        <div className="bg-navy rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          {/* Subtle background glow effect */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <Badge variant="blue" className="mb-4">START WITH PROOF</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
              Your first 100 test cases.<br />
              <span className="text-blue-muted">Automated free.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              See the scripts. Run the tests. Measure the difference before committing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/start">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  Automate my first 100 test cases
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-blue-muted shrink-0" />
              <span>100 qualifying test cases. Agreed scope, access, and acceptance criteria apply.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

