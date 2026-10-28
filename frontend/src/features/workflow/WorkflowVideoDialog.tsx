import React, { useRef, useEffect } from 'react';
import workflowVideo from '@/assets/videos/Agentic QE - Humans in the lead.mp4';

interface WorkflowVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowVideoDialog: React.FC<WorkflowVideoDialogProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        videoRef.current?.play().catch(() => {});
      }
    } else {
      if (dialog.open) {
        dialog.close();
        videoRef.current?.pause();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="trailer-dialog"
      className="video-modal-dialog !w-[min(1200px,94vw)] !max-w-[min(1200px,94vw)]"
      aria-label="AscendQE Agentic QE workflow video"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onClose={onClose}
    >
      <div className="film-head">
        <strong>AscendQE · Agentic QE — Humans in the lead</strong>
        <button
          id="close-trailer"
          className="close-video-dialog"
          type="button"
          aria-label="Close workflow video"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <video
        ref={videoRef}
        id="launch-film"
        className="video-modal-player"
        controls
        playsInline
        preload="metadata"
        src={workflowVideo}
      />
    </dialog>
  );
};

