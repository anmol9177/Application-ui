import { Routes, Route } from "react-router-dom";

import ApplicationPage from "./pages/ApplicationPage";
import OfferPage from "./pages/OfferPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationPage />} />
      <Route path="/offer" element={<OfferPage />} />
    </Routes>
  );
}