import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createMenu } from "../../api/menuApi";
import { getMyBranches } from "../../api/branchApi";

const CreateMenu = () => {
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    branch: "",
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

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await getMyBranches();
      setBranches(res.branches);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleDietChange = (diet) => {
    setForm((prev) => ({
      ...prev,
      dietType: prev.dietType.includes(diet)
        ? prev.dietType.filter(
            (d) => d !== diet
          )
        : [...prev.dietType, diet],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await createMenu(form);

      setSuccess(
        "Menu item created successfully 🎉"
      );

      setTimeout(() => {
        navigate("/menus");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create menu item"
      );
    } finally {
      setLoading(false);
    }
  };

  const diets = [
    "Keto",
    "High Protein",
    "Weight Loss",
    "Balanced",
    "Low Carb",
    "Vegan",
    "Gluten Free",
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700">

        <div className="px-6 py-20 mx-auto max-w-7xl">

          <h1 className="mb-4 text-5xl font-black">
            Create Menu Item
          </h1>

          <p className="text-lg text-orange-100">
            Add food items to your branch menu
          </p>

        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl px-6 py-10 mx-auto">

        <div className="bg-[#181818] rounded-3xl p-8 border border-white/5">

          {error && (
            <div className="p-4 mb-6 text-red-400 border bg-red-500/10 border-red-500/30 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 text-green-400 border bg-green-500/10 border-green-500/30 rounded-xl">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >

            {/* Branch */}
            <div className="md:col-span-2">

              <label className="block mb-2 text-gray-400">
                Branch
              </label>

              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">
                  Select Branch
                </option>

                {branches.map((branch) => (
                  <option
                    key={branch._id}
                    value={branch._id}
                  >
                    {branch.name}
                  </option>
                ))}
              </select>

            </div>

            {/* Name */}
            <div>

              <label className="block mb-2 text-gray-400">
                Food Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                required
              />

            </div>

            {/* Category */}
            <div>

              <label className="block mb-2 text-gray-400">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snacks</option>
                <option>Dessert</option>
                <option>Beverages</option>
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
                value={form.description}
                onChange={handleChange}
                className="resize-none input"
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
                value={form.price}
                onChange={handleChange}
                className="input"
                required
              />

            </div>

            <div>

              <label className="block mb-2 text-gray-400">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
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
                value={form.calories}
                onChange={handleChange}
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
                value={form.protein}
                onChange={handleChange}
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
                value={form.carbs}
                onChange={handleChange}
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
                value={form.fat}
                onChange={handleChange}
                className="input"
              />

            </div>

            {/* Diet Types */}
            <div className="md:col-span-2">

              <label className="block mb-3 text-gray-400">
                Diet Tags
              </label>

              <div className="flex flex-wrap gap-3">

                {diets.map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() =>
                      handleDietChange(diet)
                    }
                    className={`px-4 py-2 rounded-full border transition ${
                      form.dietType.includes(
                        diet
                      )
                        ? "bg-orange-500 border-orange-500"
                        : "border-white/10 bg-[#202020]"
                    }`}
                  >
                    {diet}
                  </button>
                ))}

              </div>

            </div>

            {/* Toggles */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isVeg"
                checked={form.isVeg}
                onChange={handleChange}
              />

              <span>Vegetarian</span>

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="subscriptionEligible"
                checked={
                  form.subscriptionEligible
                }
                onChange={handleChange}
              />

              <span>
                Subscription Eligible
              </span>

            </div>

            {/* Submit */}
            <div className="mt-4 md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold transition bg-orange-500 hover:bg-orange-600 rounded-2xl"
              >
                {loading
                  ? "Creating..."
                  : "Create Menu Item"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;