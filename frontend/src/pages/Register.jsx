import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

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
    <div style={{ padding: "20px" }}>
      
      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

    </div>
  );
}
