// Minimal JSON client for the backend API ({ success, message, data } responses). Never throws.

export interface ApiResponse<T> {
  success: boolean;
  /** HTTP status; 0 when the server could not be reached. */
  status: number;
  message: string;
  data?: T;
}

const NETWORK_ERROR = 'We could not reach the server. Check your connection and try again.';

export async function requestJson<T>(url: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, init);
    const body = (await response.json().catch(() => null)) as { success?: boolean; message?: string; data?: T } | null;
    return {
      success: response.ok && body?.success === true,
      status: response.status,
      message: body?.message || (response.ok ? '' : `The server answered with an error (${response.status}).`),
      data: body?.data,
    };
  } catch {
    return { success: false, status: 0, message: NETWORK_ERROR };
  }
}

/** JSON request options for a method + body. */
export function jsonBody(method: string, body: unknown, headers: Record<string, string> = {}): RequestInit {
  return { method, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) };
}
