import { useState } from "react";
import { signup } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await signup(form);

      console.log("Signup success:", res);

      // 👉 go to OTP page
      navigate("/verify-otp", {
        state: { email: form.email },
        replace: true,
      });
    } catch (err) {
      console.log("Frontend error:", err);

      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Create your Byto account
        </h2>

        {/* ❌ Error */}
        {error && (
          <p className="mb-4 text-sm text-center text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            className="w-full mb-4 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
