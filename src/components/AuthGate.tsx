import { Link, useLocation } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { lovable } from "@/integrations/lovable/index";

export function AuthGate() {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const exempt = pathname.startsWith("/auth") || pathname.startsWith("/reset-password");

  useEffect(() => {
    if (loading || user || exempt) return setShow(false);
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, [loading, user, exempt]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 px-4 backdrop-blur-md">
      <div role="dialog" aria-modal="true" className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
        <span className="mx-auto mb-5 grid size-12 place-items-center rounded-2xl bg-accent-gradient text-primary-foreground">
          <Brain className="size-6" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">Welcome to AI Hub</h2>
        <p className="mt-2 text-sm text-muted-foreground">Log in or create a free account to continue learning AI.</p>
        <div className="mt-6 space-y-3">
          <Link to="/auth" search={{ mode: "login" }} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90">
            Log in
          </Link>
          <Link to="/auth" search={{ mode: "signup" }} className="flex h-12 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold hover:bg-muted">
            Sign up
          </Link>
          <button
            onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })}
            className="text-sm font-medium text-primary hover:underline"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
