import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../services/api";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/signup", { email, password });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard title="Create Account">
            <form onSubmit={handleSignup} className="space-y-4">
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
                    {loading ? "Creating..." : "Sign Up"}
                </button>
            </form>
        </AuthCard>
    );
}
