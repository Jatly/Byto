import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getMenuById,
  updateMenu,
} from "../../api/menuApi";

const EditMenu = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Lunch",

    price: "",
    discountPrice: "",

    isVeg: false,

    calories: "",
    protein: "",
    carbs: "",
    fat: "",

    preparationTime: 15,

    subscriptionEligible: false,

    dietType: [],
  });

  const diets = [
    "Keto",
    "High Protein",
    "Weight Loss",
    "Balanced",
    "Low Carb",
    "Vegan",
    "Gluten Free",
  ];

  // =====================================
  // FETCH MENU
  // =====================================

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {

      const res =
        await getMenuById(id);

      const menu = res.data.menu;

      setForm({
        name: menu.name || "",
        description:
          menu.description || "",

        category:
          menu.category || "Lunch",

        price: menu.price || "",

        discountPrice:
          menu.discountPrice || "",

        isVeg:
          menu.isVeg || false,

        calories:
          menu.calories || "",

        protein:
          menu.protein || "",

        carbs:
          menu.carbs || "",

        fat:
          menu.fat || "",

        preparationTime:
          menu.preparationTime || 15,

        subscriptionEligible:
          menu.subscriptionEligible ||
          false,

        dietType:
          menu.dietType || [],
      });

    } catch (error) {

      console.log(error);

      setError(
        "Failed to load menu item"
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================
  // DIET TOGGLE
  // =====================================

  const handleDietChange = (
    diet
  ) => {

    setForm((prev) => ({
      ...prev,

      dietType:
        prev.dietType.includes(
          diet
        )
          ? prev.dietType.filter(
              (d) => d !== diet
            )
          : [
              ...prev.dietType,
              diet,
            ],
    }));
  };

  // =====================================
  // UPDATE MENU
  // =====================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setSaving(true);

    setError("");

    try {

      await updateMenu(
        id,
        form
      );

      setSuccess(
        "Menu updated successfully 🎉"
      );

      setTimeout(() => {

        navigate(-1);

      }, 1500);

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data
          ?.message ||
          "Failed to update menu"
      );

    } finally {

      setSaving(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-700">

        <div className="max-w-6xl mx-auto px-6 py-20">

          <h1 className="text-5xl font-black mb-4">
            Edit Menu Item
          </h1>

          <p className="text-orange-100 text-lg">
            Update food details,
            nutrition and pricing
          </p>

        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-[#181818] border border-white/5 rounded-3xl p-8">

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Name */}

            <div>
              <label className="block mb-2 text-gray-400">
                Food Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            {/* Category */}

            <div>
              <label className="block mb-2 text-gray-400">
                Category
              </label>

              <select
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                className="input"
              >
                <option>
                  Breakfast
                </option>
                <option>
                  Lunch
                </option>
                <option>
                  Dinner
                </option>
                <option>
                  Snacks
                </option>
                <option>
                  Dessert
                </option>
                <option>
                  Beverages
                </option>
              </select>
            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <label className="block mb-2 text-gray-400">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                className="input resize-none"
              />
            </div>

            {/* Pricing */}

            <div>
              <label className="block mb-2 text-gray-400">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-400">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={
                  form.discountPrice
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            {/* Nutrition */}

            <div>
              <label className="block mb-2 text-gray-400">
                Calories
              </label>

              <input
                type="number"
                name="calories"
                value={
                  form.calories
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-400">
                Protein (g)
              </label>

              <input
                type="number"
                name="protein"
                value={
                  form.protein
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-400">
                Carbs (g)
              </label>

              <input
                type="number"
                name="carbs"
                value={
                  form.carbs
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-400">
                Fat (g)
              </label>

              <input
                type="number"
                name="fat"
                value={
                  form.fat
                }
                onChange={
                  handleChange
                }
                className="input"
              />
            </div>

            {/* Diet Tags */}

            <div className="md:col-span-2">

              <label className="block mb-3 text-gray-400">
                Diet Tags
              </label>

              <div className="flex flex-wrap gap-3">

                {diets.map(
                  (diet) => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() =>
                        handleDietChange(
                          diet
                        )
                      }
                      className={`px-4 py-2 rounded-full border transition ${
                        form.dietType.includes(
                          diet
                        )
                          ? "bg-orange-500 border-orange-500"
                          : "bg-[#202020] border-white/10"
                      }`}
                    >
                      {diet}
                    </button>
                  )
                )}

              </div>
            </div>

            {/* Toggles */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isVeg"
                checked={
                  form.isVeg
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Vegetarian
              </span>

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="subscriptionEligible"
                checked={
                  form.subscriptionEligible
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Subscription Eligible
              </span>

            </div>

            {/* Submit */}

            <div className="md:col-span-2 mt-6">

              <button
                disabled={saving}
                className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-bold text-lg transition"
              >
                {saving
                  ? "Saving Changes..."
                  : "Update Menu"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditMenu;