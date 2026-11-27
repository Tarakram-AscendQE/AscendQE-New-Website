// Image helpers for the studio editor (no React).

/**
 * Compressed JPEG data URL of an image (longest side ≤ maxDim). Used when an upload fails, so the image is
 * stored inside the article instead and publishing is never blocked (same fallback as the previous studio).
 */
export function fileToOptimizedDataUrl(file: File, maxDim = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('The image could not be read.'));
    reader.onload = () => {
      const source = String(reader.result);
      const img = new Image();
      img.onerror = () => reject(new Error('The file is not a readable image.'));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const context = canvas.getContext('2d');
        if (!context) {
          resolve(source);
          return;
        }
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = source;
    };
    reader.readAsDataURL(file);
  });
}
