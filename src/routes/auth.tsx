import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Brain, Eye, EyeOff, Loader2, Mail, ArrowLeft } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";

type Mode = "login" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    mode: (s["mode"] === "signup" ? "signup" : "login") as "login" | "signup",
  }),
  head: () => ({
    meta: [
      { title: "Log in or sign up — AI Hub" },
      { name: "description", content: "Log in or create your free AI Hub account to save tools and track your learning." },
      { property: "og:title", content: "Log in or sign up — AI Hub" },
      { property: "og:description", content: "Create your free AI Hub account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const usernameSchema = z.string().trim().toLowerCase().regex(/^[a-z0-9_.]{3,30}$/, "Username must be 3–30 letters, numbers, _ or .");
const toEmail = (u: string) => `${u}@users.aihub.app`;
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>(search.mode);
  const [step, setStep] = useState<"email" | "password">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<null | "confirm" | "reset">(null);

  useEffect(() => setMode(search.mode), [search.mode]);
  useEffect(() => {
    if (user) navigate({ to: "/", replace: true });
  }, [user, navigate]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep("email");
    setError(null);
    setPassword("");
  };

  const onGoogle = async () => {
    setError(null);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) setError(res.error.message ?? "Google sign-in failed");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const un = usernameSchema.safeParse(email);
    if (!un.success) return setError(un.error.issues[0]?.message ?? "Enter a valid username");
    const em = { data: toEmail(un.data) };

    if (mode === "forgot") {
      setBusy(true);
      const { error } = await supabase.auth.resetPasswordForEmail(em.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (error) return setError(error.message);
      return setSent("reset");
    }

    if (step === "email") return setStep("password");

    const pw = passwordSchema.safeParse(password);
    if (mode === "signup" && !pw.success) return setError(pw.error.issues[0]?.message ?? "Use at least 8 characters");

    setBusy(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: em.data, password });
      setBusy(false);
      if (error) setError(error.message === "Invalid login credentials" ? "Wrong username or password." : error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: em.data,
        password,
        options: { data: { username: un.data, full_name: name.trim() || un.data } },
      });
      setBusy(false);
      if (error) return setError(/already/i.test(error.message) ? "That username is taken." : error.message);
      if (!data.session) setError("Could not sign you in. Please try logging in.");
    }
  };

  const title =
    mode === "forgot" ? "Reset your password" : mode === "signup" ? "Create an account" : "Welcome back";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-accent-gradient text-primary-foreground">
            <Brain className="size-6" />
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">{sent ? "Check your email" : title}</h1>
        </div>

        {sent ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-muted">
              <Mail className="size-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {sent === "confirm" ? "We sent a verification link to " : "We sent a password reset link to "}
              <span className="font-medium text-foreground">{email}</span>.{" "}
              {sent === "confirm" ? "Click it to finish creating your account." : "Follow it to choose a new password."}
            </p>
            <button
              onClick={() => { setSent(null); switchMode("login"); }}
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to log in
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} className="space-y-3">
              {step === "email" ? (
                <>
                  {mode === "signup" && (
                    <Field label="Your name" value={name} onChange={setName} autoComplete="name" />
                  )}
                  <Field label="Username" value={email} onChange={setEmail} autoComplete="username" autoFocus />
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm"
                  >
                    <span className="truncate">{email}</span>
                    <span className="ml-2 shrink-0 font-medium text-primary">Edit</span>
                  </button>
                  <div className="relative">
                    <Field
                      label="Password"
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={setPassword}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      aria-label={show ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {mode === "signup" && (
                    <p className="px-1 text-xs text-muted-foreground">Use at least 8 characters.</p>
                  )}
                </>
              )}

              {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : mode === "forgot" ? "Send reset link" : step === "email" ? "Continue" : mode === "signup" ? "Create account" : "Log in"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {mode === "forgot" ? (
                <button onClick={() => switchMode("login")} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                  <ArrowLeft className="size-3.5" /> Back to log in
                </button>
              ) : mode === "login" ? (
                <>Don't have an account? <button onClick={() => switchMode("signup")} className="font-medium text-primary hover:underline">Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => switchMode("login")} className="font-medium text-primary hover:underline">Log in</button></>
              )}
            </p>

            {mode !== "forgot" && (
              <>
                <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                </div>
                <button
                  onClick={onGoogle}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-muted"
                >
                  <GoogleIcon /> Continue with Google
                </button>
              </>
            )}

            <p className="mt-8 text-center text-xs text-muted-foreground">
              <Link to="/about" className="hover:underline">Terms of use</Link> · <Link to="/about" className="hover:underline">Privacy policy</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Field(props: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; autoComplete?: string; autoFocus?: boolean;
}) {
  return (
    <label className="relative block">
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        placeholder=" "
        className="peer h-14 w-full rounded-xl border border-border bg-background px-4 pt-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
        {props.label}
      </span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
