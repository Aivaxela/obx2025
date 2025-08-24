import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Obx from "./Obx";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/obx" element={<Obx />} />
        <Route path="/" element={<h1>Hello!</h1>} />
      </Routes>
    </Router>
  );
}
