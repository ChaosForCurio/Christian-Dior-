import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export const uploadImage = async (url: string, folder: string = 'dior-products') => {
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: folder,
            resource_type: 'auto',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

export default cloudinary;
