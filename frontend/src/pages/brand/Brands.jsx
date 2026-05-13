import { useEffect, useState } from "react";

import { getBrands, searchBrands } from "../../api/brandApi";

import { useNavigate } from "react-router-dom";
const Brands = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Brands
  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data.brands);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching brands");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value.trim()) {
      fetchBrands();
      return;
    }
    try {
      const res = await searchBrands(value);
      setBrands(res.data.brands);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(()=>{
    fetchBrands();
  }, []);

  return   <div className="min-h-screen bg-[#0f0f0f] text-white">

  {/* Hero Section */}
  <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800">

    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 blur-3xl rounded-full"></div>

    <div className="relative max-w-7xl mx-auto px-6 py-24">

      <div className="max-w-3xl">

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm text-orange-100 mb-6">
          🍔 Multi-Brand Cloud Kitchen Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          Discover & Manage
          <span className="block text-orange-200">
            Food Brands
          </span>
        </h1>

        <p className="text-lg text-orange-100/90 leading-relaxed max-w-2xl">
          Explore existing food brands, manage cloud kitchens,
          and scale hyperlocal food delivery with smart branch infrastructure.
        </p>

      </div>
    </div>
  </div>


  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* Top Controls */}
    <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mb-10">

      {/* Search */}
      <div className="relative w-full max-w-xl">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search brands, cuisines, categories..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1b1b1b] border border-white/5 focus:border-orange-500 outline-none text-white placeholder:text-gray-500 transition"
        />
      </div>


      {/* CTA */}
      <button
        onClick={() => navigate("/create-brand")}
        className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 transition px-7 py-4 rounded-2xl font-semibold shadow-lg shadow-orange-500/20"
      >
        + Create Brand
      </button>
    </div>


    {/* Error */}
    {error && (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-2xl mb-8">
        {error}
      </div>
    )}


    {/* Loading */}
    {loading ? (

      <div className="flex items-center justify-center py-32">
        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

    ) : brands.length === 0 ? (

      <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl py-24 text-center">

        <h2 className="text-2xl font-bold mb-3">
          No Brands Found
        </h2>

        <p className="text-gray-400 mb-8">
          Try searching something else or create your own brand.
        </p>

        <button
          onClick={() => navigate("/create-brand")}
          className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-semibold"
        >
          Create Brand
        </button>

      </div>

    ) : (

      <>
        {/* Stats */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-2xl font-bold">
              Available Brands
            </h2>

            <p className="text-gray-400 mt-1">
              {brands.length} brands available on Byto
            </p>
          </div>

        </div>


        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

          {brands.map((brand) => (

            <div
              key={brand._id}
              className="group bg-[#181818] border border-white/5 hover:border-orange-500/30 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
            >

              {/* Top */}
              <div className="p-7">

                {/* Logo + Rating */}
                <div className="flex items-start justify-between mb-6">

                  {brand.logo ? (

                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                    />

                  ) : (

                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-3xl font-black shadow-lg shadow-orange-500/20">
                      {brand.name.charAt(0)}
                    </div>

                  )}

                  <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ {brand.rating?.toFixed(1) || "0.0"}
                  </div>
                </div>


                {/* Name */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition">
                  {brand.name}
                </h2>


                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-[70px]">
                  {brand.description ||
                    "No description available for this brand."}
                </p>


                {/* Cuisine */}
                <div className="flex flex-wrap gap-2 mt-5">

                  {brand.cuisineType?.map((item, index) => (

                    <span
                      key={index}
                      className="bg-white/5 border border-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>

                  ))}
                </div>
              </div>


              {/* Footer */}
              <div className="border-t border-white/5 px-7 py-5 flex items-center justify-between bg-white/[0.02]">

                <div className="text-sm text-gray-500">
                  Byto Partner Brand
                </div>

                <button
                  onClick={() => navigate(`/brand/${brand._id}`)}
                  className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
</div>
};

export default Brands;
