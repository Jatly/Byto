import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const categories = [
    "🍔 Burgers",
    "🍕 Pizza",
    "🥗 Healthy",
    "🍛 Indian",
    "🥤 Drinks",
    "🍰 Desserts",
  ];

  const foods = [
    {
      _id: 1,
      name: "Chicken Protein Bowl",
      calories: 420,
      price: 249,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    },
    {
      _id: 2,
      name: "Paneer Rice Bowl",
      calories: 390,
      price: 199,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    },
    {
      _id: 3,
      name: "Keto Chicken Salad",
      calories: 320,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    },
    {
      _id: 4,
      name: "Veg Burger",
      calories: 450,
      price: 179,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
  ];

  const branches = [
    {
      _id: 1,
      name: "Burger Hub",
      rating: 4.5,
      distance: "2.1 km",
      eta: "20 min",
    },
    {
      _id: 2,
      name: "Protein Kitchen",
      rating: 4.7,
      distance: "3.5 km",
      eta: "25 min",
    },
    {
      _id: 3,
      name: "Fit Meals",
      rating: 4.8,
      distance: "1.9 km",
      eta: "18 min",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700">

        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            Eat Smart.
            <br />
            Live Better.
          </h1>

          <p className="max-w-2xl text-lg text-orange-100 mb-8">
            Discover meals, nutrition plans and
            hyperlocal kitchens tailored to your lifestyle.
          </p>

          <div className="max-w-2xl">
            <input
              type="text"
              placeholder="Search foods, kitchens, cuisines..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full px-6 py-4 rounded-2xl bg-white text-black outline-none text-lg"
            />
          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* CATEGORIES */}

        <section className="mb-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Categories
            </h2>

          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide">

            {categories.map((category) => (

              <button
                key={category}
                className="bg-[#181818] border border-white/5 hover:border-orange-500 px-6 py-4 rounded-2xl whitespace-nowrap transition"
              >
                {category}
              </button>

            ))}

          </div>

        </section>

        {/* POPULAR */}

        <section className="mb-14">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Popular Near You
            </h2>

            <button className="text-orange-400">
              View All
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {foods.map((food) => (

              <div
                key={food._id}
                className="bg-[#181818] rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition"
              >

                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold mb-2">
                    {food.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {food.calories} kcal
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="text-orange-400 font-bold text-xl">
                      ₹{food.price}
                    </span>

                    <button
                      className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl"
                    >
                      Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* SUBSCRIPTION PLANS */}

        <section className="mb-14">

          <h2 className="text-3xl font-bold mb-6">
            Subscription Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                Weight Loss
              </h3>

              <p className="mb-5 text-orange-100">
                Calorie controlled meal plans.
              </p>

              <button className="bg-white text-orange-600 px-5 py-2 rounded-xl font-semibold">
                Explore
              </button>

            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                High Protein
              </h3>

              <p className="mb-5 text-green-100">
                Muscle gain and fitness focused meals.
              </p>

              <button className="bg-white text-green-600 px-5 py-2 rounded-xl font-semibold">
                Explore
              </button>

            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                Keto
              </h3>

              <p className="mb-5 text-purple-100">
                Low carb nutrition plans.
              </p>

              <button className="bg-white text-purple-600 px-5 py-2 rounded-xl font-semibold">
                Explore
              </button>

            </div>

          </div>

        </section>

        {/* BRANCHES */}

        <section>

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Nearby Kitchens
            </h2>

            <button className="text-orange-400">
              View All
            </button>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {branches.map((branch) => (

              <div
                key={branch._id}
                className="bg-[#181818] border border-white/5 rounded-3xl p-6 hover:border-orange-500/30 transition"
              >

                <h3 className="text-2xl font-bold mb-3">
                  {branch.name}
                </h3>

                <p className="text-gray-400 mb-5">
                  Fast Food • Delivery Available
                </p>

                <div className="flex justify-between text-sm text-gray-300 mb-6">

                  <span>
                    ⭐ {branch.rating}
                  </span>

                  <span>
                    📍 {branch.distance}
                  </span>

                  <span>
                    🕒 {branch.eta}
                  </span>

                </div>

                <button
                  onClick={() =>
                    navigate(`/branch/${branch._id}`)
                  }
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold"
                >
                  View Branch
                </button>

              </div>

            ))}

          </div>

        </section>

      </div>

    </div>
  );
};

export default Home;