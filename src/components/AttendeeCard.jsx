import { motion } from "framer-motion";
import { FiImage } from "react-icons/fi";

export default function AttendeeCard({ attendee, onSelect }) {
  const initials = attendee.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(attendee)}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className="focus-ring soft-card group w-full p-5 text-left transition"
    >
      <div className="flex items-center gap-4">
        {attendee.avatar ? (
          <img
            src={attendee.avatar}
            alt={attendee.fullName}
            className="size-16 rounded-full object-cover ring-4 ring-gray-100 transition group-hover:ring-accent/20 dark:ring-white/10"
            loading="lazy"
          />
        ) : (
          <span className="grid size-16 place-items-center rounded-full bg-ink-900 text-lg font-bold text-white ring-4 ring-gray-100 transition group-hover:ring-accent/20 dark:bg-white dark:text-ink-900 dark:ring-white/10">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold">{attendee.fullName}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{attendee.nickname || "Guest"}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
        <FiImage className="text-accent" aria-hidden="true" />
        <span>{attendee.uploadedPhotos} uploaded photos</span>
      </div>
    </motion.button>
  );
}
