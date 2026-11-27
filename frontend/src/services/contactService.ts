// Client for the backend email API (backend/, POST /api/send-mail).
import { jsonBody, requestJson } from '@/services/http';

export interface ContactEnquiry {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
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
