import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ArrowRight, Moon, Sun, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { authApi } from "../../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-clear error after 6 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      // Call login API
      console.log("Attempting login with email:", email);
      const response = await authApi.login({ email, password });
      console.log("Login response:", response);

      if (response.success) {
        console.log("Login successful, storing token and redirecting");
        // Store token and user data
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        const errorMsg = response.message || "Login failed";
        console.error("Login failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An error occurred. Please try again.";
      console.error("Displaying error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={20} className="text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon size={20} className="text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center font-bold text-white dark:text-black text-sm">
            G
          </div>
          <span className="font-bold text-black dark:text-white text-lg hidden sm:inline-block">
            GILGAL
          </span>
        </a>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your Gilgal account to deploy your apps
            </p>
          </div>

          {/* GitHub OAuth Button */}
          <a
            href="https://api.gilgal.tech/api/auth/github/login"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors mb-6"
          >
            <Github size={18} />
            Sign in with GitHub
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              Or continue with email
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700 animate-pulse">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={20}
                    className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-1">
                      Login Error
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:opacity-70 transition-opacity"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            Don't have an account?{" "}
            <a
              href="/auth/signup"
              className="text-black dark:text-white font-semibold hover:opacity-70 transition-opacity"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
