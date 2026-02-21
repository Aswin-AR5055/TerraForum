import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}