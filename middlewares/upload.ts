import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  file.mimetype.startsWith('image/')
    ? cb(null, true)
    : cb(new Error('Only images allowed!'));
};
export const uploadNone = multer({ storage: storage });
export const uploadSingle = multer({ storage, fileFilter }).single('image');
export const uploadMultiple = multer({ storage, fileFilter }).array(
  'images',
  5
);
