import { Navigate, useParams } from 'react-router-dom';

/** Previous site's article URLs (/blog/:slug, /article/:slug) → /blogs/:slug. */
export function ArticleRedirect() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <Navigate to={`/blogs/${slug}`} replace />;
}
