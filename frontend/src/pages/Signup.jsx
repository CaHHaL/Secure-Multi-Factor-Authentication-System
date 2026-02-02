import AuthCard from "../components/AuthCard";

export default function Signup() {
    return (
        <AuthCard title="Create Account">
            <form className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold">
                    Sign Up
                </button>
            </form>
        </AuthCard>
    );
}
