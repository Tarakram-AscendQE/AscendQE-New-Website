// Article image uploads (studio only): R2/S3 when configured, otherwise local disk.
import path from 'node:path';
import type { Request, Response } from 'express';
import multer from 'multer';
import { saveBlogImage } from '../services/storageService.js';
import { sendJson, sendServerError } from './respond.js';

const IMAGE_TYPES = /^(jpe?g|png|webp|gif)$/i;

/** Unique, URL-safe file name: blog_<timestamp>_<random>[_<original name>]<ext> */
function buildImageFilename(extension: string, originalName = ''): string {
  const safeName = path
    .basename(originalName, path.extname(originalName))
    .replace(/[^\w-]/g, '')
    .slice(0, 60);
  const unique = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return `blog_${unique}${safeName ? `_${safeName}` : ''}${extension}`;
}

/** Images in memory (max 15 MB); saveBlogImage decides where they are stored. */
export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname).slice(1);
    const mimeSubtype = file.mimetype.split('/')[1] ?? '';
    if (IMAGE_TYPES.test(extension) && IMAGE_TYPES.test(mimeSubtype)) cb(null, true);
    else cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed.'));
  },
});

/** POST /api/upload (requireAuth, multipart field "image") */
export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    sendJson(res, 422, false, 'No image file was uploaded.');
    return;
  }
  try {
    const extension = path.extname(req.file.originalname).toLowerCase() || '.png';
    const filename = buildImageFilename(extension, req.file.originalname);
    const url = await saveBlogImage(req.file.buffer, filename, req.file.mimetype);
    sendJson(res, 200, true, 'Image uploaded.', { url, filename });
  } catch (err) {
    sendServerError(res, 'Upload', err, 'Image upload failed.');
  }
}
