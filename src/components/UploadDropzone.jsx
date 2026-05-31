import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";

const maxSize = 10 * 1024 * 1024;

export default function UploadDropzone({ files, setFiles }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  const addFiles = useCallback(
    (selectedFiles) => {
      const valid = [];
      Array.from(selectedFiles).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          return;
        }
        if (file.size > maxSize) {
          toast.error(`${file.name} is larger than 10 MB`);
          return;
        }
        valid.push(file);
      });
      if (valid.length) setFiles((current) => [...current, ...valid]);
    },
    [setFiles]
  );

  return (
    <div className="space-y-5">
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        whileTap={{ scale: 0.99 }}
        className={`focus-ring w-full rounded-2xl border-2 border-dashed px-5 py-12 text-center transition ${
          dragging
            ? "border-accent bg-accent/5"
            : "border-gray-300 bg-white hover:border-accent/60 dark:border-white/15 dark:bg-white/5"
        }`}
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gray-100 text-accent dark:bg-white/10">
          <FiUploadCloud size={28} aria-hidden="true" />
        </span>
        <span className="mt-5 block text-xl font-bold">Drop photos here</span>
        <span className="mt-2 block text-sm leading-6 text-gray-500 dark:text-gray-400">
          Choose multiple images from your camera roll. Each file can be up to 10 MB.
        </span>
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => addFiles(event.target.files)}
      />

      {previews.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {previews.map(({ file, url }) => (
            <div key={`${file.name}-${file.lastModified}`} className="soft-card overflow-hidden">
              <img src={url} alt={file.name} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                  className="focus-ring grid size-9 shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                  aria-label={`Remove ${file.name}`}
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:bg-white/5 dark:text-gray-400">
          <FiImage className="shrink-0" aria-hidden="true" />
          <span>No photos selected yet.</span>
        </div>
      )}
    </div>
  );
}
