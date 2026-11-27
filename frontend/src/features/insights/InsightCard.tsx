import { Link } from 'react-router-dom';
import { ArticleCover } from '@/features/insights/ArticleCover';
import { articlePath, articleTopic, articleType, formatDate, readingTime } from '@/features/insights/insights-utils';
import type { BlogItem } from '@/types/blog';

/** Article card for the Insights grid and "Continue reading": the whole card links to the article. */
export function InsightCard({ blog }: { blog: BlogItem }) {
  const type = articleType(blog);
  return (
    <Link className="ins-card" to={articlePath(blog)}>
      <ArticleCover src={blog.cover_image_url} alt="" />
      <div className="ins-card-body">
        <p className="lab">
          {articleTopic(blog)}
          {type && <span className="faint"> · {type}</span>}
        </p>
        <h3>{blog.title}</h3>
        {blog.excerpt && <p className="ins-card-excerpt">{blog.excerpt}</p>}
        <p className="ins-card-meta">
          <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(blog.content)}</span>
        </p>
      </div>
    </Link>
  );
}
