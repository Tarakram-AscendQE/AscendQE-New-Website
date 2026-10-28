export interface BriefData {
  offer: 'challenge' | 'platform' | 'managed';
  application: string;
  scope: string;
}

export function generateBriefText(data: BriefData): string {
  const offerLabel = 
    data.offer === 'platform' ? 'Private enterprise platform' :
    data.offer === 'managed' ? 'Managed services' : 
    'First 100 free test cases';

  return `AscendQE — Evaluation enquiry
Code fast. Test faster.

Interest: ${offerLabel}
Application: ${data.application}

Test cases and acceptance criteria:
${data.scope}

Commercial context: Private enterprise platform from $25,000/month with a 12-month commitment ($300,000/year), agreed scope and capacity; operating costs additional. Managed services separately scoped. First 100 qualifying test cases automated free, subject to agreed access, scope and acceptance criteria.
`;
}

export function downloadFile(content: string, filename: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function createMailtoUrl(data: BriefData): string {
  const subject = encodeURIComponent('AscendQE — first 100 test cases enquiry');
  const body = encodeURIComponent(generateBriefText(data));
  return `mailto:Info@ascendqe.com?subject=${subject}&body=${body}`;
}

