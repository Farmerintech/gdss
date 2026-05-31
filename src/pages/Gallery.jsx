import { useEffect, useState } from "react";
import { FiArchive, FiImage, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition.jsx";
import SearchInput from "../components/SearchInput.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import PhotoModal from "../components/PhotoModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import { usePhotoStore } from "../context/photoStore.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { downloadPhotosZip } from "../utils/download.js";

export default function Gallery() {
  const { photos, likedPhotoIds, loading, error, loadPhotos } = usePhotoStore();
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(null);
  const [loadingZip, setLoadingZip] = useState(false);
  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    loadPhotos(debouncedQuery ? { search: debouncedQuery } : {});
  }, [debouncedQuery, loadPhotos]);

  async function handleZip() {
    if (!photos.length) return;
    setLoadingZip(true);
    try {
      await downloadPhotosZip(photos);
    } catch {
      toast.error("ZIP download failed. Some photo hosts may block cross-origin downloads.");
    } finally {
      setLoadingZip(false);
    }
  }

  return (
    <PageTransition>
      <section className="container-shell">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Shared camera roll</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Gallery</h1>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Search the event, save what you love, and open each memory in a clean fullscreen view.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleZip}
              disabled={loadingZip || !photos.length}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10"
            >
              <FiArchive aria-hidden="true" />
              {loadingZip ? "Preparing ZIP" : "Download ZIP"}
            </button>
            <Link
              to="/upload"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              <FiPlus aria-hidden="true" />
              Upload
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by uploader or moment" />
          <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold shadow-sm dark:bg-white/10">
            {photos.length} photos
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold shadow-sm dark:bg-white/10">
            {likedPhotoIds.length} liked
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <EmptyState title="Could not load photos" message={error} />
        ) : photos.length ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onPreview={setPreview} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No photos match"
            message="Try searching for a guest name, a moment, or upload new photos from your phone."
            actionLabel="Upload Photos"
            actionTo="/upload"
          />
        )}

        <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white p-4 text-sm text-gray-600 shadow-sm dark:bg-white/10 dark:text-gray-300">
          <FiImage className="shrink-0 text-success" aria-hidden="true" />
          <span>Images are lazy-loaded and optimized for fast mobile browsing.</span>
        </div>
      </section>
      <PhotoModal photo={preview} onClose={() => setPreview(null)} />
    </PageTransition>
  );
}
