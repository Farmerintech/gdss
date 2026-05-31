# Memories

Memories is a premium, mobile-first event photo-sharing app. Attendees can upload photos, browse a masonry gallery, like favorite moments, copy links, download individual images, and export the gallery as a ZIP.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Cloudinary unsigned uploads
- Axios
- Zustand
- React Icons
- React Hot Toast
- JSZip

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Add your Cloudinary values:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
VITE_CLOUDINARY_FOLDER=memories
VITE_API_URL=http://localhost:5000/api
```

4. Start the app:

```bash
npm run dev
```

## Backend Setup

Start the Node/MongoDB API from the sibling backend folder:

```bash
cd ../memories-backend
npm install
cp .env.example .env
npm run dev
```

The frontend reads attendees and photos from `VITE_API_URL`. The gallery is populated only from the backend.

## Cloudinary Setup

Create an unsigned upload preset in Cloudinary and restrict it to images. The app uploads images to Cloudinary first, then stores metadata in MongoDB through the backend:

- uploader name
- upload date
- optimized image URL
- Cloudinary `public_id`

The backend keeps the shared event gallery synchronized for all attendees.

## Notes

- If Cloudinary environment variables are missing, the app shows an error toast instead of attempting upload.
- Attendees and gallery photos come from MongoDB through the backend API.
- The UI supports dark mode and is optimized for phone-sized screens first.
