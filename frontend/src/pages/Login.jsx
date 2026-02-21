import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/NavBar";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await API.post("/users/login/", {
                username,
                password
            });

            console.log("Login Response:", response.data)

            if (response.data.error) {
                alert(response.data.error);
                return;
            }

            if (!response.data.token) {
                alert("Login failed: No token recieved");
                return;
            }
            
            const token = response.data.token;
            console.log("Token:", token);
            localStorage.setItem("token", token);
            console.log("Stored Token:", localStorage.getItem("token"));

            alert("Login Successful");
            navigate("/");
        } catch (err) {

            if (err.response) {
                setError(err.response.data.error || "Login failed");
            } else {
                setError("Server Error");
            }

        } finally {
            setLoading(false);
        }
    };

        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex justify-center items-center mt-20">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form 
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-80"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border p-2 rounded mb-4"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            {loading ? "Logging in...": "Login"}
                        </button>
                    </div>
                </form>

                {error && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                    </p>
                )}
                </div>
            </div>
        );
    }