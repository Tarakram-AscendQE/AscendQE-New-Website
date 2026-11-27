import { useEffect, useRef, type ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  busyLabel: string;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Modal confirmation for destructive actions (native <dialog>: focus trap, Escape to cancel). */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  busyLabel,
  busy,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="studio-dialog"
      aria-labelledby="studio-confirm-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
    >
      <h2 id="studio-confirm-title">{title}</h2>
      <div className="muted mt8">{children}</div>
      <div className="studio-dialog-actions">
        <button type="button" className="btn sm ghost" onClick={onCancel} disabled={busy} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn sm danger" onClick={onConfirm} disabled={busy} aria-busy={busy}>
          {busy ? busyLabel : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
