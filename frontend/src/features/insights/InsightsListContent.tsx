import { Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CardSkeletons } from '@/features/insights/CardSkeletons';
import { InsightCard } from '@/features/insights/InsightCard';
import { InsightsCta } from '@/features/insights/InsightsCta';
import { InsightsPagination } from '@/features/insights/InsightsPagination';
import { articleTopic } from '@/features/insights/insights-utils';
import { blogService } from '@/services/blogService';
import type { BlogItem } from '@/types/blog';
import '@/styles/insights.css';

const PER_PAGE = 6;
const ALL = 'All';

type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; blogs: BlogItem[] };

function matchesSearch(blog: BlogItem, term: string): boolean {
  if (!term) return true;
  return [blog.title, blog.excerpt, blog.topic, ...blog.tags].some((value) => value?.toLowerCase().includes(term));
}

export function InsightsListContent() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState(ALL);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const result = await blogService.getBlogs();
    setState(
      result.success
        ? { status: 'ready', blogs: result.data ?? [] }
        : { status: 'error', message: result.message || 'The articles could not be loaded.' }
    );
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const blogs = useMemo(() => (state.status === 'ready' ? state.blogs : []), [state]);
  const topics = useMemo(() => [ALL, ...new Set(blogs.map(articleTopic))], [blogs]);

  const term = search.trim().toLowerCase();
  const filtered = useMemo(
    () => blogs.filter((blog) => (topic === ALL || articleTopic(blog) === topic) && matchesSearch(blog, term)),
    [blogs, topic, term]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [term, topic]);

  const changePage = (next: number) => {
    setPage(next);
    gridRef.current?.scrollIntoView({ block: 'start' });
  };

  const clearFilters = () => {
    setSearch('');
    setTopic(ALL);
  };

  return (
    <>
      <section className="hero ins-hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <h1>Insights for modern quality engineering.</h1>
            <p className="lede">
              Notes from the AscendQE team on AI agents, test intelligence, release decisions and keeping software
              reliable after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="band white ins-list" aria-labelledby="ins-articles-heading">
        <div className="wrap" ref={gridRef}>
          <h2 id="ins-articles-heading" className="sr-only">
            Articles
          </h2>
          <div className="ins-controls">
            <div className="ins-topics" role="group" aria-label="Filter by topic">
              {topics.map((item) => (
                <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="ins-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} aria-label="Clear search">
                  <X aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="ins-results" aria-live="polite" aria-busy={state.status === 'loading'}>
            {state.status === 'loading' && <CardSkeletons />}

            {state.status === 'error' && (
              <div className="ins-state">
                <h3>We couldn’t load the articles.</h3>
                <p className="muted">{state.message}</p>
                <button type="button" className="btn sm mt16" onClick={() => void load()}>
                  Try again
                </button>
              </div>
            )}

            {state.status === 'ready' && filtered.length === 0 && (
              <div className="ins-state">
                {blogs.length === 0 ? (
                  <>
                    <h3>No articles yet.</h3>
                    <p className="muted">New insights are on the way. Check back soon.</p>
                  </>
                ) : (
                  <>
                    <h3>No articles match your filters.</h3>
                    <p className="muted">Try another search term or topic.</p>
                    <button type="button" className="btn sm ghost mt16" onClick={clearFilters}>
                      Clear filters
                    </button>
                  </>
                )}
              </div>
            )}

            {state.status === 'ready' && filtered.length > 0 && (
              <>
                <p className="ins-count">
                  {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                  {topic !== ALL && ` in ${topic}`}
                </p>
                <div className="ins-grid">
                  {visible.map((blog) => (
                    <InsightCard key={blog.blog_id} blog={blog} />
                  ))}
                </div>
                <InsightsPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={changePage}
                  totalResults={filtered.length}
                  resultsPerPage={PER_PAGE}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <InsightsCta />
    </>
  );
}
