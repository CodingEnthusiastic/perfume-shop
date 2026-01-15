import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { register, isLoading, error: authError } = useAuthStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          e.currentTarget.currentTime = 2; // Start from 0:02
        }}
      >
        <source src="/login_register_video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/80">Join our fragrance community</p>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{authError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                First Name
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="John"
                className="bg-white/10 dark:bg-slate-800/50 border-white/20 dark:border-white/10 text-white placeholder:text-white/50"
              />
              {errors.firstName && (
                <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Last Name
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Doe"
                className="bg-white/10 dark:bg-slate-800/50 border-white/20 dark:border-white/10 text-white placeholder:text-white/50"
              />
              {errors.lastName && (
                <p className="text-red-300 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="bg-white/10 dark:bg-slate-800/50 border-white/20 dark:border-white/10 text-white placeholder:text-white/50"
              />
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="bg-white/10 dark:bg-slate-800/50 border-white/20 dark:border-white/10 text-white placeholder:text-white/50"
              />
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="bg-white/10 dark:bg-slate-800/50 border-white/20 dark:border-white/10 text-white placeholder:text-white/50"
              />
              {errors.confirmPassword && (
                <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 text-white/70">OR</span>
              </div>
            </div>

            {/* Google Sign-Up */}
            <Button
              type="button"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/auth/google`}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Sign Up with Google
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-white/80 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
