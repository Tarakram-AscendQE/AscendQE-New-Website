import React, { useRef, useEffect } from 'react';
import launchFilmVideo from '@/assets/hero-video.mp4';

interface TrailerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerDialog: React.FC<TrailerDialogProps> = ({ isOpen, onClose }) => {
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
      className="!w-[min(1200px,94vw)] !max-w-[min(1200px,94vw)]"
      aria-label="AscendQE launch film"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onClose={onClose}
    >
      <div className="film-head">
        <strong>AscendQE · The launch film</strong>
        <button
          id="close-trailer"
          type="button"
          aria-label="Close launch film"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <video
        ref={videoRef}
        id="launch-film"
        controls
        playsInline
        preload="none"
        src={launchFilmVideo}
      />
    </dialog>
  );
};

