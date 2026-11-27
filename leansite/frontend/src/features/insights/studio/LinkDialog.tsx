import type { Editor } from '@tiptap/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';

interface LinkDialogProps {
  editor: Editor;
  open: boolean;
  onClose: () => void;
}

/** "https://" is added to bare domains; mailto: and http(s) links are kept as typed. */
function normaliseUrl(url: string): string {
  const trimmed = url.trim();
  return /^(https?:\/\/|mailto:)/i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Add, change or remove a link on the selected text (or insert new linked text). */
export function LinkDialog({ editor, open, onClose }: LinkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      const { from, to } = editor.state.selection;
      const active = editor.isActive('link');
      if (active) editor.chain().extendMarkRange('link').run();
      const range = editor.state.selection;
      const selected = editor.state.doc.textBetween(active ? range.from : from, active ? range.to : to, ' ');
      const href = active ? String(editor.getAttributes('link').href ?? '') : '';
      setText(selected || href);
      setUrl(href);
      setIsEditing(active);
      setSubmitted(false);
      dialog.showModal();
      // Text is usually prefilled from the selection, so start in the address field.
      dialog.querySelector<HTMLInputElement>(selected || href ? '#studio-link-url' : '#studio-link-text')?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, editor]);

  const apply = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!text.trim() || !url.trim()) return;

    const href = normaliseUrl(url);
    const { from, to } = editor.state.selection;
    const selected = editor.state.doc.textBetween(from, to, ' ');
    const chain = editor.chain().focus().extendMarkRange('link');
    if (selected.trim() === text.trim()) {
      chain.setLink({ href }).run();
    } else {
      chain.insertContent({ type: 'text', text: text.trim(), marks: [{ type: 'link', attrs: { href } }] }).run();
    }
    // Continue after the link, so the next typing or inserted image doesn't replace the linked text.
    editor.chain().setTextSelection(editor.state.selection.to).unsetMark('link').run();
    onClose();
  };

  const remove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="studio-dialog"
      aria-labelledby="studio-link-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <h2 id="studio-link-title">{isEditing ? 'Edit link' : 'Add a link'}</h2>
      <form className="form mt16" noValidate onSubmit={apply}>
        <div className="field">
          <label htmlFor="studio-link-text">Text</label>
          <input
            id="studio-link-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-invalid={(submitted && !text.trim()) || undefined}
          />
          {submitted && !text.trim() && <p className="err">Enter the text to show.</p>}
        </div>
        <div className="field">
          <label htmlFor="studio-link-url">Link address</label>
          <input
            id="studio-link-url"
            type="url"
            inputMode="url"
            placeholder="https://"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            aria-invalid={(submitted && !url.trim()) || undefined}
          />
          {submitted && !url.trim() && <p className="err">Enter the address to link to.</p>}
        </div>
        <div className="studio-dialog-actions">
          {isEditing && (
            <button type="button" className="btn sm ghost studio-dialog-left" onClick={remove}>
              Remove link
            </button>
          )}
          <button type="button" className="btn sm ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn sm">
            {isEditing ? 'Update link' : 'Add link'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
