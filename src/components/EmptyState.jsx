import { FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center dark:border-white/15 dark:bg-white/5">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300">
        <FiImage size={24} aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">{message}</p>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-accent px-5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
