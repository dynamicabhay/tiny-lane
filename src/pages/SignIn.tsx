import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Seo } from "@/components/Seo";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/auth/AuthProvider";

type FieldErrors = {
  email?: string;
  password?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Map Firebase errors (REST + Web SDK) to UI-friendly, field-aware messages
function mapFirebaseSignInError(err: any):
  | { field: "email" | "password"; message: string }
  | { message: string } {
  const raw =
    err?.response?.data?.error?.message // REST error (Axios-like)
    ?? err?.code                         // Firebase Web SDK error code
    ?? err?.message
    ?? "UNKNOWN";

  const code = String(raw).toUpperCase();

  switch (code) {
    // Newer REST consolidated error
    case "INVALID_LOGIN_CREDENTIALS":
    // Common SDK equivalents
    case "AUTH/INVALID-CREDENTIAL":
    case "AUTH/INVALID-LOGIN-CREDENTIALS":
      return { message: "Invalid email or password." }; // show as global OR under both fields (we show global)

    // Email problems
    case "EMAIL_NOT_FOUND":
    case "AUTH/USER-NOT-FOUND":
    case "INVALID_EMAIL":
    case "AUTH/INVALID-EMAIL":
      return { field: "email", message: "Please check your email address." };

    // Password problems
    case "INVALID_PASSWORD":
    case "AUTH/WRONG-PASSWORD":
      return { field: "password", message: "Incorrect password. Try again." };

    // Account / rate limit
    case "USER_DISABLED":
    case "AUTH/USER-DISABLED":
      return { message: "This account has been disabled. Contact support." };
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
    case "AUTH/TOO-MANY-REQUESTS":
      return { message: "Too many attempts. Please try again later." };

    // Google popup flow common errors
    case "AUTH/POPUP-CLOSED-BY-USER":
      return { message: "Sign-in popup was closed before completing." };
    case "AUTH/CANCELLED-POPUP-REQUEST":
      return { message: "Another sign-in attempt is in progress." };

    default:
      return { message: "Something went wrong. Please try again." };
  }
}

const SignIn = () => {
  const { signInEmail, signInGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Simple client-side validation
  const validateClient = () => {
    const errs: FieldErrors = {};
    if (!email) errs.email = "Email is required.";
    else if (!emailRegex.test(email)) errs.email = "Please enter a valid email address.";

    if (!password) errs.password = "Password is required.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Clear errors as user types (nice UX)
  const onEmailChange = (v: string) => {
    setEmail(v);
    if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined }));
    if (globalError) setGlobalError(null);
  };
  const onPasswordChange = (v: string) => {
    setPassword(v);
    if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
    if (globalError) setGlobalError(null);
  };

  // Google login
  const handleGoogleSignIn = async () => {
    setGlobalError(null);
    setFieldErrors({});
    try {
      setLoading(true);
      await signInGoogle();
      navigate("/home");
    } catch (err: any) {
      const mapped = mapFirebaseSignInError(err);
      if ("field" in mapped) {
        setFieldErrors((prev) => ({ ...prev, [mapped.field]: mapped.message }));
      } else {
        setGlobalError(mapped.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Email login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validateClient()) return;

    try {
      setLoading(true);
      await signInEmail(email, password);
      navigate("/home");
    } catch (err: any) {
      const mapped = mapFirebaseSignInError(err);
      if ("field" in mapped) {
        setFieldErrors((prev) => ({ ...prev, [mapped.field]: mapped.message }));
      } else {
        // For INVALID_LOGIN_CREDENTIALS we show a single global error (clean)
        setGlobalError(mapped.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Seo
        title="Sign In to ChopURL - Access Your Dashboard"
        description="Log in to your ChopURL account to manage your shortened links and view analytics."
        canonical={window.location.origin + "/signin"}
      />

      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto w-full">
          {/* Brand */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ChopURL
            </h1>
          </div>

          {/* Login Card */}
          <Card className="card-glow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Log in to ChopURL</CardTitle>
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Global error banner */}
              {globalError && (
                <div
                  className="rounded-xl border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  {globalError}
                </div>
              )}

              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-12 glow-effect"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                    Continuing…
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">OR</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-4" noValidate>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    className={`glow-effect ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    required
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  />
                  {fieldErrors.email ? (
                    <div id="email-error" className="text-xs text-destructive">
                      {fieldErrors.email}{" "}
                      {fieldErrors.email.includes("email address") && (
                        <>
                          {/* helpful extras only when email looks wrong */}
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">We’ll never share your email.</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => onPasswordChange(e.target.value)}
                      className={`glow-effect pr-10 ${fieldErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                      aria-invalid={!!fieldErrors.password}
                      aria-describedby={fieldErrors.password ? "password-error" : undefined}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {fieldErrors.password ? (
                    <div id="password-error" className="text-xs text-destructive">
                      {fieldErrors.password}{" "}
                      {fieldErrors.password.includes("Incorrect") && (
                        <>
                          <Link to="/forgot-password" className="underline">
                            Forgot password?
                          </Link>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-effect"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Signing in…
                    </span>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-4xl font-bold text-white">URL</div>
          </div>
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-muted-foreground text-lg">
            Access your dashboard to manage your shortened links and view detailed analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;