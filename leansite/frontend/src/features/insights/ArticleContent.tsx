import { Check, Link2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbLabel } from '@/components/layout/breadcrumb-context';
import { HeadMeta } from '@/components/seo/HeadMeta';
import { ArticleBody } from '@/features/insights/ArticleBody';
import { ArticleCover } from '@/features/insights/ArticleCover';
import { InsightCard } from '@/features/insights/InsightCard';
import { InsightsCta } from '@/features/insights/InsightsCta';
import {
  articlePath,
  articleTopic,
  articleType,
  authorName,
  formatDate,
  readingTime,
} from '@/features/insights/insights-utils';
import { blogService } from '@/services/blogService';
import type { BlogItem } from '@/types/blog';
import '@/styles/insights.css';

type LoadState =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'error'; message: string }
  | { status: 'ready'; blog: BlogItem; related: BlogItem[] };

/** Up to three other articles, same topic (then same type) first. */
function relatedArticles(blog: BlogItem, all: BlogItem[]): BlogItem[] {
  const score = (other: BlogItem) =>
    (articleTopic(other) === articleTopic(blog) ? 2 : 0) + (other.type && other.type === blog.type ? 1 : 0);
  return all
    .filter((other) => other.blog_id !== blog.blog_id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 3);
}

/** Clipboard API, falling back to a temporary text field + execCommand (non-HTTPS or blocked clipboard). */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    field.remove();
    return copied;
  }
}

const SHARE_LABELS = { idle: 'Copy link', copied: 'Link copied', failed: 'Copy the link from the address bar' };

function ShareButton() {
  const [status, setStatus] = useState<keyof typeof SHARE_LABELS>('idle');
  const copy = async () => {
    setStatus((await copyText(window.location.href)) ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), 3000);
  };
  return (
    <button type="button" className="ins-share" onClick={() => void copy()}>
      {status === 'copied' ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
      <span aria-live="polite">{SHARE_LABELS[status]}</span>
    </button>
  );
}

export function ArticleContent({ slug }: { slug: string }) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  useBreadcrumbLabel(
    state.status === 'ready' ? state.blog.title : state.status === 'missing' ? 'Article not found' : null
  );

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const [article, all] = await Promise.all([blogService.getBlog(slug), blogService.getBlogs()]);
    if (article.status === 404) setState({ status: 'missing' });
    else if (!article.success || !article.data)
      setState({ status: 'error', message: article.message || 'The article could not be loaded.' });
    else setState({ status: 'ready', blog: article.data, related: relatedArticles(article.data, all.data ?? []) });
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  if (state.status === 'loading') {
    return (
      <section className="hero ins-article-head" aria-busy="true">
        <div className="wrap ins-narrow">
          <div className="ins-skeleton ins-skeleton-title" />
          <p className="muted mt24">Loading article…</p>
        </div>
      </section>
    );
  }

  if (state.status === 'missing' || state.status === 'error') {
    const missing = state.status === 'missing';
    return (
      <>
        <HeadMeta title="Article not found · AscendQE" robots="noindex, follow" />
        <section className="hero">
          <div className="wrap">
            <div style={{ maxWidth: '900px' }}>
              <h1>{missing ? 'This article isn’t here.' : 'We couldn’t load this article.'}</h1>
              <p className="lede">
                {missing
                  ? 'The link may be old, or the article may have moved. All our articles are on the Insights page.'
                  : state.message}
              </p>
              <div className="actions">
                {missing ? (
                  <Link className="btn" to="/blogs">
                    Browse all insights
                  </Link>
                ) : (
                  <button type="button" className="btn" onClick={() => void load()}>
                    Try again
                  </button>
                )}
                <Link className="tlink" to="/">
                  Go to the home page →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { blog, related } = state;
  const type = articleType(blog);
  return (
    <>
      <HeadMeta
        title={`${blog.title} · AscendQE Insights`}
        description={blog.excerpt || 'An article from the AscendQE team on quality engineering for the AI era.'}
        canonicalPath={articlePath(blog)}
      />
      <article>
        <section className="hero ins-article-head">
          <div className="wrap ins-narrow">
            <h1 className="ins-title">{blog.title}</h1>
            {blog.excerpt && <p className="lede">{blog.excerpt}</p>}
            <div className="ins-byline">
              <span className="ins-topic">
                {articleTopic(blog)}
                {type && ` · ${type}`}
              </span>
              <span>
                By <b>{authorName(blog.author_name)}</b>
              </span>
              <time dateTime={blog.created_at}>{formatDate(blog.created_at, 'long')}</time>
              <span>{readingTime(blog.content)}</span>
              <ShareButton />
            </div>
          </div>
        </section>

        {blog.cover_image_url && (
          <div className="wrap ins-wide">
            <ArticleCover src={blog.cover_image_url} alt="" className="ins-hero-cover" lazy={false} />
          </div>
        )}

        <div className="wrap ins-narrow ins-article-body">
          <ArticleBody content={blog.content} />
          {blog.tags.length > 0 && (
            <ul className="ins-tags" aria-label="Tags">
              {blog.tags.map((tag) => (
                <li key={tag} className="tag hu">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <p className="mt48">
            <Link className="tlink" to="/blogs">
              ← All insights
            </Link>
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="band white" aria-labelledby="ins-related-heading">
          <div className="wrap">
            <h2 id="ins-related-heading" className="ins-section-title">
              Continue reading
            </h2>
            <div className="ins-grid mt32">
              {related.map((item) => (
                <InsightCard key={item.blog_id} blog={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <InsightsCta />
    </>
  );
}
