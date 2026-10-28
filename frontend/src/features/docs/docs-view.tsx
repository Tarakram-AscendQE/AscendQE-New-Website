import React from 'react';
import { productBriefMarkdown, llmsTxtContent } from '../../data/docsData';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { downloadFile } from '../../utils/download';
import { FileText, Bot, ArrowRight, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocsView: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Quick Downloads Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card variant="default" className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-light text-blue flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-ink">Product Specification Brief</h4>
              <p className="aqe-caption text-ink-muted">Markdown summary for teams and review</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => downloadFile(productBriefMarkdown, 'product-brief.md', 'text/markdown')}
          >
            Download .md
          </Button>
        </Card>

        <Card variant="default" className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-navy text-white flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-ink">LLM Agent Index (llms.txt)</h4>
              <p className="aqe-caption text-ink-muted">Machine-readable index for AI agents</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => downloadFile(llmsTxtContent, 'llms.txt', 'text/plain')}
          >
            Download llms.txt
          </Button>
        </Card>
      </div>

      {/* Structured Technical Topics */}
      <div className="space-y-8">
        {/* Connected Quality Workflow */}
        <section className="bg-white rounded-3xl border border-surface-border p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-light text-blue">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold text-ink">Connected Quality Workflow</h3>
          </div>
          <p className="text-ink-muted leading-relaxed mb-4">
            Automate agreed test cases, execute them, inspect gaps, connect change impact, and prioritize what to test next. The proposed enterprise scope combines capabilities across AscendQE’s products; exact modules, integrations, dependencies, and acceptance measures must be contracted together.
          </p>
          <p className="text-ink-muted leading-relaxed">
            The platform architecture describes <strong>mySDET</strong> for test automation, execution, failure analysis, controlled healing, and change impact, alongside <strong>mySTLC</strong> for requirements, traceability, and release readiness. These function as complementary modules within the unified platform.
          </p>
        </section>

        {/* Application Coverage & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl border border-surface-border p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-light text-blue">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-ink">Application Coverage</h3>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed mb-3">
              Published capabilities span web UI, APIs, mobile applications (iOS/Android), database validation, and end-to-end business journeys.
            </p>
            <p className="aqe-caption text-ink-muted leading-relaxed bg-surface-subtle p-3 rounded-xl border border-surface-border">
              Specific iOS/Android versions, device matrix support, browsers, and target frameworks are formally confirmed during the initial scoping phase. We make no unverified "automate anything" claims.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-surface-border p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-navy text-white">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-ink">Private Deployment & Security</h3>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed mb-3">
              Enterprise customer code, test artifacts, and execution telemetry remain strictly inside the client’s designated private cloud / VPC perimeter.
            </p>
            <p className="aqe-caption text-ink-muted leading-relaxed bg-surface-subtle p-3 rounded-xl border border-surface-border">
              Deployment boundaries, access controls, model provider endpoints (AWS Bedrock, Azure OpenAI, GCP Vertex, or self-hosted), and security protocols are agreed prior to onboarding.
            </p>
          </section>
        </div>

        {/* Commercial Assumptions */}
        <section className="bg-white rounded-3xl border border-surface-border p-8 sm:p-10 shadow-sm" id="commercial">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-light text-blue">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold text-ink">Commercial Assumptions & Considerations</h3>
          </div>
          <ul className="space-y-3 text-sm text-ink-muted leading-relaxed list-disc list-inside">
            <li><strong>Private enterprise platform:</strong> Starts at $25,000/month ($300,000/year), with agreed capacity and deployment configuration.</li>
            <li><strong>Operating costs & extras:</strong> Infrastructure operating costs, bespoke engineering, and managed services are additional unless explicitly contracted.</li>
            <li><strong>Starting term commitment:</strong> Current agreed starting offer is billed monthly with a mandatory 12-month commitment. This supersedes earlier $299K/$349K proposals.</li>
            <li><strong>Accounting treatment:</strong> Monthly billing does not dictate CapEx vs OpEx classification. Accounting policy and the formal contract determine enterprise treatment.</li>
            <li><strong>First 100 test cases:</strong> 100 qualifying test cases automated free, subject to agreed access and explicit acceptance criteria.</li>
          </ul>
        </section>

        {/* Link to Reference */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-ink text-base">Looking for the full product catalog?</h4>
            <p className="aqe-caption text-ink-muted">Explore all 22 topics covering myDiya, mySDET, mySTLC, myTEVV, myP95, and services.</p>
          </div>
          <Link to="/reference">
            <Button variant="primary" size="sm">
              Browse Reference Catalog
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

