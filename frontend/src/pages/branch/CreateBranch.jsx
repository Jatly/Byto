import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBranch } from "../../api/branchApi";

const CreateBranch = () => {

  const navigate = useNavigate();

  // Current Brand
  const brand = JSON.parse(
    localStorage.getItem("brand")
  );

  const [form, setForm] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    deliveryRadius: 5,
    averagePrepTime: 20,
    phone: "",
    openingTime: "08:00",
    closingTime: "23:00",
  });

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // =====================================
  // Handle Input
  // =====================================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // =====================================
  //  Detect Location
  // =====================================
  const getCurrentLocation = () => {

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setForm((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));

        setLocationLoading(false);
      },

      (error) => {

        console.log(error);

        setLocationLoading(false);

        setError(
          "Failed to detect current location"
        );
      }
    );
  };


  // =====================================
  //  Submit
  // =====================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.name ||
      !form.address ||
      !form.lat ||
      !form.lng
    ) {

      setError(
        "Please fill all required fields"
      );

      return;
    }

    setLoading(true);

    try {

      const payload = {

        name: form.name.trim(),

        address: form.address.trim(),

        location: {
          lat: Number(form.lat),
          lng: Number(form.lng),
        },

        deliveryRadius: Number(
          form.deliveryRadius
        ),

        averagePrepTime: Number(
          form.averagePrepTime
        ),

        phone: form.phone.trim(),

        openingTime: form.openingTime,

        closingTime: form.closingTime,
      };

      const res =
        await createBranch(payload);

      console.log(res);

      setSuccess(
        "Branch created successfully 🎉"
      );

      // Reset
      setForm({
        name: "",
        address: "",
        lat: "",
        lng: "",
        deliveryRadius: 5,
        averagePrepTime: 20,
        phone: "",
        openingTime: "08:00",
        closingTime: "23:00",
      });

      setTimeout(() => {
        navigate("/branches");
      }, 1500);

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to create branch"
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* ===================================== */}
      {/* HERO */}
      {/* ===================================== */}

      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800">

        {/* Glow */}
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-white/10 blur-3xl"></div>

        <div className="relative px-6 py-24 mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-orange-100 border rounded-full bg-white/10 border-white/10 backdrop-blur-md">
              📍 Hyperlocal Kitchen Setup
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-6xl">
              Create Your
              <span className="block text-orange-200">
                Branch
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-orange-100/90">
              Expand your food business with
              hyperlocal kitchen branches and
              optimized delivery zones.
            </p>

          </div>
        </div>
      </div>


      {/* ===================================== */}
      {/* MAIN */}
      {/* ===================================== */}

      <div className="px-6 py-12 mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">


          {/* ===================================== */}
          {/* SIDEBAR */}
          {/* ===================================== */}

          <div className="space-y-6">

            {/* Brand Card */}
            <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">

              <p className="mb-4 text-sm text-gray-400">
                Creating branch for
              </p>

              <div className="flex items-center gap-4">

                {brand?.logo ? (

                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="object-cover w-20 h-20 rounded-2xl"
                  />

                ) : (

                  <div className="flex items-center justify-center w-20 h-20 text-3xl font-black rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700">
                    {brand?.name?.charAt(0)}
                  </div>

                )}

                <div>

                  <h2 className="text-2xl font-bold">
                    {brand?.name}
                  </h2>

                  <p className="mt-1 text-sm text-orange-400">
                    Byto Partner Brand
                  </p>

                </div>
              </div>
            </div>


            {/* Preview */}
            <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">

              <h3 className="mb-6 text-xl font-bold">
                Branch Preview
              </h3>

              <div className="space-y-5">

                <div>

                  <p className="mb-1 text-sm text-gray-400">
                    Branch Name
                  </p>

                  <h2 className="text-2xl font-bold">
                    {form.name ||
                      "Branch Name"}
                  </h2>

                </div>


                <div>

                  <p className="mb-2 text-sm text-gray-400">
                    Delivery Radius
                  </p>

                  <div className="inline-flex px-4 py-2 text-sm text-orange-400 rounded-full bg-orange-500/10">
                    {
                      form.deliveryRadius
                    }{" "}
                    KM Radius
                  </div>

                </div>


                <div>

                  <p className="mb-2 text-sm text-gray-400">
                    Estimated ETA
                  </p>

                  <div className="text-lg font-semibold">
                    ~
                    {Number(
                      form.averagePrepTime
                    ) + 15}{" "}
                    mins
                  </div>

                </div>


                <div>

                  <p className="mb-2 text-sm text-gray-400">
                    Status
                  </p>

                  <div className="inline-flex px-4 py-2 text-sm text-green-400 rounded-full bg-green-500/10">
                    Ready to Launch
                  </div>

                </div>

              </div>
            </div>
          </div>


          {/* ===================================== */}
          {/* FORM */}
          {/* ===================================== */}

          <div className="xl:col-span-2 bg-[#181818] border border-white/5 rounded-3xl p-8 shadow-2xl">

            {/* Header */}
            <div className="mb-10">

              <h2 className="mb-3 text-3xl font-bold">
                Branch Information
              </h2>

              <p className="text-gray-400">
                Configure your kitchen branch,
                delivery radius, and operational
                settings.
              </p>

            </div>


            {/* Alerts */}
            {error && (
              <div className="px-5 py-4 mb-6 text-red-400 border rounded-2xl bg-red-500/10 border-red-500/30">
                {error}
              </div>
            )}

            {success && (
              <div className="px-5 py-4 mb-6 text-green-400 border rounded-2xl bg-green-500/10 border-green-500/30">
                {success}
              </div>
            )}


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-7"
            >

              {/* Branch Name */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
                  Branch Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Burger Hub - OMR"
                  className="input"
                />

              </div>


              {/* Phone */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
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


              {/* Address */}
              <div className="md:col-span-2">

                <label className="block mb-3 text-sm text-gray-400">
                  Full Address *
                </label>

                <textarea
                  rows={4}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter complete branch address..."
                  className="resize-none input"
                />

              </div>


              {/* Location */}
              <div className="md:col-span-2">

                <div className="flex items-center justify-between mb-3">

                  <label className="text-sm text-gray-400">
                    Geo Location *
                  </label>

                  <button
                    type="button"
                    onClick={
                      getCurrentLocation
                    }
                    disabled={
                      locationLoading
                    }
                    className="text-sm text-orange-400 hover:text-orange-300"
                  >
                    {locationLoading
                      ? "Detecting..."
                      : "📍 Detect Kitchen Location"}
                  </button>

                </div>


                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="number"
                    name="lat"
                    value={form.lat}
                    onChange={handleChange}
                    placeholder="Latitude"
                    className="input"
                  />

                  <input
                    type="number"
                    name="lng"
                    value={form.lng}
                    onChange={handleChange}
                    placeholder="Longitude"
                    className="input"
                  />

                </div>

              </div>


              {/* Delivery Radius */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
                  Delivery Radius (KM)
                </label>

                <input
                  type="number"
                  name="deliveryRadius"
                  value={
                    form.deliveryRadius
                  }
                  onChange={handleChange}
                  className="input"
                />

              </div>


              {/* Prep Time */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
                  Avg Prep Time (mins)
                </label>

                <input
                  type="number"
                  name="averagePrepTime"
                  value={
                    form.averagePrepTime
                  }
                  onChange={handleChange}
                  className="input"
                />

              </div>


              {/* Opening */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
                  Opening Time
                </label>

                <input
                  type="time"
                  name="openingTime"
                  value={form.openingTime}
                  onChange={handleChange}
                  className="input"
                />

              </div>


              {/* Closing */}
              <div>

                <label className="block mb-3 text-sm text-gray-400">
                  Closing Time
                </label>

                <input
                  type="time"
                  name="closingTime"
                  value={form.closingTime}
                  onChange={handleChange}
                  className="input"
                />

              </div>


              {/* Submit */}
              <div className="pt-4 md:col-span-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 disabled:opacity-60"
                >
                  {loading
                    ? "Creating Branch..."
                    : "Create Branch"}
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateBranch;