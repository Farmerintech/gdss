import { FiSearch } from "react-icons/fi";

export default function SearchInput({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="focus-within:ring-accent flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:ring-2 dark:border-white/10 dark:bg-white/10">
      <FiSearch className="text-gray-400" aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-gray-400 dark:text-white"
      />
    </label>
  );
}
