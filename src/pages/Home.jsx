import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiImage, FiUpload, FiUsers } from "react-icons/fi";
import PageTransition from "../components/PageTransition.jsx";
import StatPill from "../components/StatPill.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import PhotoModal from "../components/PhotoModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { usePhotoStore } from "../context/photoStore.js";
import { useAttendeeStore } from "../context/attendeeStore.js";
import { useEffect, useState } from "react";

const highlights = [
  "Golden-hour arrivals",
  "Dinner table candids",
  "Dance floor favorites",
  "Group portraits"
];

export default function Home() {
  const { photos, loadPhotos } = usePhotoStore();
  const { attendees, loadAttendees } = useAttendeeStore();
  const [preview, setPreview] = useState(null);
  const recentPhotos = photos.slice(0, 3);
const date = new Date();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const formattedDate = date.toLocaleDateString("en-US", options)
  .replace(/,/g, "");

// console.log(formattedDate);
  useEffect(() => {
    loadPhotos();
    loadAttendees();
  }, [loadAttendees, loadPhotos]);

  return (
    <PageTransition>
      <section className="container-shell">
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft dark:bg-gray-900 sm:p-10 lg:p-14">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-500/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold uppercase tracking-[0.24em] text-accent"
              >
                {formattedDate}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-5 max-w-3xl text-5xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-6xl lg:text-7xl"
              >
                GDSS Adeta Alumni Association 2017
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
              >
                A shared gallery for every toast, portrait, laugh, and tiny in-between moment from the gathering.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/gallery"
                  className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink-900 px-6 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 dark:bg-white dark:text-ink-900"
                >
                  View Gallery <FiArrowRight aria-hidden="true" />
                </Link>
                <Link
                  to="/upload"
                  className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 text-sm font-bold text-ink-900 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  Upload Photos <FiUpload aria-hidden="true" />
                </Link>
              </motion.div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
                <StatPill label="Attendees" value={attendees.length} />
                <StatPill label="Photos" value={photos.length} />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18, duration: 0.36 }}
              className="glass-panel rounded-2xl p-3"
            >
              {recentPhotos.length ? (
                <div className="grid grid-cols-2 gap-3">
                  {recentPhotos.slice(0, 2).map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.url}
                      alt=""
                      className="aspect-[4/5] rounded-2xl object-cover"
                      loading="lazy"
                    />
                  ))}
                  <div className="col-span-2 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-white p-4 dark:bg-gray-950">
                    <div>
                      <p className="font-bold">Live event library</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Optimized, searchable, and ready to save.</p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-2xl bg-success/10 text-success">
                      <FiImage size={22} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid min-h-80 place-items-center rounded-2xl bg-white p-6 text-center dark:bg-gray-950">
                  <div>
                    <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gray-100 text-accent dark:bg-white/10">
                      <FiImage size={24} aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-bold">No photos yet</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload the first memory to start the shared gallery.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <FiUsers className="text-accent" aria-hidden="true" />
            <h2 className="text-2xl font-bold tracking-tight">Event highlights</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl bg-white p-4 font-semibold shadow-sm dark:bg-white/10"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Fresh from the gallery</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Recent uploads</h2>
            </div>
            <Link to="/gallery" className="text-sm font-bold text-accent">See all</Link>
          </div>
          {recentPhotos.length ? (
            <div className="columns-1 gap-5 sm:columns-2">
              {recentPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onPreview={setPreview} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No uploads yet"
              message="Once attendees upload photos, the newest moments will appear here."
              actionLabel="Upload Photos"
              actionTo="/upload"
            />
          )}
        </div>
      </section>
      <PhotoModal photo={preview} onClose={() => setPreview(null)} />
    </PageTransition>
  );
}
