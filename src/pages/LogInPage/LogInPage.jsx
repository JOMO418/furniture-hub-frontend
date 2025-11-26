import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services';
import Button from '../../components/common/Button/Button';
import { Eye, EyeOff, ArrowLeft, Home, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      });

      if (response.success) {
        setSuccess('Login successful! Redirecting...');
        
        // Short delay to show success message
        setTimeout(() => {
          navigate(from, { replace: true });
          window.location.reload(); // Refresh to update navbar
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-pure-white to-light-sand flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-warm-gray hover:text-deep-navy transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Card Container */}
        <div className="bg-pure-white rounded-2xl shadow-elevated border border-border-color overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-deep-navy to-charcoal px-6 py-8 sm:px-8 sm:py-10 text-center">
            <div className="w-16 h-16 bg-brushed-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="text-brushed-gold" size={32} />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-pure-white mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-pure-white/80">
              Sign in to continue shopping
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-8 sm:px-8">
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-sage/10 border border-sage/30 rounded-lg flex items-start gap-3 animate-fade-in">
                <CheckCircle className="text-sage flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-sage">{success}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 sm:py-4 border-2 border-border-color rounded-lg focus:outline-none focus:border-deep-navy transition-colors text-base bg-pure-white"
                    disabled={loading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 sm:py-4 border-2 border-border-color rounded-lg focus:outline-none focus:border-deep-navy transition-colors text-base bg-pure-white"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-deep-navy hover:text-charcoal transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-color"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-pure-white text-warm-gray">New to Furniture Hub?</span>
                </div>
              </div>

              {/* Register Link */}
              <Link to="/register">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Create an Account
                </Button>
              </Link>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 sm:px-8 bg-light-sand/30 border-t border-border-color">
            <p className="text-xs text-center text-warm-gray">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-deep-navy hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-deep-navy hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-warm-gray">
            Need help?{' '}
            <Link to="/contact" className="text-deep-navy hover:text-charcoal font-medium transition-colors">
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;