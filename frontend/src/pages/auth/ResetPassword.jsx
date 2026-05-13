import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../../api/authApi";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.password || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, {
        password: form.password,
      });

      setSuccess("Password reset successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Reset Password
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-sm text-center text-green-400">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="mb-4 input"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mb-6 input"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-400">
          Back to{" "}
          <Link
            to="/login"
            className="text-orange-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;