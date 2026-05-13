import { useState } from "react";
import { createBrand } from "../../api/brandApi";
import { useNavigate } from "react-router-dom";

const CreateBrand = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    cuisineType: "",
    phone: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create Brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name) {
      setError("Brand name is required");
      return;
    }
    setLoading(true);
    try {
      //convert cusineType string to array
      const payload = {
        ...form,
        cusineType: form.cuisineType
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      const res = await createBrand(payload);
      console.log("Brand created:", res.data);
      setSuccess("Brand created successfully");

      setTimeout(() => {
        navigate("/branch/create");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Error creating brand");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

  {/* Hero Section */}
  <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800">

    {/* Glow Effects */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 blur-3xl rounded-full"></div>

    <div className="relative max-w-7xl mx-auto px-6 py-24">

      <div className="max-w-3xl">

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm text-orange-100 mb-6">
          🚀 Launch Your Food Brand
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          Create Your
          <span className="block text-orange-200">
            Cloud Kitchen Brand
          </span>
        </h1>

        <p className="text-lg text-orange-100/90 leading-relaxed max-w-2xl">
          Build your brand identity, manage multiple branches,
          and scale your hyperlocal food delivery business with Byto.
        </p>

      </div>
    </div>
  </div>


  {/* Main Content */}
  <div className="max-w-6xl mx-auto px-6 py-12">

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* Left Info Panel */}
      <div className="space-y-6">

        {/* Feature Card */}
        <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Why Create a Brand?
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl">
                🍔
              </div>

              <div>
                <h3 className="font-semibold mb-1">
                  Multi-Branch Expansion
                </h3>

                <p className="text-sm text-gray-400">
                  Manage multiple kitchen branches under one brand.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl">
                📦
              </div>

              <div>
                <h3 className="font-semibold mb-1">
                  Smart Delivery System
                </h3>

                <p className="text-sm text-gray-400">
                  Optimize delivery routing and fulfillment zones.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl">
                📈
              </div>

              <div>
                <h3 className="font-semibold mb-1">
                  Business Analytics
                </h3>

                <p className="text-sm text-gray-400">
                  Track sales, subscriptions, and operational growth.
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* Preview Card */}
        <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">

          <h3 className="text-xl font-bold mb-5">
            Brand Preview
          </h3>

          <div className="flex items-center gap-4 mb-5">

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-3xl font-black shadow-lg shadow-orange-500/20">
              {form.name
                ? form.name.charAt(0).toUpperCase()
                : "B"}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {form.name || "Brand Name"}
              </h2>

              <p className="text-orange-400 text-sm">
                Byto Partner Brand
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">

            {form.cuisineType
              ?.split(",")
              .map((item, index) =>
                item.trim() ? (
                  <span
                    key={index}
                    className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs"
                  >
                    {item.trim()}
                  </span>
                ) : null
              )}

          </div>
        </div>
      </div>


      {/* Form Card */}
      <div className="xl:col-span-2 bg-[#181818] border border-white/5 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-10">

          <h2 className="text-3xl font-bold mb-3">
            Brand Information
          </h2>

          <p className="text-gray-400">
            Fill in your business details to create your brand.
          </p>
        </div>


        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-2xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-4 rounded-2xl">
            {success}
          </div>
        )}


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
        >

          {/* Brand Name */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-3">
              Brand Name *
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Burger Hub"
              className="input"
            />
          </div>


          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-3">
              Brand Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your food brand, cuisine, and experience..."
              className="input resize-none"
            />
          </div>


          {/* Cuisine */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Cuisine Types
            </label>

            <input
              type="text"
              name="cuisineType"
              value={form.cuisineType}
              onChange={handleChange}
              placeholder="Burger, Fast Food, Beverages"
              className="input"
            />
          </div>


          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="input"
            />
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Business Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="brand@email.com"
              className="input"
            />
          </div>


          {/* Website */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Website
            </label>

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://yourbrand.com"
              className="input"
            />
          </div>


          {/* Submit */}
          <div className="md:col-span-2 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20"
            >
              {loading
                ? "Creating Brand..."
                : "Create Brand"}
            </button>

          </div>

        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default CreateBrand;
