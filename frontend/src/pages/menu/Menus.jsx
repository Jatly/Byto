import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBranchMenus,
  deleteMenu,
  toggleMenuAvailability,
} from "../../api/menuApi";

const Menus = () => {
  const { branchId } = useParams();

  const navigate = useNavigate();
  
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
      console.log("branchId:", branchId);
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">

  <div className="px-6 py-8 mx-auto max-w-7xl">

    {/* HEADER */}

    <div className="flex flex-col gap-6 mb-10 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
          Menu Management
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Manage menu items, pricing, nutrition and availability
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/branches/${branchId}/menu/create`)
        }
        className="px-6 py-3 font-semibold text-white transition-all bg-orange-500 shadow-lg rounded-2xl hover:bg-orange-600 hover:scale-105 shadow-orange-500/20"
      >
        + Add Menu Item
      </button>

    </div>

    {error && (
      <div className="px-4 py-3 mb-6 text-red-400 border rounded-2xl bg-red-500/10 border-red-500/20">
        {error}
      </div>
    )}

    {/* STATS */}

    <div className="grid grid-cols-2 gap-5 mb-10 lg:grid-cols-4">

      <div className="p-6 border rounded-3xl bg-[#141414] border-white/5">
        <p className="text-sm text-gray-400">
          Total Items
        </p>

        <h2 className="mt-3 text-4xl font-black">
          {totalMenus}
        </h2>
      </div>

      <div className="p-6 border rounded-3xl bg-[#141414] border-green-500/10">
        <p className="text-sm text-gray-400">
          Available
        </p>

        <h2 className="mt-3 text-4xl font-black text-green-400">
          {availableMenus}
        </h2>
      </div>

      <div className="p-6 border rounded-3xl bg-[#141414] border-orange-500/10">
        <p className="text-sm text-gray-400">
          Subscription
        </p>

        <h2 className="mt-3 text-4xl font-black text-orange-400">
          {subscriptionMenus}
        </h2>
      </div>

      <div className="p-6 border rounded-3xl bg-[#141414] border-white/5">
        <p className="text-sm text-gray-400">
          Avg Calories
        </p>

        <h2 className="mt-3 text-4xl font-black">
          {avgCalories}
        </h2>
      </div>

    </div>

    {/* SEARCH + FILTERS */}

    <div className="p-5 mb-10 border rounded-3xl bg-[#141414] border-white/5">

      <input
        type="text"
        placeholder="🔍 Search menu items..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          px-5
          py-4
          bg-[#0d0d0d]
          border
          border-white/10
          rounded-2xl
          outline-none
          focus:border-orange-500
          transition
        "
      />

      <div className="flex flex-wrap gap-3 mt-5">

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
            className={`
              px-4 py-2
              rounded-xl
              text-sm
              font-medium
              transition-all
              w-auto
              ${
                filter === item
                  ? "bg-orange-500 text-white"
                  : "bg-[#1b1b1b] text-gray-400 hover:text-white hover:bg-[#222]"
              }
            `}
          >
            {item}
          </button>

        ))}

      </div>

    </div>
        {/* LOADING */}

        {loading ? (
          <div className="flex justify-center py-32">

            <div className="border-4 border-orange-500 rounded-full w-14 h-14 border-t-transparent animate-spin"></div>

          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="bg-[#181818] rounded-3xl p-20 text-center">

            <h2 className="mb-4 text-3xl font-bold">
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
className="
bg-[#141414]
border
border-white/5
hover:border-orange-500/20
rounded-3xl
transition-all
hover:-translate-y-1
overflow-hidden
"              >

                <div className="p-7">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h2 className="mb-2 text-2xl font-bold">
                        {menu.name}
                      </h2>

                      <p className="text-gray-400">
                        {menu.category}
                      </p>

                    </div>

                    <div
  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border ${
    menu.isAvailable
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : "bg-red-500/10 text-red-400 border-red-500/20"
  }`}
>
  <span
    className={`w-2 h-2 rounded-full ${
      menu.isAvailable
        ? "bg-green-400"
        : "bg-red-400"
    }`}
  ></span>

  {menu.isAvailable
    ? "Available"
    : "Unavailable"}
</div>

                  </div>

                  <p className="mt-4 text-gray-400 line-clamp-2">
                    {menu.description}
                  </p>

                  {/* TAGS */}

                  <div className="flex flex-wrap gap-2 mt-5">

                    {menu.isVeg && (
                      <span className="px-3 py-1 text-xs text-green-400 rounded-full bg-green-500/10">
                        Veg
                      </span>
                    )}

                    {menu.subscriptionEligible && (
                      <span className="px-3 py-1 text-xs text-orange-400 rounded-full bg-orange-500/10">
                        Subscription
                      </span>
                    )}

                    {menu.dietType?.map((diet) => (
                      <span
                        key={diet}
                        className="px-3 py-1 text-xs rounded-full bg-white/5"
                      >
                        {diet}
                      </span>
                    ))}

                  </div>

                  {/* NUTRITION */}

<div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-4">
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

                  <div className="flex items-center gap-3 mt-6">

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
      navigate(`/menu/edit/${menu._id}`)
    }
    className="flex-1 py-3 font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleToggle(menu._id)
    }
    className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
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
    className="
      w-12
      h-12
      flex
      items-center
      justify-center
      bg-[#252525]
      hover:bg-red-500
      rounded-xl
      transition
    "
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