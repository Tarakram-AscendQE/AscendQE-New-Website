// Client for the backend email API (backend/, POST /api/send-mail). Used by the Contact page and the
// Start page form; the backend emails the enquiry to hello@ascendqe.com.
import { jsonBody, requestJson } from '@/services/http';

/** Fields the backend accepts. Send either `name` (one field) or `firstName` + `lastName`. */
export interface ContactEnquiry {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  company: string;
  jobTitle?: string;
  application?: string;
  interest?: string;
  scope?: string;
  message?: string;
}

export interface ApiResult {
  success: boolean;
  message: string;
}

/** Sends a contact enquiry email to the AscendQE inbox. Never throws: failures come back as `success: false`. */
export async function sendContactEnquiry(enquiry: ContactEnquiry): Promise<ApiResult> {
  const { success, message } = await requestJson(
    '/api/send-mail',
    jsonBody('POST', { ...enquiry, formType: 'contact' })
  );
  return { success, message };
}
