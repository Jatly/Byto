import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBranchMenus,
  deleteMenu,
  toggleMenuAvailability,
} from "../../api/menuApi";

const Menus = () => {
  const navigate = useNavigate();

  const { branchId } = useParams();

  const [menus, setMenus] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // =====================================
  // FETCH MENUS
  // =====================================

  const fetchMenus = async () => {
    try {
      const res = await getBranchMenus(branchId);

      setMenus(res.data.menus);
    } catch (error) {
      console.log(error);

      setError("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [branchId]);

  // =====================================
  // TOGGLE AVAILABILITY
  // =====================================

  const handleToggle = async (id) => {
    try {
      await toggleMenuAvailability(id);

      setMenus((prev) =>
        prev.map((menu) =>
          menu._id === id
            ? {
                ...menu,
                isAvailable: !menu.isAvailable,
              }
            : menu
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // DELETE MENU
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenu(id);

      setMenus((prev) =>
        prev.filter((menu) => menu._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // FILTER MENUS
  // =====================================

  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      const matchesSearch =
        menu.name
          .toLowerCase()
          .includes(search.toLowerCase());

      if (filter === "veg")
        return matchesSearch && menu.isVeg;

      if (filter === "nonveg")
        return matchesSearch && !menu.isVeg;

      if (filter === "subscription")
        return (
          matchesSearch &&
          menu.subscriptionEligible
        );

      if (filter === "available")
        return (
          matchesSearch &&
          menu.isAvailable
        );

      if (filter === "unavailable")
        return (
          matchesSearch &&
          !menu.isAvailable
        );

      return matchesSearch;
    });
  }, [menus, search, filter]);

  // =====================================
  // STATS
  // =====================================

  const totalMenus = menus.length;

  const availableMenus =
    menus.filter((m) => m.isAvailable).length;

  const subscriptionMenus =
    menus.filter(
      (m) => m.subscriptionEligible
    ).length;

  const avgCalories =
    menus.length > 0
      ? Math.round(
          menus.reduce(
            (acc, menu) =>
              acc + (menu.calories || 0),
            0
          ) / menus.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}

      <div className="border-b border-white/5 bg-gradient-to-r from-orange-500 to-orange-700">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h1 className="text-5xl font-black mb-4">
                Menu Management
              </h1>

              <p className="text-orange-100 text-lg">
                Manage food items, nutrition
                plans and availability
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/branch/${branchId}/menu/create`
                )
              }
              className="bg-white text-orange-600 hover:bg-orange-100 transition px-7 py-4 rounded-2xl font-bold"
            >
              + Add Menu Item
            </button>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#181818] rounded-3xl p-6 border border-white/5">
            <p className="text-gray-400 text-sm">
              Total Items
            </p>

            <h2 className="text-4xl font-black mt-2">
              {totalMenus}
            </h2>
          </div>

          <div className="bg-[#181818] rounded-3xl p-6 border border-white/5">
            <p className="text-gray-400 text-sm">
              Available
            </p>

            <h2 className="text-4xl font-black mt-2 text-green-400">
              {availableMenus}
            </h2>
          </div>

          <div className="bg-[#181818] rounded-3xl p-6 border border-white/5">
            <p className="text-gray-400 text-sm">
              Subscription Meals
            </p>

            <h2 className="text-4xl font-black mt-2 text-orange-400">
              {subscriptionMenus}
            </h2>
          </div>

          <div className="bg-[#181818] rounded-3xl p-6 border border-white/5">
            <p className="text-gray-400 text-sm">
              Avg Calories
            </p>

            <h2 className="text-4xl font-black mt-2">
              {avgCalories}
            </h2>
          </div>

        </div>

        {/* SEARCH */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-[#181818] border border-white/5 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mb-10">

          {[
            "all",
            "veg",
            "nonveg",
            "subscription",
            "available",
            "unavailable",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full transition ${
                filter === item
                  ? "bg-orange-500"
                  : "bg-[#181818]"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex justify-center py-32">

            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="bg-[#181818] rounded-3xl p-20 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Menu Items Found
            </h2>

            <p className="text-gray-400">
              Add your first menu item to start
              receiving orders.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

            {filteredMenus.map((menu) => (

              <div
                key={menu._id}
                className="bg-[#181818] rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition"
              >

                <div className="p-7">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">
                        {menu.name}
                      </h2>

                      <p className="text-gray-400">
                        {menu.category}
                      </p>

                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-sm ${
                        menu.isAvailable
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {menu.isAvailable
                        ? "Available"
                        : "Unavailable"}
                    </div>

                  </div>

                  <p className="text-gray-400 mt-4 line-clamp-2">
                    {menu.description}
                  </p>

                  {/* TAGS */}

                  <div className="flex flex-wrap gap-2 mt-5">

                    {menu.isVeg && (
                      <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                        Veg
                      </span>
                    )}

                    {menu.subscriptionEligible && (
                      <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs">
                        Subscription
                      </span>
                    )}

                    {menu.dietType?.map((diet) => (
                      <span
                        key={diet}
                        className="bg-white/5 px-3 py-1 rounded-full text-xs"
                      >
                        {diet}
                      </span>
                    ))}

                  </div>

                  {/* NUTRITION */}

                  <div className="grid grid-cols-4 gap-3 mt-6">

                    <div className="bg-[#202020] rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Calories
                      </p>

                      <h3 className="font-bold">
                        {menu.calories || 0}
                      </h3>
                    </div>

                    <div className="bg-[#202020] rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Protein
                      </p>

                      <h3 className="font-bold">
                        {menu.protein || 0}g
                      </h3>
                    </div>

                    <div className="bg-[#202020] rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Carbs
                      </p>

                      <h3 className="font-bold">
                        {menu.carbs || 0}g
                      </h3>
                    </div>

                    <div className="bg-[#202020] rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Fat
                      </p>

                      <h3 className="font-bold">
                        {menu.fat || 0}g
                      </h3>
                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="mt-6 flex items-center gap-3">

                    <h2 className="text-3xl font-black text-orange-400">
                      ₹{menu.price}
                    </h2>

                    {menu.discountPrice > 0 && (
                      <span className="text-gray-500 line-through">
                        ₹{menu.discountPrice}
                      </span>
                    )}

                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-3 mt-8">

                    <button
                      onClick={() =>
                        navigate(
                          `/menu/edit/${menu._id}`
                        )
                      }
                      className="flex-1 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleToggle(menu._id)
                      }
                      className={`flex-1 py-3 rounded-xl font-semibold ${
                        menu.isAvailable
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {menu.isAvailable
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(menu._id)
                      }
                      className="px-5 bg-[#252525] hover:bg-red-500 rounded-xl"
                    >
                      🗑
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Menus;