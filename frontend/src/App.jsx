import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import SignupBranch from "./pages/SignupBranch";
import SignupDelivery from "./pages/SignupDelivery";

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
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/signup-branch" element={<SignupBranch />} />
      <Route path="/signup-delivery" element={<SignupDelivery />} />


      {/* Protected Routes */}
      <Route
        path="/protected"
        element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App