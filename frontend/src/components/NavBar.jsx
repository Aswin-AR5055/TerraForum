import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile/");
        setProfilePic(res.data.profile_picture);
      } catch (err) {
        console.error("Failed to fetch profile picture:", err);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white px-6 py-4 shadow-2xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="text-blue-400">🌍</span>
          TerraForum
        </Link>

        <div className="flex gap-4 items-center">
          {!token ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-400" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}