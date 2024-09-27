import { Request, Response } from 'express';
import cloudinary from '../configs/cloudinary';
import { Image } from '../models/Image'; // Sequelize Image model
import { create } from 'domain';

// Add new image
export const uploadImage = async (req: Request, res: Response) => {
    try {
        // Ensure that a file has been uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Type the uploaded file correctly using multer's type
        const file = req.file as Express.Multer.File;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'images', // Specify folder in Cloudinary
        });

        // Save image metadata to MySQL
        const newImage = await Image.create({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resource_type: result.resource_type,
            original_filename: result.original_filename,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// Add comments to existing image
export const addComment = async (req: Request, res: Response) => {
    try {
        const { imageId } = req.params;
        const { comment } = req.body;

        const image = await Image.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Assuming there's a comments field
        image.comments = image.comments ? [...image.comments, comment] : [comment];
        await image.save();

        return res.status(200).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
