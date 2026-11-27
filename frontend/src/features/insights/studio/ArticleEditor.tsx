import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { ArrowLeft, ExternalLink, ImagePlus, Pencil } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { articleExtensions } from '@/features/insights/editor-extensions';
import { articlePath, articleText, formatDate, toEditorContent } from '@/features/insights/insights-utils';
import { EditorToolbar } from '@/features/insights/studio/EditorToolbar';
import { fileToOptimizedDataUrl } from '@/features/insights/studio/image-utils';
import { LinkDialog } from '@/features/insights/studio/LinkDialog';
import { StudioBar } from '@/features/insights/studio/StudioBar';
import { AUTO_EXCERPT_LENGTH, MAX_IMAGE_BYTES, TOPIC_OPTIONS } from '@/features/insights/studio/studio-data';
import { blogService } from '@/services/blogService';
import type { BlogItem, BlogPayload } from '@/types/blog';

interface ArticleEditorProps {
  /** null for a new article. */
  blog: BlogItem | null;
  /** Open in preview (read-only) mode; "Edit" switches to editing. */
  readOnly: boolean;
  onBack: () => void;
  onSaved: () => void;
  onSignOut: () => void;
  onUnauthorized: () => void;
}

/** Studio article editor: cover, title, optional topic and the TipTap body; publish or update. */
export function ArticleEditor({
  blog,
  readOnly: startReadOnly,
  onBack,
  onSaved,
  onSignOut,
  onUnauthorized,
}: ArticleEditorProps) {
  const [readOnly, setReadOnly] = useState(startReadOnly);
  const [title, setTitle] = useState(blog?.title ?? '');
  const [topic, setTopic] = useState(blog?.topic ?? '');
  const [cover, setCover] = useState<string | null>(blog?.cover_image_url ?? null);
  const [uploading, setUploading] = useState<'cover' | 'body' | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLInputElement>(null);
  const isNew = blog === null;
  const topicOptions =
    topic && !(TOPIC_OPTIONS as readonly string[]).includes(topic) ? [topic, ...TOPIC_OPTIONS] : TOPIC_OPTIONS;

  const editor = useEditor({
    editable: !startReadOnly,
    extensions: [
      ...articleExtensions({ editable: true }),
      Placeholder.configure({ placeholder: 'Write your article…' }),
    ],
    content: toEditorContent(blog?.content ?? null),
  });

  useEffect(() => {
    editor?.setEditable(!readOnly);
  }, [editor, readOnly]);

  // The title grows with its text.
  useLayoutEffect(() => {
    const element = titleRef.current;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }, [title]);

  /** Uploads an image; if the upload fails, falls back to a compressed copy stored in the article. */
  const imageUrlFor = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      toast.error('Choose an image file (JPEG, PNG, WebP or GIF).');
      return null;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('This image is larger than 15 MB. Choose a smaller one.');
      return null;
    }
    const result = await blogService.uploadImage(file);
    if (result.success && result.data) return result.data.url;
    if (result.status === 401) {
      onUnauthorized();
      return null;
    }
    try {
      const dataUrl = await fileToOptimizedDataUrl(file);
      toast.info('The image upload failed, so a compressed copy was saved inside the article.');
      return dataUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'The image could not be added.');
      return null;
    }
  };

  const handleCoverFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setUploading('cover');
    const url = await imageUrlFor(file);
    setUploading(null);
    if (url) {
      setCover(url);
    }
  };

  const handleBodyFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !editor) return;
    setUploading('body');
    const url = await imageUrlFor(file);
    setUploading(null);
    if (url)
      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, '') })
        .run();
  };

  const publish = async () => {
    if (!editor || publishing) return;
    setAttempted(true);
    if (!title.trim()) {
      toast.error('Add a title before publishing.');
      titleRef.current?.focus();
      return;
    }

    const text = articleText(editor.getJSON()).replace(/\s+/g, ' ').trim();
    const payload: BlogPayload = {
      title: title.trim(),
      // New articles take their summary from the opening lines; existing ones keep the summary they have.
      excerpt: blog?.excerpt || text.slice(0, AUTO_EXCERPT_LENGTH) || undefined,
      content: editor.getJSON(),
      cover_image_url: cover,
      topic,
      type: blog?.type ?? '',
      tags: [],
    };

    setPublishing(true);
    const result = isNew ? await blogService.createBlog(payload) : await blogService.updateBlog(blog.blog_id, payload);
    setPublishing(false);
    if (result.status === 401) {
      onUnauthorized();
      return;
    }
    if (!result.success) {
      toast.error(result.message || 'The article could not be saved.');
      return;
    }
    toast.success(isNew ? 'Article published.' : 'Changes saved.');
    onSaved();
  };

  const startEditing = () => {
    setReadOnly(false);
    window.setTimeout(() => titleRef.current?.focus(), 0);
  };

  return (
    <div className="studio-page">
      <StudioBar
        lead={
          <button type="button" className="studio-back" onClick={onBack}>
            <ArrowLeft aria-hidden="true" /> All articles
          </button>
        }
      >
        {readOnly && <span className="tag hu">Preview</span>}
        {readOnly ? (
          <button type="button" className="btn sm" onClick={startEditing}>
            <Pencil aria-hidden="true" /> Edit
          </button>
        ) : (
          <button
            type="button"
            className="btn sm"
            onClick={() => void publish()}
            disabled={publishing || uploading !== null}
            aria-busy={publishing}
          >
            {publishing ? (isNew ? 'Publishing…' : 'Saving…') : isNew ? 'Publish' : 'Save changes'}
          </button>
        )}
        <button type="button" className="btn sm ghost" onClick={onSignOut}>
          Sign out
        </button>
      </StudioBar>

      <main className="wrap studio-editor">
        <aside className="studio-side" aria-label="Article settings">
          <div className="card">
            <h2 className="studio-side-title">Article settings</h2>
            <div className="field">
              <label htmlFor="studio-topic">
                Topic <span className="studio-optional">(optional)</span>
              </label>
              <select
                id="studio-topic"
                value={topic}
                disabled={readOnly}
                onChange={(event) => {
                  setTopic(event.target.value);
                }}
              >
                <option value="">No topic</option>
                {topicOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {blog && (
              <p className="studio-side-meta">
                Published {formatDate(blog.created_at, 'long')}
                <br />
                <Link to={articlePath(blog)} target="_blank" rel="noopener noreferrer">
                  /blogs/{blog.slug} <ExternalLink aria-hidden="true" />
                </Link>
              </p>
            )}
          </div>
        </aside>

        <div className="studio-canvas">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => void handleCoverFile(event)}
          />
          <input
            ref={bodyInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => void handleBodyFile(event)}
          />

          {editor && !readOnly && (
            <EditorToolbar
              editor={editor}
              onLink={() => setLinkOpen(true)}
              onImage={() => bodyInputRef.current?.click()}
              imageBusy={uploading === 'body'}
            />
          )}

          {cover ? (
            <div className="studio-cover">
              <img src={cover} alt="Cover" />
              {!readOnly && (
                <div className="studio-cover-actions">
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploading === 'cover'}
                  >
                    {uploading === 'cover' ? 'Uploading…' : 'Change cover'}
                  </button>
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => {
                      setCover(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ) : (
            !readOnly && (
              <button
                type="button"
                className="studio-cover-empty"
                onClick={() => coverInputRef.current?.click()}
                disabled={uploading === 'cover'}
              >
                <ImagePlus aria-hidden="true" />
                <b>{uploading === 'cover' ? 'Uploading cover image…' : 'Add a cover image'}</b>
                <span>
                  Shown on the article card and at the top of the article. JPEG, PNG, WebP or GIF up to 15 MB.
                </span>
              </button>
            )
          )}

          <textarea
            ref={titleRef}
            className="studio-title"
            rows={1}
            placeholder="Article title"
            aria-label="Article title"
            aria-invalid={(attempted && !title.trim()) || undefined}
            maxLength={255}
            value={title}
            readOnly={readOnly}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <EditorContent editor={editor} className="prose studio-body" />
        </div>
      </main>

      {editor && <LinkDialog editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />}
    </div>
  );
}
