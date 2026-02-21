import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/NavBar";

export default function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await API.post("/users/register/", {
        username,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      if (err.response) {
        setError(err.response.data.error || "Registration failed");
      } else {
        setError("Server error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex justify-center items-center w-full">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-80">

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

        <div className="mt-4">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
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
