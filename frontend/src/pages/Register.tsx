import { createClient } from "@supabase/supabase-js";
import { HeaderLanding } from "@/components/HeaderLanding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// 🔑 Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY);

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

   // 📝 Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // Manual Email + Password Signup
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name, // stored in user_metadata
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      // If "Email confirmations" are enabled in Supabase → user must confirm via email
      toast.success("Check your email to confirm your account!");
      // If disabled → user is signed in instantly
      if (data.user) {
        navigate("/dashboard");
      }
    }
    setIsLoading(false);
  };

  // 🔑 Google Signup/Login
  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // after login
      },
    });

    if (error) {
      toast.error(error.message);
      setIsGoogleLoading(false);
    } else {
      toast.success("Redirecting to Google...");
      // no need to reset loader, Supabase will redirect
    }
  };

  //Check session after redirect
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/dashboard"); // already logged in
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="bg-white h-screen">
      <HeaderLanding showLogin={true} showNavItems={false} showRegister={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-50">
        <Card className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 font-Grotesk">
          <CardHeader className="font-montserrat">
            <CardTitle className="text-black mb-6 text-center">
              Create account
            </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSignup}>
              <div className="flex flex-col gap-6 font-montserrat">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-black">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 rounded-lg focus:outline-none text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 rounded-lg focus:outline-none text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-black">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 rounded-lg focus:outline-none text-black"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              className="w-full bg-gray-50 hover:bg-gray-100 hover:text-black text-black border-gray-200 rounded-full"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
              type="button"
            >
              {isGoogleLoading ? (
                "Signing up..."
              ) : (
                <>
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google Logo"
                    className="mr-2 h-4 w-4"
                  />
                  Sign Up with Google
                </>
              )}
            </Button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
