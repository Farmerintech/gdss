import { AnimatePresence, motion } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDate } from "../utils/date.js";
import { downloadImage } from "../utils/download.js";

export default function PhotoModal({ photo, onClose }) {
  async function handleDownload() {
    try {
      await downloadImage(photo.url, `${photo.uploaderName}-memory.jpg`);
    } catch {
      toast.error("Could not download this image");
    }
  }

  return (
    <AnimatePresence>
      {photo ? (
        <div className="fixed inset-0 z-[60] grid place-items-center p-3">
          <motion.button
            type="button"
            aria-label="Close fullscreen preview"
            className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-glass dark:bg-gray-950"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          >
            <img src={photo.url} alt={`Uploaded by ${photo.uploaderName}`} className="max-h-[72vh] w-full object-contain bg-black" />
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-bold">{photo.uploaderName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(photo.uploadedAt)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="focus-ring grid size-11 place-items-center rounded-2xl bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                  aria-label="Download image"
                >
                  <FiDownload aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="focus-ring grid size-11 place-items-center rounded-2xl bg-gray-100 dark:bg-white/10"
                  aria-label="Close"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
