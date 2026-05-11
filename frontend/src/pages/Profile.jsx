import { useEffect, useState } from "react";
import { getMyProfile, updateProfile, deleteProfile } from "../api/userApi";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res.data.user);
        setForm({
          name: res.data.user.name || "",
          phone: res.data.user.phone || "",
        });
      } catch {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

//   Update profile
    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try{
            const res = await updateProfile(form);
            setUser(res.data.user);
            setSuccess("Profile updated successfully");
        }
        catch(error){
            setError(error.response?.data?.message || "Error updating profile");
        }
        finally{
            setSaving(false);
        }
    };

    // Delete profile
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if(!confirmDelete) return;
        try{
            await deleteProfile();
            localStorage.removeItem("token");
            alert("Account deleted successfully");
            navigate("/login");
        }
        catch(error){
            setError(error.response?.data?.message || "Error deleting account");
        }
    }
    // Logout
    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/login");
    };

      if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading...
      </div>
    );
}


  return (<div className="min-h-screen bg-[#121212] text-white">

  {/* Top Section */}
  <div className="w-full h-[260px] bg-gradient-to-r from-orange-500 to-orange-700 relative">

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Profile Info */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">

      {/* Avatar */}
      <div className="flex items-center justify-center text-4xl font-bold border-4 border-white rounded-full w-28 h-28 bg-white/10 backdrop-blur-md">
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {user?.name}
      </h2>

      <p className="text-orange-100 capitalize">
        {user?.role}
      </p>
    </div>
  </div>

  {/* Content */}
  <div className="max-w-5xl px-6 py-10 mx-auto">

    {/* Alerts */}
    {error && (
      <div className="px-4 py-3 mb-6 text-red-400 border border-red-500 bg-red-500/10 rounded-xl">
        {error}
      </div>
    )}

    {success && (
      <div className="px-4 py-3 mb-6 text-green-400 border border-green-500 bg-green-500/10 rounded-xl">
        {success}
      </div>
    )}

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* Left Card */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 shadow-xl h-fit">

        <h3 className="mb-6 text-xl font-semibold">
          Account Info
        </h3>

        <div className="space-y-5">

          <div>
            <p className="mb-1 text-sm text-gray-400">
              Email Address
            </p>

            <div className="cursor-not-allowed input opacity-60">
              {user?.email}
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-400">
              Role
            </p>

            <div className="capitalize cursor-not-allowed input opacity-60">
              {user?.role}
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-400">
              Verified
            </p>

            <div className="cursor-not-allowed input opacity-60">
              {user?.isVerified ? "Verified ✅" : "Not Verified"}
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-400">
              Joined
            </p>

            <div className="cursor-not-allowed input opacity-60">
              {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>

        </div>
      </div>

      {/* Right Section */}
      <div className="lg:col-span-2 bg-[#1e1e1e] rounded-2xl p-8 shadow-xl">

        <h3 className="mb-8 text-2xl font-semibold">
          Edit Profile
        </h3>

        <form onSubmit={handleUpdate}>

          {/* Name */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Phone */}
          <div className="mb-8">
            <label className="block mb-2 text-sm text-gray-400">
              Phone Number
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">

            <button
              disabled={saving}
              className="flex-1 py-3 font-semibold transition bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              {saving ? "Saving..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 py-3 font-semibold transition bg-gray-700 hover:bg-gray-600 rounded-xl"
            >
              Logout
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-3 font-semibold transition bg-red-500 hover:bg-red-600 rounded-xl"
            >
              Delete Account
            </button>

          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};


export default Profile;
