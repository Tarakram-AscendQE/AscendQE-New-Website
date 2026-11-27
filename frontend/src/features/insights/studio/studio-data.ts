// Studio options (from the previous site's article editor).

export const TOPIC_OPTIONS = [
  'Quality Engineering',
  'Agentic QE',
  'Continuous Testing',
  'Test Data Management',
  'Performance & P95',
  'Enterprise Governance',
  'Release Assurance',
  'AI & Test Automation',
] as const;

/** Articles per page on the studio dashboard. */
export const STUDIO_PER_PAGE = 6;

/** Excerpt length taken from the article text when no summary is written. */
export const AUTO_EXCERPT_LENGTH = 160;

/** Largest image the server accepts (matches the backend upload limit). */
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
