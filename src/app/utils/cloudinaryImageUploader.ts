import multer from 'multer';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
/**
 *
 * @param storage storage for holding file using multer
 * @param uploadFile uploader function for image files to storage
 * @param sendImageToCloudinary uploader function for images files to cloudinary
 **/

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();
export const uploadFile = multer({ storage });

// Upload file to Cloudinary directly from memory
export const sendImageToCloudinary = (
  imageName: string,
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: imageName?.trim() },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result as UploadApiResponse);
      }
    );
    uploadStream.end(buffer);
  });
};
