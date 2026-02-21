import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Feed />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}