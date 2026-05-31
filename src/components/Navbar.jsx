import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiCamera, FiGrid, FiHome, FiMenu, FiMoon, FiSun, FiUpload, FiUsers, FiX } from "react-icons/fi";
import { useThemeStore } from "../context/themeStore.js";

const links = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/attendees", label: "Attendees", icon: FiUsers },
  { to: "/gallery", label: "Gallery", icon: FiGrid },
  { to: "/upload", label: "Upload", icon: FiUpload }
];

function NavItem({ link, onClick }) {
  const Icon = link.icon;
  return (
    <NavLink
      to={link.to}
      onClick={onClick}
      className={({ isActive }) =>
        `focus-ring flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold transition ${
          isActive
            ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
            : "text-gray-600 hover:bg-gray-100 hover:text-ink-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`
      }
    >
      <Icon aria-hidden="true" />
      <span>{link.label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const ThemeIcon = theme === "dark" ? FiSun : FiMoon;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/75 z-[90]">
      <nav className="container-shell flex h-20 items-center justify-between">
        <NavLink to="/" className="focus-ring flex items-center gap-3 rounded-2xl" aria-label="Memories home">
          <span className="grid size-11 place-items-center rounded-2xl bg-ink-900 text-white shadow-soft dark:bg-white dark:text-ink-900">
            <FiCamera size={20} aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-tight">GDSS'2017</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavItem key={link.to} link={link} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="focus-ring grid size-11 place-items-center rounded-2xl border border-gray-200 bg-white text-ink-900 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label="Toggle dark mode"
          >
            <ThemeIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="focus-ring grid size-11 place-items-center rounded-2xl border border-gray-200 bg-white text-ink-900 shadow-sm md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label="Open menu"
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm md:hidden z-[90]"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed bottom-0 right-0 top-0 z-50 w-[86vw] max-w-sm border-l border-gray-200 bg-white p-5 shadow-glass md:hidden dark:border-white/10 dark:bg-gray-950"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-bold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="focus-ring grid size-11 place-items-center rounded-2xl bg-gray-100 dark:bg-white/10"
                  aria-label="Close menu"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
              <div className="grid gap-2">
                {links.map((link) => (
                  <NavItem key={link.to} link={link} onClick={() => setOpen(false)} />
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
