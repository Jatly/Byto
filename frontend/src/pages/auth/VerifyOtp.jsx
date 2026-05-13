import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/authApi";

const VerifyOtp = () => {
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
    const [resending,setResending] = useState(false);
    const [error,setError] = useState("");
    const [timer,setTimer] = useState(60);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    // Timer
    useEffect(()=>{
        if (timer >= 0){
            const interval = setInterval(()=>{
                setTimer((prev)=> prev - 1);
            },1000);
            return () => clearInterval(interval);
        }
    },[timer]);

    // verify OTP
    const handleVerify = async()=>{
        if(!otp){
            setError("Please enter the OTP");
            return;
        }
        setLoading(true);
        setError("");
        try{
            const res = await verifyOtp({ email, otp });
            localStorage.setItem("token", res.token);
            alert("Account verified successfully!");
            navigate("/login", { replace: true });
        }
        catch(err){
            setError(err.response?.data?.message || "Verification failed");
        }
        finally{
            setLoading(false);
        }
    }

    // Resend OTP
    const handleResend = async()=>{
        setResending(true);
        setError("");

        try{
            await resendOtp({ email });
            setTimer(60);
            alert("OTP resent successfully!");
        }
        catch(err){
            setError(err.response?.data?.message || "Failed to resend OTP");
        }
        finally{
            setResending(false);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[350px] text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Verify OTP
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          Enter the OTP sent to <br />
          <span className="text-orange-400">{email}</span>
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400">{error}</p>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full mb-4 p-3 text-center tracking-widest text-lg rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 mb-4 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend Section */}
        {timer > 0 ? (
          <p className="text-sm text-gray-400">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-sm text-orange-400 hover:underline"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  )
}

export default VerifyOtp
