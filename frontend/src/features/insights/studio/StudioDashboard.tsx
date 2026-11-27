import { Eye, ExternalLink, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Pagination } from '@/components/ui/Pagination';
import { ArticleCover } from '@/features/insights/ArticleCover';
import { CardSkeletons } from '@/features/insights/CardSkeletons';
import { articlePath, articleTopic, articleType, authorName, formatDate } from '@/features/insights/insights-utils';
import { ConfirmDialog } from '@/features/insights/studio/ConfirmDialog';
import { StudioBar } from '@/features/insights/studio/StudioBar';
import { STUDIO_PER_PAGE } from '@/features/insights/studio/studio-data';
import { blogService } from '@/services/blogService';
import type { BlogItem } from '@/types/blog';

interface StudioDashboardProps {
  userName: string;
  onNew: () => void;
  onEdit: (blog: BlogItem) => void;
  onView: (blog: BlogItem) => void;
  onSignOut: () => void;
  onUnauthorized: () => void;
}

type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; blogs: BlogItem[] };

function StudioCard({
  blog,
  onEdit,
  onView,
  onDelete,
}: {
  blog: BlogItem;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}) {
  const type = articleType(blog);
  return (
    <article className="ins-card studio-card">
      <button type="button" className="studio-card-cover" onClick={onView} aria-label={`View “${blog.title}”`}>
        <ArticleCover src={blog.cover_image_url} alt="" />
      </button>
      <div className="ins-card-body">
        <p className="lab">
          {articleTopic(blog)}
          {type && <span className="faint"> · {type}</span>}
        </p>
        <h3>{blog.title}</h3>
        <p className="ins-card-excerpt">{blog.excerpt || 'No summary yet.'}</p>
        <p className="studio-slug">/blogs/{blog.slug}</p>
        <p className="ins-card-meta">
          <span>{authorName(blog.author_name)}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
        </p>
      </div>
      <div className="studio-actions">
        <button type="button" onClick={onEdit}>
          <Pencil aria-hidden="true" /> Edit
        </button>
        <button type="button" onClick={onView}>
          <Eye aria-hidden="true" /> Preview
        </button>
        <Link
          to={articlePath(blog)}
          target="_blank"
          rel="noopener noreferrer"
          title="Open on the site"
          aria-label={`Open “${blog.title}” on the site`}
        >
          <ExternalLink aria-hidden="true" />
        </Link>
        <button type="button" className="danger" onClick={onDelete}>
          <Trash2 aria-hidden="true" /> Delete
        </button>
      </div>
    </article>
  );
}

/** Studio home: every article, with search, edit / preview / delete and "New article". */
export function StudioDashboard({ userName, onNew, onEdit, onView, onSignOut, onUnauthorized }: StudioDashboardProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<BlogItem | null>(null);
  const [deleting, setDeleting] = useState(false);

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
  const term = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      blogs.filter(
        (blog) =>
          !term ||
          [blog.title, blog.slug, blog.excerpt, blog.topic, blog.type].some((v) => v?.toLowerCase().includes(term))
      ),
    [blogs, term]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / STUDIO_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * STUDIO_PER_PAGE, currentPage * STUDIO_PER_PAGE);

  useEffect(() => setPage(1), [term]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    const result = await blogService.deleteBlog(toDelete.blog_id);
    setDeleting(false);
    if (result.status === 401) {
      setToDelete(null);
      onUnauthorized();
      return;
    }
    if (!result.success) {
      toast.error(result.message || 'The article could not be deleted.');
      return;
    }
    toast.success(`“${toDelete.title}” deleted.`);
    setState({ status: 'ready', blogs: blogs.filter((blog) => blog.blog_id !== toDelete.blog_id) });
    setToDelete(null);
  };

  return (
    <div className="studio-page">
      <StudioBar>
        <span className="studio-user">{userName}</span>
        <button type="button" className="btn sm ghost" onClick={onSignOut}>
          Sign out
        </button>
      </StudioBar>

      <main className="wrap studio-main">
        <div className="studio-head">
          <div>
            <h1>Articles</h1>
            <p className="muted mt8">Published articles appear on the Insights page straight away.</p>
          </div>
          <button type="button" className="btn" onClick={onNew}>
            <Plus aria-hidden="true" /> New article
          </button>
        </div>

        <div className="studio-filter">
          <div className="ins-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, slug or summary"
              aria-label="Search articles"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} aria-label="Clear search">
                <X aria-hidden="true" />
              </button>
            )}
          </div>
          {state.status === 'ready' && (
            <p className="ins-count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          )}
        </div>

        <div aria-busy={state.status === 'loading'}>
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
              <h3>{term ? 'No articles match your search.' : 'No articles yet.'}</h3>
              <p className="muted">{term ? 'Try another word from the title or summary.' : 'Write the first one.'}</p>
              {term ? (
                <button type="button" className="btn sm ghost mt16" onClick={() => setSearch('')}>
                  Clear search
                </button>
              ) : (
                <button type="button" className="btn sm mt16" onClick={onNew}>
                  <Plus aria-hidden="true" /> New article
                </button>
              )}
            </div>
          )}

          {state.status === 'ready' && filtered.length > 0 && (
            <>
              <div className="ins-grid">
                {visible.map((blog) => (
                  <StudioCard
                    key={blog.blog_id}
                    blog={blog}
                    onEdit={() => onEdit(blog)}
                    onView={() => onView(blog)}
                    onDelete={() => setToDelete(blog)}
                  />
                ))}
              </div>
              <Pagination className="mt32" page={currentPage} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </main>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this article?"
        confirmLabel="Delete article"
        busyLabel="Deleting…"
        busy={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setToDelete(null)}
      >
        <p>
          “{toDelete?.title}” will be removed from the Insights page, together with its uploaded images. This can’t be
          undone.
        </p>
      </ConfirmDialog>
    </div>
  );
}
