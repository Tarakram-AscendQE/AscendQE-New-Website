import { useParams } from 'react-router-dom';
import { ArticleContent } from '@/features/insights/ArticleContent';

/** /blogs/:slug (HeadMeta is set by ArticleContent once the article has loaded). */
export function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <ArticleContent key={slug} slug={slug} />;
}
