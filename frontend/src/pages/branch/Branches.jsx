import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyBranches,
  toggleBranchStatus,
  deleteBranch,
} from "../../api/branchApi";

const Branches = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Branches
  const fetchBranches = async () => {
    try {
      const res = await getMyBranches();
      setBranches(res.branches);
    } catch (error) {
      setError("Failed to load branches");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  // Toggle Status
  const handleToggleStatus = async (id) => {
    try {
      await toggleBranchStatus(id);
      setBranches((prev) =>
        prev.map((branch) =>
          branch._id === id
            ? {
                ...branch,
                isOpen: !branch.isOpen,
              }
            : branch,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Branch
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this branch?");
    if (!confirmDelete) return;
    try {
      await deleteBranch(id);
      setBranches((prev) => prev.filter((branch) => branch._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800">
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-white/10 blur-3xl"></div>

        <div className="relative px-6 py-24 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-orange-100 border rounded-full bg-white/10 border-white/10 backdrop-blur-md">
                📍 Branch Operations Dashboard
              </div>

              <h1 className="mb-5 text-5xl font-black leading-tight md:text-6xl">
                Manage Your
                <span className="block text-orange-200">Branches</span>
              </h1>

              <p className="max-w-2xl text-lg text-orange-100/90">
                Control delivery zones, kitchen availability, and operational
                performance across your cloud kitchens.
              </p>
            </div>

            {/* Create Button */}
            <button
              onClick={() => navigate("/add-branch")}
              className="py-4 text-lg font-bold text-orange-600 transition bg-white shadow-lg hover:bg-orange-100 px-7 rounded-2xl"
            >
              + Create Branch
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        {/* Error */}
        {error && (
          <div className="px-5 py-4 mb-8 text-red-400 border bg-red-500/10 border-red-500/30 rounded-2xl">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="border-4 border-orange-500 rounded-full w-14 h-14 border-t-transparent animate-spin"></div>
          </div>
        ) : branches.length === 0 ? (
          <div className="bg-[#181818] border border-white/5 rounded-3xl py-28 text-center">
            <h2 className="mb-4 text-3xl font-bold">No Branches Yet</h2>

            <p className="mb-8 text-gray-400">
              Create your first branch to start fulfilling orders.
            </p>

            <button
              onClick={() => navigate("/branch/create")}
              className="px-6 py-3 font-semibold transition bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              Create Branch
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
              <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">
                <p className="mb-2 text-sm text-gray-400">Total Branches</p>

                <h2 className="text-4xl font-black">{branches.length}</h2>
              </div>

              <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">
                <p className="mb-2 text-sm text-gray-400">Active Kitchens</p>

                <h2 className="text-4xl font-black text-green-400">
                  {branches.filter((b) => b.isOpen).length}
                </h2>
              </div>

              <div className="bg-[#181818] border border-white/5 rounded-3xl p-6">
                <p className="mb-2 text-sm text-gray-400">
                  Avg Delivery Radius
                </p>

                <h2 className="text-4xl font-black text-orange-400">
                  {Math.round(
                    branches.reduce(
                      (acc, branch) => acc + branch.deliveryRadius,
                      0,
                    ) / branches.length,
                  )}
                  km
                </h2>
              </div>
            </div>

            {/* Branch Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {branches.map((branch) => (
                <div
                  key={branch._id}
                  className="bg-[#181818] border border-white/5 hover:border-orange-500/30 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
                >
                  {/* Header */}
                  <div className="border-b p-7 border-white/5">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex gap-5">
                        {/* Brand Logo */}
                        {branch.brand?.logo ? (
                          <img
                            src={branch.brand.logo}
                            alt={branch.brand.name}
                            className="object-cover w-20 h-20 rounded-2xl"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-20 h-20 text-3xl font-black rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700">
                            {branch.brand?.name?.charAt(0)}
                          </div>
                        )}

                        {/* Info */}
                        <div>
                          <h2 className="mb-1 text-2xl font-bold">
                            {branch.name}
                          </h2>

                          <p className="mb-3 text-sm text-orange-400">
                            {branch.brand?.name}
                          </p>

                                                    {/* Status */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">

                            <div
                              className={`w-2.5 h-2.5 rounded-full ${
                                branch.isOpen
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }`}
                            ></div>

                            <span
                              className={`text-sm font-medium ${
                                branch.isOpen
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {branch.isOpen
                                ? "Kitchen Open"
                                : "Kitchen Closed"}
                            </span>

                          </div>



                        </div>
                      </div>

                      {/* Rating */}
                      <div className="px-3 py-1 text-sm font-medium text-orange-400 rounded-full bg-orange-500/10">
                        ⭐ {branch.rating?.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7">
                    {/* Address */}
                    <div className="mb-6">
                      <p className="mb-2 text-sm text-gray-400">Address</p>

                      <p className="text-gray-200">{branch.address}</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-5 mb-8">
                      <div className="bg-[#202020] rounded-2xl p-4">
                        <p className="mb-1 text-sm text-gray-400">
                          Delivery Radius
                        </p>

                        <h3 className="text-2xl font-bold">
                          {branch.deliveryRadius} km
                        </h3>
                      </div>

                      <div className="bg-[#202020] rounded-2xl p-4">
                        <p className="mb-1 text-sm text-gray-400">
                          Avg Prep Time
                        </p>

                        <h3 className="text-2xl font-bold">
                          {branch.averagePrepTime} min
                        </h3>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate(`/branch/${branch._id}`)}
                        className="flex-1 py-3 font-semibold transition bg-orange-500 hover:bg-orange-600 rounded-xl"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleToggleStatus(branch._id)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition ${
                          branch.isOpen
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {branch.isOpen ? "Close Branch" : "Open Branch"}
                      </button>

                      <button
                        onClick={() => handleDelete(branch._id)}
                        className="px-5 bg-[#252525] hover:bg-red-500 transition rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Branches;
