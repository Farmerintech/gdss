import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://gdss-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

function normalizeAttendee(attendee) {
  return {
    id: attendee._id || attendee.id,
    fullName: attendee.fullName,
    name: attendee.fullName,
    nickname: attendee.nickname || "",
    profileImageUrl: attendee.profileImageUrl || "",
    avatar: attendee.profileImageUrl || "",
    uploadedPhotos: attendee.uploadedPhotos || 0,
    createdAt: attendee.createdAt,
    updatedAt: attendee.updatedAt
  };
}

export function normalizePhoto(photo) {
  return {
    id: photo._id || photo.id,
    publicId: photo.publicId,
    url: photo.imageUrl,
    imageUrl: photo.imageUrl,
    uploaderName: photo.uploaderName,
    attendee: photo.attendee ? normalizeAttendee(photo.attendee) : null,
    uploadedAt: photo.createdAt || photo.uploadedAt,
    createdAt: photo.createdAt,
    caption: photo.caption || "",
    tags: photo.tags || [],
    likes: photo.likes || 0
  };
}

export async function fetchAttendees(search = "") {
  const response = await api.get("/attendees/", { params: search ? { search } : {} });
  return response.data.data.map(normalizeAttendee);
}

export async function saveAttendee(payload) {
  const response = await api.post("/attendees/", payload);
  return normalizeAttendee(response.data.data);
}

export async function fetchPhotos(params = {}) {
  const response = await api.get("/photos", { params });
  return response.data.data.map(normalizePhoto);
}

export async function savePhoto(payload) {
  const response = await api.post("/photos", payload);
  return normalizePhoto(response.data.data);
}

export async function setPhotoLike(photoId, liked) {
  const response = await api.patch(`/photos/${photoId}/like`, { liked });
  return normalizePhoto(response.data.data);
}
