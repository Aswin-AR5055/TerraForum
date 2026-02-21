import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-4 py-5 shadow">

            <div className="max-w-4x2 mx-auto flex justify-between items-center">

                <Link to="/" className="text-lg font-bold">
                TerraForum
                </Link>

                <div className="flex gap-3">
                    {!token ? (
                        <>
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link to="/register" className="hover:underline">
                            Register
                        </Link>
                        </>
                    ) : (

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                    )}
                </div>
            </div>
        </nav>
    );
}