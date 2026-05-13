import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authApi";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const cleanedForm = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };
    try {
      const res = await login(cleanedForm);
      const { token, user } = res;
      localStorage.setItem("token", token);

      //  Role-based navigation

      if (user.role === "branch") {
        navigate("/branch/dashboard");
      } else if (user.role === "delivery") {
        navigate("/delivery/dashboard");
      } else {
        navigate("/profile"); // user
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login to Byto
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-400">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            disabled={loading}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-2 input"
            onChange={handleChange}
            disabled={loading}
            required
          />

          {/* Forgot password */}
          <div className="mb-4 text-right">
            <Link
              to="/forgot"
              className="text-sm text-orange-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup links */}
        <p className="mt-5 text-sm text-center text-gray-400">
          Don’t have an account?
        </p>

        <div className="flex justify-center gap-4 mt-2 text-sm">
          <Link to="/signup" className="text-orange-400 hover:underline">
            User
          </Link>
          <Link to="/signup-branch" className="text-orange-400 hover:underline">
            Kitchen
          </Link>
          <Link
            to="/signup-delivery"
            className="text-orange-400 hover:underline"
          >
            Delivery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
