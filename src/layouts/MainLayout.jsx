import Navbar from "../components/Navbar.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-canvas text-ink-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <main className="pb-12 pt-24 sm:pt-28">{children}</main>
    </div>
  );
}
