import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { FaGoogle } from "react-icons/fa";

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  const signIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-96 transform transition-all duration-500 hover:scale-95">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back! 👋</h1>
        <p className="text-gray-500 mb-6 text-sm">Sign in to continue your journey.</p>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-xl shadow-lg transition duration-300 hover:bg-gray-100 hover:shadow-xl"
          >
            <FaGoogle className="text-lg text-red-500" />
            <span className="font-medium">Sign in with Google</span>
          </button>
        )}

        <p className="text-xs text-gray-400 mt-4">
          By signing in, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
