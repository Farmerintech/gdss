import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function AttendeeModal({ attendee, onClose }) {
  const initials = attendee?.fullName
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AnimatePresence>
      {attendee ? (
        <div className="fixed inset-0 z-[60] grid place-items-end p-3 sm:place-items-center">
          <motion.button
            type="button"
            aria-label="Close attendee profile"
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendee-profile-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-glass dark:bg-gray-950"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="focus-ring absolute right-4 top-4 grid size-10 place-items-center rounded-2xl bg-gray-100 dark:bg-white/10"
              aria-label="Close"
            >
              <FiX aria-hidden="true" />
            </button>
            {attendee.avatar ? (
              <img src={attendee.avatar} alt="" className="size-24 rounded-full object-cover" />
            ) : (
              <span className="grid size-24 place-items-center rounded-full bg-ink-900 text-2xl font-bold text-white dark:bg-white dark:text-ink-900">
                {initials}
              </span>
            )}
            <h2 id="attendee-profile-title" className="mt-5 text-2xl font-bold">{attendee.fullName}</h2>
            <p className="mt-1 text-sm font-semibold text-accent">{attendee.nickname}</p>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              {attendee.fullName} has contributed to the shared event gallery.
            </p>
            <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-white/10">
              <p className="text-3xl font-bold">{attendee.uploadedPhotos}</p>
              <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Photos contributed</p>
            </div>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
