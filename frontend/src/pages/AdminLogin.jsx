import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@gmail.com",
    password: "admin123",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={login}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Admin Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}