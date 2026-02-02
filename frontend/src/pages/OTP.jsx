import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../services/api";

export default function OTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/verify-otp", {
                email,
                otp,
            });

            const { accessToken, refreshToken } = res.data;

            // Store tokens
            localStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("accessToken", accessToken);

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <AuthCard title="Error">
                <p className="text-red-400 text-center">
                    Invalid access. Please login again.
                </p>
            </AuthCard>
        );
    }

    return (
        <AuthCard title="OTP Verification">
            <form onSubmit={handleVerifyOTP} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full p-3 text-center tracking-widest rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </form>
        </AuthCard>
    );
}
