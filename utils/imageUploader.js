import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, folder) => {
  const options = {
    folder,
    resource_type: "auto", // This allows Cloudinary to automatically detect the file type
    chunk_size: 6000000, // 6MB chunks
  };

  // If it's a video, add video-specific options
  if (file.mimetype.startsWith("video")) {
    options.eager = [
      {
        format: "mp4",
        transformation: [
          { width: 1280, height: 720, crop: "pad" },
          { start_offset: "0", end_offset: "60", crop: "limit" },
        ],
      },
    ];
    options.eager_async = true;
  }
  // If it's an image, add image-specific options
  else if (file.mimetype.startsWith("image")) {
    options.transformation = [
      { width: 1000, height: 1000, crop: "limit" },
      { quality: "auto:good" },
    ];
  }

  try {
    console.log(`Starting upload to Cloudinary... File type: ${file.mimetype}`);
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Upload successful:", result.public_id);
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    throw error;
  }
};
