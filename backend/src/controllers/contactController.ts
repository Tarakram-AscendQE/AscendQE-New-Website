// Contact & Job Application Email Controller
// Replaces legacy PHP endpoints with native Express handlers

import { Request, Response } from 'express'
import multer from 'multer'
import { sendSesEmail } from '../services/emailService.js'

// Multer memory storage for resume uploads (max 2MB)
export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = /pdf|doc|docx/i
    if (allowed.test(file.originalname.split('.').pop() || '')) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed for resumes.'))
    }
  },
})

// Escape HTML entities to prevent injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Handle Contact & Evaluation Enquiries (/send-mail.php and /api/send-mail)
 */
export async function handleContactEnquiry(req: Request, res: Response): Promise<void> {
  const data = req.body || {}

  const firstName = String(data.firstName || data.first_name || '').trim()
  const lastName = String(data.lastName || data.last_name || '').trim()
  const email = String(data.email || data.workEmail || data.work_email || '').trim()
  const company = String(data.company || '').trim()
  const jobTitle = String(data.jobTitle || data.job_title || '').trim()
  const phone = String(data.phone || '').trim()
  const interest = String(data.interest || data.offer || '').trim()
  const teamSize = String(data.teamSize || data.team_size || '').trim()
  const application = String(data.application || data.product || '').trim()
  const scope = String(data.scope || '').trim()
  const message = String(data.message || data.comments || '').trim()
  const formType = String(data.formType || '').trim()

  if (!firstName || !lastName || !email || !company) {
    res.status(422).json({
      success: false,
      message: 'Please complete all required fields (First Name, Last Name, Work Email, Company).',
    })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email)) {
    res.status(422).json({
      success: false,
      message: 'Please enter a valid email address.',
    })
    return
  }

  // Determine subject and heading
  const isPricing = formType === 'pricing' || teamSize !== ''
  let subject = ''
  let heading = ''

  if (isPricing) {
    subject = `New Pricing Consultation Request - ${firstName} ${lastName}`
    heading = 'New Pricing Consultation / Proposal Request'
  } else if (formType === 'contact' || application !== '') {
    subject = `New Contact Enquiry - ${firstName} ${lastName}${company ? ` (${company})` : ''}`
    heading = 'New Contact & Evaluation Enquiry'
  } else {
    subject = `New Schedule a Demo Request - ${firstName} ${lastName}`
    heading = 'New Schedule a Demo Request'
  }

  // Build HTML table body
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">`
  html += `<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">`
  html += `<h2 style="color: #0284c7; margin-top: 0;">${escapeHtml(heading)}</h2>`
  html += `<p style="color: #64748b; font-size: 13px;">Submitted on ascendqe.com</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">`
  html += `<table style="width: 100%; border-collapse: collapse;">`
  html += `<tr><td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Name:</strong></td><td style="padding: 6px 0;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>`
  html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Work Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>`
  html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 6px 0;">${escapeHtml(company)}</td></tr>`

  if (jobTitle) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Job Title:</strong></td><td style="padding: 6px 0;">${escapeHtml(jobTitle)}</td></tr>`
  if (phone) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>`
  if (application) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Application / Project:</strong></td><td style="padding: 6px 0;">${escapeHtml(application)}</td></tr>`
  if (interest) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Area of Interest / Offer:</strong></td><td style="padding: 6px 0;">${escapeHtml(interest)}</td></tr>`
  if (scope) html += `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Test Cases & Criteria:</strong></td><td style="padding: 6px 0;">${escapeHtml(scope).replace(/\n/g, '<br>')}</td></tr>`
  if (teamSize) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Team Size:</strong></td><td style="padding: 6px 0;">${escapeHtml(teamSize)}</td></tr>`
  if (message && message !== scope) html += `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 6px 0;">${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>`

  html += `</table></div></body></html>`

  // Build plain text fallback
  let text = `${heading} on ascendqe.com\n\n`
  text += `Name: ${firstName} ${lastName}\n`
  text += `Work Email: ${email}\n`
  text += `Company: ${company}\n`
  if (jobTitle) text += `Job Title: ${jobTitle}\n`
  if (phone) text += `Phone: ${phone}\n`
  if (application) text += `Application / Project: ${application}\n`
  if (interest) text += `Interest / Offer: ${interest}\n`
  if (scope) text += `Test Cases & Criteria:\n${scope}\n`
  if (teamSize) text += `Team Size: ${teamSize}\n`
  if (message && message !== scope) text += `Message:\n${message}\n`

  const result = await sendSesEmail({
    subject,
    htmlBody: html,
    textBody: text,
    replyTo: email,
  })

  if (!result.success) {
    res.status(500).json({
      success: false,
      message: result.error || 'Failed to send enquiry. Please contact hello@ascendqe.com directly.',
    })
    return
  }

  res.status(200).json({
    success: true,
    message: 'Thank you! We will be in touch within 24 hours.',
    messageId: result.messageId,
  })
}

