import { Router } from 'express';
import { uploadImage, addComment } from '../controllers/image.controller';
import upload from '../middlewares/upload';

const router = Router();

router.post('/upload', upload.single('image'), uploadImage);  // For image upload
router.post('/:imageId/comments', addComment);  // For adding comments

export default router;
