import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Attendees from "../pages/Attendees.jsx";
import Gallery from "../pages/Gallery.jsx";
import Upload from "../pages/Upload.jsx";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/attendees" element={<Attendees />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
