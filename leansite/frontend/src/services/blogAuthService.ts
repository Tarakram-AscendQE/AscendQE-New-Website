// Insights studio sign-in (backend /api/auth). The session lives in sessionStorage for this tab only.
import { jsonBody, requestJson } from '@/services/http';
import type { StudioSession } from '@/types/blog';

const STORAGE_KEY = 'ascendqe_blog_auth';

function readSession(): StudioSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const session = raw ? (JSON.parse(raw) as StudioSession) : null;
    return session?.token && session.username ? session : null;
  } catch {
    return null;
  }
}

export const blogAuthService = {
  getSession: readSession,

  isAuthenticated(): boolean {
    return readSession() !== null;
  },

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    const result = await requestJson<{ session: StudioSession }>(
      '/api/auth/login',
      jsonBody('POST', { username: username.trim(), password })
    );
    if (!result.success || !result.data?.session) {
      return { success: false, message: result.message || 'Invalid username or password. Please try again.' };
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result.data.session));
    } catch {
      return { success: false, message: 'This browser blocks session storage, so you cannot stay signed in.' };
    }
    return { success: true, message: result.message };
  },

  logout(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing stored.
    }
  },
};
