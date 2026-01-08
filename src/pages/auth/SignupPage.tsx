import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ArrowRight, Moon, Sun, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { authApi } from "../../services/api";

export default function SignupPage() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-clear error after 6 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate inputs
      if (
        !formData.email ||
        !formData.username ||
        !formData.password ||
        !formData.fullName
      ) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      // Call signup API
      console.log("Attempting signup with:", formData);
      const response = await authApi.register(formData);
      console.log("Signup response:", response);

      if (response.success) {
        console.log("Signup successful, storing token and redirecting");
        setSuccess(true);
        // Store token and user data
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        const errorMsg = response.message || "Signup failed";
        console.error("Signup failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
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

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            Account Created!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Theme Toggle - Top Right - COMMENTED OUT */}
      {/* <div className="fixed top-6 right-6 z-50">
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
      </div> */

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

      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-3">
              Get Started
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your Gilgal account and start deploying in seconds
            </p>
          </div>

          {/* GitHub OAuth Button */}
          <a
            href="https://api.gilgal.tech/api/auth/github/login"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors mb-6"
          >
            <Github size={18} />
            Sign up with GitHub
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              Or register with email
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Signup Form */}
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
                      Signup Error
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                required
              />
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-gray-300 dark:border-gray-700"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                I agree to the{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white hover:opacity-70 transition-opacity"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white hover:opacity-70 transition-opacity"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-black dark:text-white font-semibold hover:opacity-70 transition-opacity"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
