import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: "18px",
            border: "1px solid rgba(229, 231, 235, 0.9)",
            boxShadow: "0 18px 60px rgba(17, 24, 39, 0.12)"
          }
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
