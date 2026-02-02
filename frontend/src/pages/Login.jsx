import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/login", { email, password });
            navigate("/otp", { state: { email } });
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard title="Login">
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Login"}
                </button>
            </form>
        </AuthCard>
    );
}
