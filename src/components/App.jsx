import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Obx from "./Obx";

export function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Obx />} />
      </Routes>
    </Router>
  );
}
