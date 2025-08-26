import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// cria uma constante equivalente ao __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configuração do storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // salva na pasta src/uploads
    cb(null, resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // cria um nome único para cada arquivo
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// cria o middleware multer
const upload = multer({ storage });

export default upload;
