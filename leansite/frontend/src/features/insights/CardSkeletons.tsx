/** Placeholder cards while articles load (Insights listing and studio dashboard). */
export function CardSkeletons() {
  return (
    <div className="ins-grid" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="ins-card ins-skeleton">
          <div className="ins-cover" />
          <div className="ins-card-body">
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}
