import { useState } from "react";
import { forgotPassword } from "../../api/authApi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await forgotPassword({ email: email.trim().toLowerCase() });
      setSuccess("Password reset link sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Forgot Password
        </h2>

        <p className="mb-6 text-sm text-center text-gray-400">
          Enter your email to receive a password reset link.
        </p>

        {error && (
          <p className="mb-4 text-sm text-center text-red-400">{error}</p>
        )}

        {success && (
          <p className="mb-4 text-sm text-center text-green-400">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="mb-6 input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-400">
          Remember your password?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
