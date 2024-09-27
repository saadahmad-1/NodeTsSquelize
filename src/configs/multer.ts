import multer from 'multer';
import path from 'path';

// Set up disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Ensure a unique filename
    },
});

// File filter to allow only specific types (e.g., images)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'), false);  // Reject the file
    }
};

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
});

export default upload;
