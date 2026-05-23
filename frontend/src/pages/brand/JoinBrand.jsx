import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getBrands,
  joinBrand,
} from "../../api/brandApi";

const JoinBrand = () => {
    const navigate = useNavigate();
    const[brands,setBrands]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const[search,setSearch]=useState("");
    const[joining,setJoining]=useState("");
    const [success,setSuccess]=useState("");

    //fetch brands
    const fetchBrands=async()=>{
        try{
            const res = await getBrands();
            setBrands(res.brands);
        }catch(error){
            setError(error.response?.data?.message || "Error fetching brands");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchBrands();
    })

    //Join Brand
    const handleJoin  = async(brandId)=>{
        try{
            setJoining(brandId);

            const res = await joinBrand(brandId);
            localStorage.setItem("brand",JSON.stringify(res.data.brand));
            setSuccess("Joined brand successfully");
            setTimeout(()=>{navigate("/branches")},1500);
        }catch(error){
            setError(error.response?.data?.message || "Error joining brand");
        }finally{
            setJoining("");
        }
    }

    // Filter Brands
    const filteredBrands = brands.filter((brand)=>
        brand.name.toLowerCase().includes(search.toLowerCase())
    );
  return (
     <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800">

        {/* Glow */}
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-white/10 blur-3xl"></div>

        <div className="relative px-6 py-24 mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-orange-100 border rounded-full bg-white/10 border-white/10 backdrop-blur-md">
              🤝 Join Existing Brand
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-6xl">
              Connect With
              <span className="block text-orange-200">
                Food Brands
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-orange-100/90">
              Join an existing food brand and start managing
              cloud kitchen branches under a unified delivery ecosystem.
            </p>

          </div>
        </div>
      </div>


      {/* Main */}
      <div className="px-6 py-12 mx-auto max-w-7xl">

        {/* Alerts */}
        {error && (
          <div className="px-5 py-4 mb-8 text-red-400 border bg-red-500/10 border-red-500/30 rounded-2xl">
            {error}
          </div>
        )}

        {success && (
          <div className="px-5 py-4 mb-8 text-green-400 border bg-green-500/10 border-green-500/30 rounded-2xl">
            {success}
          </div>
        )}


        {/* Top Controls */}
        <div className="flex flex-col items-center justify-between gap-5 mb-10 lg:flex-row">

          {/* Search */}
          <div className="relative w-full max-w-xl">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-4 top-1/2"
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
              placeholder="Search brands..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1b1b1b] border border-white/5 focus:border-orange-500 outline-none text-white placeholder:text-gray-500 transition"
            />
          </div>


          {/* Create Brand */}
          <button
            onClick={() =>
              navigate("/create-brand")
            }
            className="w-full py-4 font-semibold transition bg-orange-500 shadow-lg lg:w-auto hover:bg-orange-600 px-7 rounded-2xl shadow-orange-500/20"
          >
            + Create New Brand
          </button>
        </div>


        {/* Loading */}
        {loading ? (

          <div className="flex items-center justify-center py-32">

            <div className="border-4 border-orange-500 rounded-full w-14 h-14 border-t-transparent animate-spin"></div>

          </div>

        ) : filteredBrands.length === 0 ? (

          <div className="bg-[#181818] border border-white/5 rounded-3xl py-24 text-center">

            <h2 className="mb-4 text-3xl font-bold">
              No Brands Found
            </h2>

            <p className="mb-8 text-gray-400">
              Try another search or create your own brand.
            </p>

            <button
              onClick={() =>
                navigate("/create-brand")
              }
              className="px-6 py-3 font-semibold transition bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              Create Brand
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {filteredBrands.map((brand) => (

              <div
                key={brand._id}
                className="group bg-[#181818] border border-white/5 hover:border-orange-500/30 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
              >

                {/* Top */}
                <div className="p-7">

                  {/* Logo */}
                  <div className="flex items-start justify-between mb-6">

                    {brand.logo ? (

                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="object-cover w-20 h-20 border rounded-2xl border-white/10"
                      />

                    ) : (

                      <div className="flex items-center justify-center w-20 h-20 text-3xl font-black shadow-lg rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-orange-500/20">
                        {brand.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                    )}

                    <div className="px-3 py-1 text-sm font-medium text-orange-400 rounded-full bg-orange-500/10">
                      ⭐ {brand.rating?.toFixed(1) || "0.0"}
                    </div>
                  </div>


                  {/* Name */}
                  <h2 className="mb-3 text-2xl font-bold transition group-hover:text-orange-400">
                    {brand.name}
                  </h2>


                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-[70px]">
                    {brand.description ||
                      "No description available for this brand."}
                  </p>


                  {/* Cuisine */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    {brand.cuisineType?.map(
                      (item, index) => (

                        <span
                          key={index}
                          className="bg-white/5 border border-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-full"
                        >
                          {item}
                        </span>
                      )
                    )}

                  </div>
                </div>


                {/* Footer */}
                <div className="border-t border-white/5 px-7 py-5 bg-white/[0.02]">

                  <button
                    onClick={() =>
                      handleJoin(brand._id)
                    }
                    disabled={
                      joining === brand._id
                    }
                    className="w-full py-3 font-semibold transition bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-xl"
                  >
                    {joining === brand._id
                      ? "Joining..."
                      : "Join Brand"}
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JoinBrand
