import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./pages/App.jsx";
import FloatingObjects from "./pages/FloatingObjects.jsx";
import ParallaxPage from "./pages/ParallaxPage.jsx";
import SpinningIndex from "./pages/SpinningIndex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/float" element={<FloatingObjects />} />
        <Route path="/parallax" element={<ParallaxPage />} />
        <Route path="/spinningindex" element={<SpinningIndex />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