/**
 * Handle Career / Job Applications (/apply-job.php and /api/apply-job)
 */
export async function handleJobApplication(req: Request, res: Response): Promise<void> {
  const data = req.body || {}

  const firstName = String(data.firstName || data.first_name || '').trim()
  const lastName = String(data.lastName || data.last_name || '').trim()
  const email = String(data.email || '').trim()
  const phone = String(data.phone || '').trim()
  const jobTitle = String(data.jobTitle || data.job_title || 'General Application').trim()
  const experience = String(data.experience || '').trim()
  const linkedin = String(data.linkedin || '').trim()
  const coverLetter = String(data.coverLetter || data.cover_letter || '').trim()

  if (!firstName || !lastName || !email) {
    res.status(422).json({
      success: false,
      message: 'Please complete all required fields (First Name, Last Name, Email).',
    })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email)) {
    res.status(422).json({
      success: false,
      message: 'Please enter a valid email address.',
    })
    return
  }

  const subject = `New Job Application: ${jobTitle} - ${firstName} ${lastName}`
  const heading = `New Job Application: ${jobTitle}`

  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">`
  html += `<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">`
  html += `<h2 style="color: #1763ff; margin-top: 0;">${escapeHtml(heading)}</h2>`
  html += `<p style="color: #64748b; font-size: 13px;">Submitted on ascendqe.com/careers</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">`
  html += `<table style="width: 100%; border-collapse: collapse;">`
  html += `<tr><td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Candidate Name:</strong></td><td style="padding: 6px 0;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>`
  html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>`
  if (phone) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>`
  if (experience) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Experience:</strong></td><td style="padding: 6px 0;">${escapeHtml(experience)} years</td></tr>`
  if (linkedin) html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>LinkedIn:</strong></td><td style="padding: 6px 0;"><a href="${escapeHtml(linkedin)}" target="_blank">${escapeHtml(linkedin)}</a></td></tr>`
  if (coverLetter) html += `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Cover Letter:</strong></td><td style="padding: 6px 0;">${escapeHtml(coverLetter).replace(/\n/g, '<br>')}</td></tr>`

  const file = req.file
  if (file) {
    html += `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Resume Attachment:</strong></td><td style="padding: 6px 0;">${escapeHtml(file.originalname)} (${(file.size / 1024).toFixed(0)} KB)</td></tr>`
  }

  html += `</table></div></body></html>`

  let text = `${heading} on ascendqe.com/careers\n\n`
  text += `Candidate: ${firstName} ${lastName}\n`
  text += `Email: ${email}\n`
  if (phone) text += `Phone: ${phone}\n`
  if (experience) text += `Experience: ${experience} years\n`
  if (linkedin) text += `LinkedIn: ${linkedin}\n`
  if (coverLetter) text += `Cover Letter:\n${coverLetter}\n`
  if (file) text += `Attached Resume: ${file.originalname}\n`

  const result = await sendSesEmail({
    subject,
    htmlBody: html,
    textBody: text,
    replyTo: email,
    attachment: file
      ? {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype || 'application/octet-stream',
        }
      : undefined,
  })

  if (!result.success) {
    res.status(500).json({
      success: false,
      message: result.error || 'Failed to submit application. Please contact hello@ascendqe.com directly.',
    })
    return
  }

  res.status(200).json({
    success: true,
    message: 'Application submitted successfully! We will review your application and get back to you soon.',
    messageId: result.messageId,
  })
}
