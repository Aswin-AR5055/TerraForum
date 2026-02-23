import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            const res = await API.get("/users/profile/");
            if (isMounted) {
                setProfile(res.data);
            }
        };

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar />
            <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl p-8">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                            <span className="text-blue-400">👤</span>
                            Profile
                        </h2>
                        <div className="flex flex-col items-center gap-4">
                            <img src={profile.profile_picture} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-700" />
                            <h3 className="text-xl font-semibold text-white">{profile.username}</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Link to="/dashboard" className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all shadow-lg transform hover:scale-105">
                                Back to Feed
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}