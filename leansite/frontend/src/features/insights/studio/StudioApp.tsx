import { useState } from 'react';
import { toast } from 'sonner';
import { authorName } from '@/features/insights/insights-utils';
import { ArticleEditor } from '@/features/insights/studio/ArticleEditor';
import { StudioDashboard } from '@/features/insights/studio/StudioDashboard';
import { StudioLogin } from '@/features/insights/studio/StudioLogin';
import { blogAuthService } from '@/services/blogAuthService';
import type { BlogItem } from '@/types/blog';
import '@/styles/insights.css';
import '@/styles/studio.css';

type View = { name: 'dashboard' } | { name: 'editor'; blog: BlogItem | null; readOnly: boolean };

/** Insights studio: sign-in gate, then the article dashboard and the editor. */
export function StudioApp() {
  const [signedIn, setSignedIn] = useState(() => blogAuthService.isAuthenticated());
  const [view, setView] = useState<View>({ name: 'dashboard' });

  const signOut = () => {
    blogAuthService.logout();
    setSignedIn(false);
    setView({ name: 'dashboard' });
  };

  const sessionExpired = () => {
    signOut();
    toast.error('Your session has expired. Please sign in again.');
  };

  if (!signedIn) return <StudioLogin onSignedIn={() => setSignedIn(true)} />;

  if (view.name === 'editor') {
    return (
      <ArticleEditor
        key={view.blog?.blog_id ?? 'new'}
        blog={view.blog}
        readOnly={view.readOnly}
        onBack={() => setView({ name: 'dashboard' })}
        onSaved={() => setView({ name: 'dashboard' })}
        onSignOut={signOut}
        onUnauthorized={sessionExpired}
      />
    );
  }

  const session = blogAuthService.getSession();
  return (
    <StudioDashboard
      userName={authorName(session?.displayName || session?.username || '')}
      onNew={() => setView({ name: 'editor', blog: null, readOnly: false })}
      onEdit={(blog) => setView({ name: 'editor', blog, readOnly: false })}
      onView={(blog) => setView({ name: 'editor', blog, readOnly: true })}
      onSignOut={signOut}
      onUnauthorized={sessionExpired}
    />
  );
}
