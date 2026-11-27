import { EditorContent, useEditor } from '@tiptap/react';
import { articleExtensions } from '@/features/insights/editor-extensions';
import { toEditorContent } from '@/features/insights/insights-utils';
import type { BlogItem } from '@/types/blog';

/** Read-only rendering of an article's TipTap document (same extensions as the studio editor). */
export function ArticleBody({ content }: { content: BlogItem['content'] }) {
  const editor = useEditor(
    { editable: false, extensions: articleExtensions({ editable: false }), content: toEditorContent(content) },
    [content]
  );
  return <EditorContent editor={editor} className="prose" />;
}
