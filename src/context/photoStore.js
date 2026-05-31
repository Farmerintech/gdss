import { create } from "zustand";
import { fetchPhotos, savePhoto, setPhotoLike } from "../services/api.js";

const LIKED_KEY = "memories-liked-photo-ids";

function getLikedPhotoIds() {
  try {
    return JSON.parse(window.localStorage.getItem(LIKED_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLikedPhotoIds(ids) {
  window.localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
}

export const usePhotoStore = create((set, get) => ({
  photos: [],
  likedPhotoIds: getLikedPhotoIds(),
  loading: false,
  error: "",
  loadPhotos: async (params = {}) => {
    set({ loading: true, error: "" });
    try {
      const photos = await fetchPhotos(params);
      set({ photos, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Could not load photos"
      });
    }
  },
  addPhoto: async (payload) => {
    const photo = await savePhoto(payload);
    set({ photos: [photo, ...get().photos] });
    return photo;
  },
  toggleLike: async (photoId) => {
    const liked = get().likedPhotoIds;
    const nextLiked = !liked.includes(photoId);
    const next = nextLiked ? [...liked, photoId] : liked.filter((id) => id !== photoId);
    saveLikedPhotoIds(next);
    set({ likedPhotoIds: next });
    try {
      const updatedPhoto = await setPhotoLike(photoId, nextLiked);
      set({
        photos: get().photos.map((photo) => (photo.id === photoId ? updatedPhoto : photo))
      });
    } catch (error) {
      saveLikedPhotoIds(liked);
      set({ likedPhotoIds: liked });
      throw error;
    }
  }
}));
