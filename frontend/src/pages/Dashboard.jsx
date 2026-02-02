import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);


    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            await api.post("/auth/logout", { refreshToken });
        } catch (err) {
            // ignore errors
        } finally {
            sessionStorage.clear();
            localStorage.clear();
            navigate("/");
        }
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-400 mb-6">
                    You are successfully authenticated using MFA.
                </p>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
