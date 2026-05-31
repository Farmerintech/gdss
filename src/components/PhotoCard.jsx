import { motion } from "framer-motion";
import { FiCopy, FiDownload, FiHeart, FiMaximize2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { usePhotoStore } from "../context/photoStore.js";
import { formatDate } from "../utils/date.js";
import { copyImageLink, downloadImage } from "../utils/download.js";
import { deletePhoto } from "../services/api.js";

export default function PhotoCard({ photo, onPreview }) {
  const { likedPhotoIds, toggleLike } = usePhotoStore();
  const liked = likedPhotoIds.includes(photo.id);
  const totalLikes = photo.likes;

  async function handleDownload(event) {
    event.stopPropagation();
    try {
      await downloadImage(photo.url, `${photo.uploaderName}-memory.jpg`);
      toast.success("Download started");
    } catch {
      toast.error("Download failed");
    }
  }
async function handleDelete(event) {
    event.stopPropagation();
    try {
      await deletePhoto()
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  }
  async function handleCopy(event) {
    event.stopPropagation();
    try {
      await copyImageLink(photo.url);
      toast.success("Image link copied");
    } catch {
      toast.error("Could not copy link");
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
      className="break-inside-avoid pb-5"
    >
      <div className="soft-card group overflow-hidden">
        <button
          type="button"
          onClick={() => onPreview(photo)}
          className="focus-ring relative block w-full overflow-hidden rounded-t-2xl bg-gray-100 text-left dark:bg-white/10"
        >
          <img
            src={photo.url}
            alt={`Event moment uploaded by ${photo.uploaderName}`}
            loading="lazy"
            className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-2xl bg-white/85 text-ink-900 opacity-0 shadow-sm backdrop-blur-xl transition group-hover:opacity-100">
            <FiMaximize2 aria-hidden="true" />
          </span>
        </button>
        <div className="space-y-4 p-4">
          <div>
            <p className="font-bold">{photo.uploaderName}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{formatDate(photo.uploadedAt)}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
                                  <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  await toggleLike(photo.id);
                } catch {
                  toast.error("Could not update like");
                }
              }}
              className={`focus-ring inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-bold transition ${
                liked
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-500/15"
                  : "bg-gray-100 text-gray-600 hover:text-rose-600 dark:bg-white/10 dark:text-gray-300"
              }`}
              aria-pressed={liked}
            >
              <FiHeart className={liked ? "fill-current" : ""} aria-hidden="true" />
              {totalLikes}
            </button>
             <button
                type="button"
                onClick={handleDelete(photo.id)}
                className="focus-ring grid size-11 place-items-center rounded-2xl bg-ink-900 text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink-900"
                aria-label="Download image"
              >
                <FiTrash2 aria-hidden="true" />
              </button>
              </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="focus-ring grid size-11 place-items-center rounded-2xl bg-gray-100 text-gray-600 transition hover:text-accent dark:bg-white/10 dark:text-gray-300"
                aria-label="Copy image link"
              >
                <FiCopy aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="focus-ring grid size-11 place-items-center rounded-2xl bg-ink-900 text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink-900"
                aria-label="Download image"
              >
                <FiDownload aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
