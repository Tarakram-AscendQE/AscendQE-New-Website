// Client for the backend email API (leansite/backend, POST /api/send-mail).

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

const NETWORK_ERROR = 'We could not reach the server.';

/** Sends a contact enquiry email to the AscendQE inbox. Never throws: failures come back as `success: false`. */
export async function sendContactEnquiry(enquiry: ContactEnquiry): Promise<ApiResult> {
  try {
    const response = await fetch('/api/send-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...enquiry, formType: 'contact' }),
    });
    const body = (await response.json().catch(() => null)) as Partial<ApiResult> | null;
    return {
      success: response.ok && body?.success === true,
      message: body?.message || NETWORK_ERROR,
    };
  } catch {
    return { success: false, message: NETWORK_ERROR };
  }
}
