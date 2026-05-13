import { useState } from "react";
import { signupDelivery } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const SignupDelivery = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    };

    try {
      await signupDelivery(cleanedForm);

      alert("OTP sent to your email 📧");

      navigate("/verify-otp", {
        state: { email: cleanedForm.email },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[360px]">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Become a Delivery Partner
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
            disabled={loading}
            required
          />

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
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            className="input"
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-6 input"
            onChange={handleChange}
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Creating..." : "Register"}
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

export default SignupDelivery;