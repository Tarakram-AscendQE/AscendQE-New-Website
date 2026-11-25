// Contact enquiry & job application emails (ported from the previous AscendQE backend).
import type { Request, Response } from 'express';
import multer from 'multer';
import { sendSesEmail } from '../services/emailService.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SEND_FAILED_MESSAGE = 'We could not send your message. Please email hello@ascendqe.com directly.';

/** Resume uploads for job applications: in memory, PDF/DOC/DOCX, max 2 MB. */
export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^(pdf|doc|docx)$/i.test(file.originalname.split('.').pop() || '')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed for resumes.'));
    }
  },
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** First non-empty value among the given form field names, as a trimmed string. */
function field(body: Record<string, unknown>, ...names: string[]): string {
  for (const name of names) {
    const value = String(body[name] ?? '').trim();
    if (value) return value;
  }
  return '';
}

function sendJson(res: Response, status: number, success: boolean, message: string, data?: object): void {
  res.status(status).json({ success, message, ...(data ? { data } : {}), timestamp: Date.now() });
}

/** One table row of the email. `valueHtml` must already be escaped. */
function row(label: string, valueHtml: string, top = false): string {
  const align = top ? ' vertical-align: top;' : '';
  return `<tr><td style="padding: 6px 0; color: #64748b; width: 160px;${align}"><strong>${label}:</strong></td><td style="padding: 6px 0;">${valueHtml}</td></tr>`;
}

function emailHtml(heading: string, source: string, headingColor: string, rows: string[]): string {
  return (
    `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">` +
    `<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">` +
    `<h2 style="color: ${headingColor}; margin-top: 0;">${escapeHtml(heading)}</h2>` +
    `<p style="color: #64748b; font-size: 13px;">Submitted on ${source}</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">` +
    `<table style="width: 100%; border-collapse: collapse;">${rows.join('')}</table></div></body></html>`
  );
}

const multiline = (value: string) => escapeHtml(value).replace(/\n/g, '<br>');

