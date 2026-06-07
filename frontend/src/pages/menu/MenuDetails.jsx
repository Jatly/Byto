import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMenuById } from "../../api/menuApi";

const MenuDetails = () => {

  const { id } = useParams();

  const [menu, setMenu] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {

      const res = await getMenuById(id);

      setMenu(res.data.menu);

    } catch (error) {

      console.log(error);

      setError("Failed to load menu item");

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-red-400">
        {error || "Menu not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Hero */}

      <div className="relative h-[450px]">

        <img
          src={
            menu.images?.[0] ||
            "https://via.placeholder.com/1200x600"
          }
          alt={menu.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-10">

          <div className="flex flex-wrap gap-2 mb-4">

            {menu.isVeg && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Veg
              </span>
            )}

            {menu.subscriptionEligible && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                Subscription Meal
              </span>
            )}

          </div>

          <h1 className="text-5xl font-black mb-4">
            {menu.name}
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl">
            {menu.description}
          </p>

        </div>
      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2">

            {/* Nutrition */}

            <div className="bg-[#181818] border border-white/5 rounded-3xl p-8 mb-8">

              <h2 className="text-2xl font-bold mb-6">
                Nutrition Information
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                <div className="bg-[#202020] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Calories
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {menu.calories || 0}
                  </h3>
                </div>

                <div className="bg-[#202020] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Protein
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {menu.protein || 0}g
                  </h3>
                </div>

                <div className="bg-[#202020] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Carbs
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {menu.carbs || 0}g
                  </h3>
                </div>

                <div className="bg-[#202020] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Fat
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {menu.fat || 0}g
                  </h3>
                </div>

              </div>

            </div>

            {/* Diet Tags */}

            <div className="bg-[#181818] border border-white/5 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Diet Tags
              </h2>

              <div className="flex flex-wrap gap-3">

                {menu.dietType?.map((diet) => (
                  <span
                    key={diet}
                    className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-2 rounded-full"
                  >
                    {diet}
                  </span>
                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="sticky top-6 bg-[#181818] border border-white/5 rounded-3xl p-8">

              <h2 className="text-3xl font-black text-orange-400 mb-2">
                ₹{menu.price}
              </h2>

              {menu.discountPrice > 0 && (
                <p className="text-gray-500 line-through mb-4">
                  ₹{menu.discountPrice}
                </p>
              )}

              <div className="space-y-4 mb-8">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Category
                  </span>

                  <span>{menu.category}</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Prep Time
                  </span>

                  <span>
                    {menu.preparationTime} min
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Availability
                  </span>

                  <span
                    className={
                      menu.isAvailable
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {menu.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>

              </div>

              <button
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-bold text-lg"
                disabled={!menu.isAvailable}
              >
                Add To Cart
              </button>

              {menu.subscriptionEligible && (

                <button
                  className="w-full mt-4 bg-[#202020] hover:bg-[#252525] transition py-4 rounded-2xl font-semibold"
                >
                  Subscribe To Meal Plan
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MenuDetails;