import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { StudioBar } from '@/features/insights/studio/StudioBar';
import { blogAuthService } from '@/services/blogAuthService';

/** Studio sign-in (accounts live in the backend's admin_users table). */
export function StudioLogin({ onSignedIn }: { onSignedIn: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const missingUser = submitted && !username.trim();
  const missingPassword = submitted && !password;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setError('');
    if (!username.trim() || !password) return;

    setBusy(true);
    const result = await blogAuthService.login(username, password);
    setBusy(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    toast.success(result.message || 'Signed in.');
    onSignedIn();
  };

  return (
    <div className="studio-page">
      <StudioBar>
        <Link className="tlink" to="/blogs">
          View Insights
        </Link>
      </StudioBar>
      <main className="wrap studio-login">
        <div className="card">
          <h1>Sign in to the studio</h1>
          <p className="muted mt8">Write, publish and manage Insights articles.</p>

          {error && (
            <p className="studio-alert" role="alert">
              <AlertCircle aria-hidden="true" />
              <span>{error}</span>
            </p>
          )}

          <form className="form mt24" noValidate onSubmit={(event) => void handleSubmit(event)}>
            <div className="field">
              <label htmlFor="studio-user">Username</label>
              <input
                id="studio-user"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={busy}
                aria-invalid={missingUser || undefined}
                aria-describedby={missingUser ? 'studio-user-err' : undefined}
              />
              {missingUser && (
                <p className="err" id="studio-user-err">
                  Enter your username.
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="studio-pass">Password</label>
              <div className="studio-pass">
                <input
                  id="studio-pass"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={busy}
                  aria-invalid={missingPassword || undefined}
                  aria-describedby={missingPassword ? 'studio-pass-err' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </div>
              {missingPassword && (
                <p className="err" id="studio-pass-err">
                  Enter your password.
                </p>
              )}
            </div>
            <button className="btn" type="submit" disabled={busy} aria-busy={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