/** POST /api/send-mail: contact & evaluation enquiries. */
export async function handleContactEnquiry(req: Request, res: Response): Promise<void> {
  const data: Record<string, unknown> = req.body || {};

  // Forms with one "name" field (the Lean site Start page) send `name`; it is split into first/last.
  const fullName = field(data, 'name');
  const [nameFirst = '', ...nameRest] = fullName.split(/\s+/);
  const firstName = field(data, 'firstName', 'first_name') || nameFirst;
  const lastName = field(data, 'lastName', 'last_name') || nameRest.join(' ');
  const email = field(data, 'email', 'workEmail', 'work_email');
  const company = field(data, 'company');
  const jobTitle = field(data, 'jobTitle', 'job_title');
  const phone = field(data, 'phone');
  const interest = field(data, 'interest', 'offer');
  const teamSize = field(data, 'teamSize', 'team_size');
  const application = field(data, 'application', 'product');
  const scope = field(data, 'scope');
  const message = field(data, 'message', 'comments');
  const formType = field(data, 'formType');

  // A last name is required unless the form has a single name field.
  if (!firstName || (!lastName && !fullName) || !email || !company) {
    sendJson(res, 422, false, 'Please complete all required fields (First Name, Last Name, Work Email, Company).');
    return;
  }
  const lengthLimits: [string, string, number][] = [
    ['First Name', firstName, 30],
    ['Last Name', lastName, 30],
    ['Job Title', jobTitle, 40],
    ['Company', company, 40],
    ['Application', application, 40],
    ['Scope', scope, 200],
    ['Message', message, 2000],
  ];
  const tooLong = lengthLimits.find(([, value, max]) => value.length > max);
  if (tooLong) {
    sendJson(res, 422, false, `${tooLong[0]} max ${tooLong[2]} characters.`);
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    sendJson(res, 422, false, 'Please enter a valid email address.');
    return;
  }

  let subject: string;
  let heading: string;
  if (formType === 'pricing' || teamSize !== '') {
    subject = `New Pricing Consultation Request - ${firstName} ${lastName}`;
    heading = 'New Pricing Consultation / Proposal Request';
  } else if (formType === 'contact' || application !== '') {
    subject = `New Contact Enquiry - ${firstName} ${lastName}${company ? ` (${company})` : ''}`;
    heading = 'New Contact & Evaluation Enquiry';
  } else {
    subject = `New Schedule a Demo Request - ${firstName} ${lastName}`;
    heading = 'New Schedule a Demo Request';
  }

  const showMessage = message && message !== scope;
  const rows = [
    row('Name', `${escapeHtml(firstName)} ${escapeHtml(lastName)}`),
    row('Work Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`),
    row('Company', escapeHtml(company)),
    jobTitle && row('Job Title', escapeHtml(jobTitle)),
    phone && row('Phone', escapeHtml(phone)),
    application && row('Application / Project', escapeHtml(application)),
    interest && row('Area of Interest / Offer', escapeHtml(interest)),
    scope && row('Test Cases & Criteria', multiline(scope), true),
    teamSize && row('Team Size', escapeHtml(teamSize)),
    showMessage && row('Message', multiline(message), true),
  ].filter((value): value is string => Boolean(value));

  let text = `${heading} on ascendqe.com\n\n`;
  text += `Name: ${firstName} ${lastName}\nWork Email: ${email}\nCompany: ${company}\n`;
  if (jobTitle) text += `Job Title: ${jobTitle}\n`;
  if (phone) text += `Phone: ${phone}\n`;
  if (application) text += `Application / Project: ${application}\n`;
  if (interest) text += `Interest / Offer: ${interest}\n`;
  if (scope) text += `Test Cases & Criteria:\n${scope}\n`;
  if (teamSize) text += `Team Size: ${teamSize}\n`;
  if (showMessage) text += `Message:\n${message}\n`;

  const result = await sendSesEmail({
    subject,
    htmlBody: emailHtml(heading, 'ascendqe.com', '#0284c7', rows),
    textBody: text,
    replyTo: email,
  });

  if (!result.success) {
    sendJson(res, 500, false, SEND_FAILED_MESSAGE);
    return;
  }
  sendJson(res, 200, true, 'Thank you! We will be in touch within 24 hours.', { messageId: result.messageId });
}

/** POST /api/apply-job: career applications with an optional resume. */
export async function handleJobApplication(req: Request, res: Response): Promise<void> {
  const data: Record<string, unknown> = req.body || {};

  const firstName = field(data, 'firstName', 'first_name');
  const lastName = field(data, 'lastName', 'last_name');
  const email = field(data, 'email');
  const phone = field(data, 'phone');
  const jobTitle = field(data, 'jobTitle', 'job_title') || 'General Application';
  const experience = field(data, 'experience');
  const linkedin = field(data, 'linkedin');
  const coverLetter = field(data, 'coverLetter', 'cover_letter');

  if (!firstName || !lastName || !email) {
    sendJson(res, 422, false, 'Please complete all required fields (First Name, Last Name, Email).');
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    sendJson(res, 422, false, 'Please enter a valid email address.');
    return;
  }

  const subject = `New Job Application: ${jobTitle} - ${firstName} ${lastName}`;
  const heading = `New Job Application: ${jobTitle}`;
  const file = req.file;

  const rows = [
    row('Candidate Name', `${escapeHtml(firstName)} ${escapeHtml(lastName)}`),
    row('Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`),
    phone && row('Phone', escapeHtml(phone)),
    experience && row('Experience', `${escapeHtml(experience)} years`),
    linkedin && row('LinkedIn', `<a href="${escapeHtml(linkedin)}" target="_blank">${escapeHtml(linkedin)}</a>`),
    coverLetter && row('Cover Letter', multiline(coverLetter), true),
    file && row('Resume Attachment', `${escapeHtml(file.originalname)} (${(file.size / 1024).toFixed(0)} KB)`),
  ].filter((value): value is string => Boolean(value));

  let text = `${heading} on ascendqe.com/careers\n\n`;
  text += `Candidate: ${firstName} ${lastName}\nEmail: ${email}\n`;
  if (phone) text += `Phone: ${phone}\n`;
  if (experience) text += `Experience: ${experience} years\n`;
  if (linkedin) text += `LinkedIn: ${linkedin}\n`;
  if (coverLetter) text += `Cover Letter:\n${coverLetter}\n`;
  if (file) text += `Attached Resume: ${file.originalname}\n`;

  const result = await sendSesEmail({
    subject,
    htmlBody: emailHtml(heading, 'ascendqe.com/careers', '#1763ff', rows),
    textBody: text,
    replyTo: email,
    attachment: file
      ? { filename: file.originalname, content: file.buffer, contentType: file.mimetype || 'application/octet-stream' }
      : undefined,
  });

  if (!result.success) {
    sendJson(res, 500, false, SEND_FAILED_MESSAGE);
    return;
  }
  sendJson(
    res,
    200,
    true,
    'Application submitted successfully! We will review your application and get back to you soon.',
    {
      messageId: result.messageId,
    }
  );
}
