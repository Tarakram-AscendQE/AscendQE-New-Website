import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Textarea } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { BriefData, createMailtoUrl, downloadFile, generateBriefText } from '../../utils/download';
import { Mail, Download, Info } from 'lucide-react';

export const BriefForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const initialOffer = (searchParams.get('offer') as BriefData['offer']) || 'challenge';

  const [formData, setFormData] = useState<BriefData>({
    application: '',
    offer: ['platform', 'managed', 'challenge'].includes(initialOffer) ? initialOffer : 'challenge',
    scope: '',
  });

  useEffect(() => {
    const offerParam = searchParams.get('offer');
    if (offerParam && ['platform', 'managed', 'challenge'].includes(offerParam)) {
      setFormData((prev) => ({ ...prev, offer: offerParam as BriefData['offer'] }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.application || !formData.scope) return;

    const mailtoUrl = createMailtoUrl(formData);
    window.location.href = mailtoUrl;
    setStatusMessage('Email draft requested in your default mail application. Review and send it to Info@ascendqe.com.');
  };

  const handleDownload = () => {
    if (!formData.application || !formData.scope) {
      setStatusMessage('Please fill in your application name and scope details before downloading.');
      return;
    }

    const briefText = generateBriefText(formData);
    downloadFile(briefText, 'AscendQE-evaluation-brief.txt');
    setStatusMessage('Evaluation brief downloaded to your local device. You can attach it to an email for Info@ascendqe.com.');
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-ink">
          Let’s start with your application
        </h3>
        <p className="text-sm text-ink-muted mt-1">
          Prepare your evaluation brief. We do not require proprietary source code to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
            Target Application or Project *
          </label>
          <Input
            required
            placeholder="e.g. Core Banking Portal, Checkout API, Mobile App"
            value={formData.application}
            onChange={(e) => setFormData({ ...formData, application: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
            What would help your team?
          </label>
          <select
            className="flex h-11 w-full rounded-lg border border-surface-border bg-white px-3.5 py-2 text-sm text-ink ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue transition-colors"
            value={formData.offer}
            onChange={(e) => setFormData({ ...formData, offer: e.target.value as BriefData['offer'] })}
          >
            <option value="challenge">First 100 free test cases (Evaluation Hook)</option>
            <option value="platform">Private enterprise platform ($25K/month)</option>
            <option value="managed">Managed services (Scoped delivery)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
            Test cases and acceptance criteria *
          </label>
          <Textarea
            required
            rows={5}
            placeholder="Describe the business scenarios or flows you would like to automate and evaluate..."
            value={formData.scope}
            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button type="submit" size="lg" className="w-full sm:w-auto flex-1">
            <Mail className="h-4 w-4 mr-2" />
            Prepare my enquiry
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleDownload}
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Download brief instead
          </Button>
        </div>

        <p className="aqe-caption text-ink-muted text-center sm:text-left">
          Opens a draft in your email application. Nothing is sent automatically without your explicit review.
        </p>

        {statusMessage && (
          <div className="p-4 rounded-xl bg-blue-light border border-blue/20 flex items-start gap-3 text-xs sm:text-sm text-blue">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <p>{statusMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};
