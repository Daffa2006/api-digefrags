import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve(process.cwd(), "public", "uploads");

// buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// config storage yang benar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // path absolut ke public/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.parse(file.originalname).name.replace(/\s+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
