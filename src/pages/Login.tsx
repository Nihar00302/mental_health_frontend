import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Import your backend URL
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      // ✅ Optionally store token in localStorage
      localStorage.setItem("token", response.data.token);
      // ✅ Redirect after success
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-3 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <button className="btn btn-link p-0" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
