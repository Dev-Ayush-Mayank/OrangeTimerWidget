import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { SpinnerCustom } from "@/components/Spinner";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <SpinnerCustom />;

  // If no session, redirect to home page
  if (!session) return <Navigate to="/" replace />;

  return children;
};
