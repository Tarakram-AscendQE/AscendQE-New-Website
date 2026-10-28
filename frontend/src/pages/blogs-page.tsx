import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, ArrowRight, BookOpen, Sparkles, Filter, RefreshCw } from 'lucide-react'
import { blogService, BlogItem } from '@/services/blogService'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { Reveal } from '@/components/ui/shared'
import aqShortLogo from '@/assets/brand-logos/AQ-short-logo.webp'

// Helper: Format date
function formatDate(isoStr?: string): string {
  if (!isoStr) return 'Recent'
  try {
    let normalized = isoStr
    if (typeof normalized === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(normalized)) {
      normalized = normalized.replace(' ', 'T') + 'Z'
    }
    const d = new Date(normalized)
    if (isNaN(d.getTime())) return isoStr
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return isoStr
  }
}

// Helper: Estimate reading time from content
function estimateReadingTime(content: any): string {
  if (!content) return '3 min read'
  let text = ''
  if (typeof content === 'string') {
    text = content
  } else if (content?.content && Array.isArray(content.content)) {
    text = JSON.stringify(content)
  }
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('All')

  // Load published blogs from GoDaddy MySQL via backend API
  useEffect(() => {
    let isMounted = true
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const data = await blogService.getBlogs()
        if (isMounted) {
          setBlogs(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error('Failed to load blogs:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBlogs()
    return () => {
      isMounted = false
    }
  }, [])

  // Collect unique available topics from existing blogs plus primary defaults
  const topics = useMemo(() => {
    const list = new Set<string>(['All'])
    blogs.forEach((b) => {
      if (b.topic) list.add(b.topic)
      if (Array.isArray(b.tags)) {
        b.tags.forEach((t) => t && list.add(t))
      }
    })
    // Ensure primary QE topics are visible
    ;['Quality Engineering', 'Agentic QE', 'Continuous Testing', 'Performance & P95'].forEach((t) => list.add(t))
    return Array.from(list)
  }, [blogs])

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchTerm.trim() ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.topic && blog.topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(blog.tags) && blog.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesTopic =
        selectedTopic === 'All' ||
        blog.topic === selectedTopic ||
        (Array.isArray(blog.tags) && blog.tags.includes(selectedTopic))

      return matchesSearch && matchesTopic
    })
  }, [blogs, searchTerm, selectedTopic])

  return (
    <>
      <HeadMeta
        title="Engineering Blogs & Insights | AscendQE — Quality Engineering"
        description="Explore systems architecture, agentic workflows, test intelligence, and modern Quality Engineering perspectives from the AscendQE team."
        canonicalPath="/blogs"
      />

      <div className="min-h-screen bg-white text-[#0b1831] font-sans selection:bg-[#1763ff]/20 selection:text-[#1763ff]">
        {/* ══════════════════════════════════════════════════════════════════
            HERO SECTION
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_40%,#dceeff66,transparent_55%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-22 border-b border-[#DCE5F5]">
          <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <Reveal delay={0.1} className="max-w-3xl">
              {/* Breadcrumb */}
              <p className="mb-6 aqe-caption text-[#69758a]">
                <Link to="/" className="hover:text-[#1763ff] transition-colors">
                  Home
                </Link>
                <span className="mx-1.5 text-[#cbd5e1]">›</span>
                <span className="text-[#1763ff] font-semibold">Blogs</span>
              </p>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
                <span className="aqe-label-text text-[#1763ff] text-xs font-semibold tracking-wider uppercase">
                  AscendQE Perspectives
                </span>
              </div>

              <h1
                className="text-[#0B1638] leading-[1.12] mb-5 font-[750] tracking-tight"
                style={{ fontSize: 'clamp(2.1rem, 3.4vw + 0.6rem, 3.4rem)' }}
              >
                Insights for Modern <span className="text-[#1763ff]">Quality Engineering</span>.
              </h1>

              <p className="text-[#556987] text-base sm:text-lg leading-relaxed max-w-2xl">
                Deep dives on AI agent architectures, autonomous test generation, continuous governance, and
                advancing enterprise software reliability.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SEARCH & TOPIC FILTER CONTROLS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-white border-b border-[#e5ebf5] py-5 sticky top-16 z-20 backdrop-blur-md bg-white/95">
          <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Topic Filters (Horizontal Scrollable) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-slate-400 mr-1 select-none flex-shrink-0">
                  <Filter size={14} />
                  <span className="text-xs uppercase tracking-wider font-semibold">Topics:</span>
                </div>
                {topics.slice(0, 7).map((topic) => {
                  const isActive = selectedTopic === topic
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer text-xs ${
                        isActive
                          ? 'bg-[#1763ff] text-white shadow-sm shadow-[#1763ff]/25'
                          : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0b1831]'
                      }`}
                    >
                      {topic}
                    </button>
                  )
                })}
              </div>

              {/* Search Bar (Flex Container for Perfect Vertical Alignment) */}
              <div className="flex items-center gap-2.5 h-[38px] px-3.5 rounded-xl border border-slate-200 bg-[#f8fafc] focus-within:border-[#1763ff] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1763ff]/15 transition-all shadow-sm min-w-[240px] md:w-72">
                <Search
                  size={15}
                  className="text-slate-400 shrink-0 select-none pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#0b1831] placeholder-slate-400 focus:outline-none border-0 p-0 m-0 leading-normal"
                  style={{ border: 'none', outline: 'none', background: 'transparent', boxShadow: 'none', padding: 0, margin: 0 }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-xs text-slate-400 hover:text-slate-600 shrink-0 p-1 flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ARTICLES GRID
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            {/* Loading Skeletons */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 animate-pulse flex flex-col justify-between h-[360px]"
                  >
                    <div>
                      <div className="w-full aspect-[16/9] bg-slate-100 rounded-xl mb-4" />
                      <div className="h-4 bg-slate-100 rounded w-1/3 mb-3" />
                      <div className="h-6 bg-slate-100 rounded w-5/6 mb-2" />
                      <div className="h-4 bg-slate-100 rounded w-full mb-1" />
                      <div className="h-4 bg-slate-100 rounded w-4/6" />
                    </div>
                    <div className="h-4 bg-slate-100 rounded w-1/4 mt-4" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredBlogs.length === 0 && (
              <div className="text-center py-20 px-4 max-w-md mx-auto">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#eff4ff] text-[#1763ff] flex items-center justify-center border border-[#dbe6ff]">
                  <BookOpen size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0b1831] mb-2">No articles found</h3>
                <p className="text-slate-500 text-sm mb-6">
                  {searchTerm || selectedTopic !== 'All'
                    ? 'No published articles match your filter criteria. Try clearing filters or searching for another term.'
                    : 'Articles are currently being prepared. Check back shortly for fresh insights!'}
                </p>
                {(searchTerm || selectedTopic !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedTopic('All')
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1763ff] text-white text-xs font-semibold hover:bg-[#1250d4] transition-colors"
                  >
                    <RefreshCw size={13} />
                    Reset all filters
                  </button>
                )}
              </div>
            )}

            {/* Published Blogs Grid */}
            {!loading && filteredBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredBlogs.map((blog) => {
                  const targetSlug = blog.slug || blog.blog_id
                  const blogTopic = blog.topic || (Array.isArray(blog.tags) ? blog.tags[0] : 'Quality Engineering')
                  const rawType = blog.type || (Array.isArray(blog.tags) ? blog.tags[1] : null)
                  const blogType = rawType && rawType.toLowerCase() !== 'doc' ? rawType : null

                  return (
                    <article
                      key={blog.blog_id}
                      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#e2e8f0] shadow-[0_4px_20px_rgba(11,24,49,0.04)] hover:shadow-[0_16px_40px_rgba(23,99,255,0.12)] hover:border-[#1763ff]/60 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    >
                      {/* Top Media / Thumbnail & Card Content */}
                      <div>
                        <Link
                          to={`/blog/${targetSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative w-full aspect-[16/9] bg-[#f8fafc] border-b border-slate-100 overflow-hidden"
                        >
                          {blog.cover_image_url ? (
                            <img
                              src={blog.cover_image_url}
                              alt={blog.title}
                              className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            /* Geometric Abstract Branded Banner */
                            <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#0c1c38] via-[#0e254d] to-[#153468]">
                              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <img
                                  src={aqShortLogo}
                                  alt="AscendQE Logo"
                                  className="w-9 h-9 object-contain drop-shadow"
                                />
                              </div>
                            </div>
                          )}
                        </Link>

                        {/* Article Meta & Content */}
                        <div className="p-6">
                          {/* Badges Row */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eff4ff] text-[#1763ff] border border-[#dbe6ff]">
                              {blogTopic}
                            </span>
                            {blogType && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                                {blogType}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h2 className="text-[19px] font-bold text-[#0B1638] leading-snug group-hover:text-[#1763ff] transition-colors mb-2.5 line-clamp-2">
                            <Link
                              to={`/blog/${targetSlug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {blog.title}
                            </Link>
                          </h2>

                          {/* Excerpt */}
                          {blog.excerpt && (
                            <p className="text-[#64748b] text-[13.5px] leading-relaxed line-clamp-2 mb-4">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Info Row */}
                      <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#1763ff]/10 text-[#1763ff] flex items-center justify-center font-bold text-[10px]">
                            {(blog.author_name || 'A')[0].toUpperCase()}
                          </div>
                          <span>{formatDate(blog.created_at)}</span>
                        </div>

                        <Link
                          to={`/blog/${targetSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#1763ff] font-semibold hover:gap-2 transition-all group-hover:text-[#1250d4]"
                        >
                          <span>Read article</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            BOTTOM CALL-TO-ACTION BANNER
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#f8fafc] border-t border-[#e2e8f0] py-14 sm:py-16">
          <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-3.5 py-1 text-xs font-semibold text-[#1763ff] mb-4">
              <Sparkles size={13} />
              <span>THE INTELLIGENCE LAYER FOR QE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1638] tracking-tight mb-3">
              Ready to modernize your testing operations?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Experience connected quality engineering with automated test generation, risk-based execution, and
              autonomous test maintenance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/start"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1763ff] text-white text-sm font-semibold shadow-md shadow-[#1763ff]/20 hover:bg-[#1250d4] transition-colors"
              >
                <span>Start with 100 free tests</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-[#0b1831] text-sm font-semibold hover:border-[#1763ff] hover:text-[#1763ff] transition-colors"
              >
                Learn about AscendQE
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

