import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import VerifyOtp from "./pages/auth/VerifyOtp";
import SignupBranch from "./pages/auth/SignupBranch";
import SignupDelivery from "./pages/auth/SignupDelivery";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/profile/Profile";
import CreateBrand from "./pages/brand/CreateBrand";
import Brands from "./pages/brand/Brands";
import CreateBranch from "./pages/branch/CreateBranch";
import Branches from "./pages/branch/Branches";
import JoinBrand from "./pages/brand/JoinBrand";

// 🔐 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/signup-branch" element={<SignupBranch />} />
        <Route path="/signup-delivery" element={<SignupDelivery />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
         <Route path="/create-brand" element={<ProtectedRoute><CreateBrand /></ProtectedRoute>}/>
         <Route path="/brands" element={<ProtectedRoute><Brands /></ProtectedRoute>}/>
         <Route path="/add-branch" element={<ProtectedRoute><CreateBranch /></ProtectedRoute>}/>
         <Route path="/branches" element={<ProtectedRoute><Branches /></ProtectedRoute>}/>
         <Route path="/join-brand" element={<ProtectedRoute><JoinBrand /></ProtectedRoute>}/>




      </Routes>
    </BrowserRouter>
  );
};

export default App;
