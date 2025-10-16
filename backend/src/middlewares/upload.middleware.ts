import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsRoot = path.resolve(process.cwd(), 'uploads');
const polizasDir = path.join(uploadsRoot, 'polizas');
const productosDir = path.join(uploadsRoot, 'productos');

// Ensure directories exist at runtime
for (const dir of [uploadsRoot, polizasDir, productosDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (_req: unknown, _file: any, cb: (error: Error | null, destination: string) => void) => {
    cb(null, polizasDir);
  },
  filename: (_req: unknown, file: any, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname) || '.pdf';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const name = `${Date.now()}_${base}${ext}`;
    cb(null, name);
  }
});

export const uploadPoliza = multer({
  storage,
  fileFilter: (_req: unknown, file: any, cb: (error: Error | null, acceptFile?: boolean) => void) => {
    // Accept PDFs and common image types just in case
    const ok = /pdf|png|jpg|jpeg/.test((file.mimetype || '').toLowerCase());
    if (ok) return cb(null, true);
    cb(new Error('Tipo de archivo no permitido'));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Separate storage for product images
const storageProductos = multer.diskStorage({
  destination: (_req: unknown, _file: any, cb: (error: Error | null, destination: string) => void) => {
    cb(null, productosDir);
  },
  filename: (_req: unknown, file: any, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const name = `${Date.now()}_${base}${ext}`;
    cb(null, name);
  }
});

export const uploadProducto = multer({
  storage: storageProductos,
  fileFilter: (_req: unknown, file: any, cb: (error: Error | null, acceptFile?: boolean) => void) => {
    const ok = /png|jpg|jpeg|webp/.test((file.mimetype || '').toLowerCase());
    if (ok) return cb(null, true);
    cb(new Error('Tipo de imagen no permitido'));
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});



