import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";
import Navbar from "../components/layout/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "admin_email") {
      setFormData((prev) => ({ ...prev, email: value }));
      return;
    }

    if (name === "admin_password") {
      setFormData((prev) => ({ ...prev, password: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("portfolio_admin", "true");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28">

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute left-[-80px] top-[120px] h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute right-[-60px] bottom-[-80px] h-80 w-80 rounded-full bg-slate-300/40 blur-3xl" />
        </div>

        <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-2">

          {/* ================= LEFT SIDE (SUPER SIMPLE) ================= */}
          <div className="relative hidden bg-[linear-gradient(135deg,#020617,#0f172a,#1e3a8a)] p-10 text-white md:flex">

            <div className="relative z-10 flex flex-col justify-between h-full">

              {/* TOP */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs tracking-[0.2em]">
                  <FaShieldAlt />
                  Admin
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  Manage your portfolio
                </h1>

                <p className="mt-5 text-sm text-slate-300">
                  Login and control everything from one place.
                </p>
              </div>

              {/* SIMPLE STEPS */}
              <div className="mt-10 space-y-2 rounded-2xl bg-white/10 p-5 text-xs text-slate-300">

                <p className="font-semibold text-blue-200 uppercase tracking-widest">
                  Setup
                </p>

                <p>• download backend & frontend</p>
                <p>• change .env file</p>
                <p>• set API URL</p>
                <p>• update everything from dashboard</p>

              </div>

              {/* LINKS */}
              <div className="mt-6 space-y-2 text-xs text-slate-300">

                <p className="text-blue-200 font-semibold">GitHub</p>

                <a
                  href="https://github.com/nowshinreza/Portfolio-backend"
                  target="_blank"
                  className="block hover:text-white"
                >
                  backend download
                </a>

                <a
                  href="https://github.com/nowshinreza/Nowshin-Reza-Portfolio"
                  target="_blank"
                  className="block hover:text-white"
                >
                  frontend download
                </a>

              </div>

              {/* FOOT NOTE */}
              <div className="mt-6 rounded-xl bg-white/5 p-3 text-[11px] text-slate-300">
                change <span className="text-blue-200">.env</span> → get your own system
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE (UNCHANGED) ================= */}
          <div className="flex items-center justify-center p-8 md:p-14">

            <div className="w-full max-w-md">

              <button
                onClick={() => navigate("/")}
                className="mb-8 flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
              >
                <FaArrowLeft size={12} />
                Back
              </button>

              <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
              <p className="text-sm text-slate-500 mb-8">
                Enter your details to continue
              </p>

              <form onSubmit={handleLogin} className="space-y-5">

                {/* EMAIL */}
                <div className="flex items-center border rounded-2xl px-4 py-3">
                  <FaEnvelope className="text-slate-400" />
                  <input
                    type="text"
                    name="admin_email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full ml-3 outline-none bg-transparent"
                  />
                </div>

                {/* PASSWORD */}
                <div className="flex items-center border rounded-2xl px-4 py-3">
                  <FaLock className="text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="admin_password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full ml-3 outline-none bg-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 text-white py-3 rounded-2xl"
                >
                  {loading ? "Loading..." : "Login"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;