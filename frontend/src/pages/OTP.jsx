import AuthCard from "../components/AuthCard";

export default function OTP() {
    return (
        <AuthCard title="OTP Verification">
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full p-3 text-center tracking-widest rounded bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold">
                    Verify OTP
                </button>
            </form>
        </AuthCard>
    );
}
