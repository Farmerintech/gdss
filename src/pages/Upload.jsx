import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition.jsx";
import UploadDropzone from "../components/UploadDropzone.jsx";
import { uploadImageToCloudinary } from "../services/cloudinary.js";
import { usePhotoStore } from "../context/photoStore.js";

export default function Upload() {
  const navigate = useNavigate();
  const { addPhoto } = usePhotoStore();

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!files.length) {
      toast.error("Choose at least one image");
      return;
    }

    setUploading(true);
    setProgress(4);

    try {
      const uploaded = [];

      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];

        const result = await uploadImageToCloudinary(
          file,
          (fileProgress) => {
            const overall = Math.round(
              ((index + fileProgress / 100) / files.length) * 100
            );

            setProgress(overall);
          }
        );

        const savedPhoto = await addPhoto({
          publicId: result.publicId,
          imageUrl: result.url,
          tags: ["uploaded"],
          caption:"GDSS CLASS OF 2017 Get together"
        });

        uploaded.push(savedPhoto);
      }

      toast.success(
        `${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} uploaded`
      );

      navigate("/gallery");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <PageTransition>
      <section className="container-shell">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Contribute
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Upload photos
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Add moments from your camera roll and share them with everyone at
              the event.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="soft-card overflow-hidden"
          >
            <div className="grid gap-6 p-5 sm:p-8">
              <UploadDropzone
                files={files}
                setFiles={setFiles}
              />

              {uploading && (
                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/5">
                  <div className="mb-2 flex items-center justify-between text-sm font-bold">
                    <span>Uploading</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-success transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <FiCheckCircle
                  className="text-success"
                  aria-hidden="true"
                />
                Images only, maximum 10 MB each
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="focus-ring inline-flex min-h-12 items-center justify-center rounded-2xl bg-ink-900 px-6 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-ink-900"
              >
                {uploading ? "Uploading..." : "Upload to Gallery"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
