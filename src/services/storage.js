import { samplePhotos } from "../data/sampleData.js";

const PHOTO_KEY = "memories-photos";
const LIKED_KEY = "memories-liked-photo-ids";

export function getStoredPhotos() {
  const raw = window.localStorage.getItem(PHOTO_KEY);
  if (!raw) return samplePhotos;

  try {
    const parsed = JSON.parse(raw);
    return [...parsed, ...samplePhotos.filter((sample) => !parsed.some((item) => item.id === sample.id))];
  } catch {
    return samplePhotos;
  }
}

export function saveUploadedPhotos(photos) {
  const existingUploads = getStoredPhotos().filter((photo) => !photo.id.startsWith("sample-"));
  window.localStorage.setItem(PHOTO_KEY, JSON.stringify([...photos, ...existingUploads]));
}

export function getLikedPhotoIds() {
  try {
    return JSON.parse(window.localStorage.getItem(LIKED_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveLikedPhotoIds(ids) {
  window.localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
}
