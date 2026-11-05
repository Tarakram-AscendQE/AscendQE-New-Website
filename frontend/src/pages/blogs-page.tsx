import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import Pagination from '../shared/pagination'
import { blogAuthService } from '@/services/blogAuthService'
import { blogService, BlogItem } from '@/services/blogService'
import ascendQeLogo from '@/assets/brand-logos/AscendQE-dark-logo.webp'
import '@/styles/pages/blog-login.css'

export function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const blogsPerPage = 6

  useEffect(() => {
    let active = true

    blogService.getBlogs().then((items) => {
      if (active) {
        setBlogs(items)
        setLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const topics = useMemo(() => {
    const availableTopics = new Set(['All'])
    blogs.forEach((blog) => {
      if (blog.topic) availableTopics.add(blog.topic)
      blog.tags?.forEach((tag) => availableTopics.add(tag))
    })
    return Array.from(availableTopics)
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return blogs.filter((blog) => {
      const matchesSearch = !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.topic?.toLowerCase().includes(query) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query))
      const matchesTopic = selectedTopic === 'All' ||
        blog.topic === selectedTopic ||
        blog.tags?.includes(selectedTopic)

      return matchesSearch && matchesTopic
    })
  }, [blogs, searchTerm, selectedTopic])

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / blogsPerPage))
  const visibleBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    document.getElementById('blogs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Engineering Blogs</h1>
          <p className="mt-2 text-slate-600">Insights on quality engineering, automation, and modern testing.</p>
        </div>

        <div className="mb-8 space-y-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search blogs"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicChange(topic)}
                aria-pressed={selectedTopic === topic}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${selectedTopic === topic
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="py-16 text-center text-slate-500">Loading blogs...</p>}

        {!loading && visibleBlogs.length === 0 && (
          <p className="py-16 text-center text-slate-500">No blogs found.</p>
        )}

        {!loading && visibleBlogs.length > 0 && (
          <div id="blogs-grid" className="grid scroll-mt-24 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleBlogs.map((blog) => (
              <article key={blog.blog_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                {blog.cover_image_url && (
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="mb-4 aspect-video w-full rounded-md object-cover"
                  />
                )}
                <p className="mb-2 text-xs font-semibold uppercase text-blue-600">{blog.topic || 'Quality Engineering'}</p>
                <h2 className="text-xl font-bold text-slate-900">{blog.title}</h2>
                {blog.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{blog.excerpt}</p>}
                <Link
                  to={`/blog/${blog.slug || blog.blog_id}`}
                  className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="mt-10 flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  )
}

interface BlogLoginProps {
  onLoginSuccess: () => void
}

export function BlogLogin({ onLoginSuccess }: BlogLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.')
      return
    }

    setIsLoading(true)
    try {
      const result = await blogAuthService.login(username, password)
      if (result.success) {
        toast.success(`Welcome back, ${result.session?.displayName || username}!`)
        onLoginSuccess()
      } else {
        setErrorMessage(result.message || 'Invalid username or password.')
        toast.error('Authentication failed')
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bl-root">
      <div className="bl-card">
        {/* Header */}
        <div className="bl-header">
          <Link to="/" className="bl-logo-wrap" title="AscendQE home">
            <img
              src={ascendQeLogo}
              alt="AscendQE"
              className="bl-logo"
              style={{ maxHeight: '34px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <span className="bl-badge">Studio Portal</span>
          <h1 className="bl-title">Sign in to AscendQE Studio</h1>
          <p className="bl-subtitle">Enter your credentials to publish articles and manage blogs.</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bl-error-box" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="bl-form" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="bl-field">
            <label className="bl-label" htmlFor="bl-username">
              Username
            </label>
            <div className="bl-input-wrap">
              <span className="bl-input-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="bl-username"
                type="text"
                className="bl-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                autoComplete="username"
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="bl-field">
            <label className="bl-label" htmlFor="bl-password">
              Password
            </label>
            <div className="bl-input-wrap">
              <span className="bl-input-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="bl-password"
                type={showPassword ? 'text' : 'password'}
                className="bl-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="bl-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bl-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="bl-spinner" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                Sign in to Studio
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Back to Home Link */}
      <Link to="/" className="bl-back-link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to AscendQE
      </Link>
    </div>
  )
}
