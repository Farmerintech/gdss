import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || "memories";

export const hasCloudinaryConfig = Boolean(cloudName && uploadPreset);

export function optimizedCloudinaryUrl(url, options = {}) {
  if (!url || !url.includes("/upload/")) return url;
  const {
    width = 1200,
    quality = "auto",
    format = "auto",
    crop = "limit"
  } = options;
  const transform = `f_${format},q_${quality},c_${crop},w_${width}`;
  return url.replace("/upload/", `/upload/${transform}/`);
}

export async function uploadImageToCloudinary(file, onProgress) {
  if (!hasCloudinaryConfig) {
    throw new Error("Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  data.append("folder", folder);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data,
    {
      onUploadProgress: (event) => {
        if (!event.total || !onProgress) return;
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    }
  );

  return {
    publicId: response.data.public_id,
    url: optimizedCloudinaryUrl(response.data.secure_url),
    originalUrl: response.data.secure_url
  };
}
