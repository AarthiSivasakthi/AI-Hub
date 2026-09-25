import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — AI Hub" },
      { name: "description", content: "Choose a new password for your AI Hub account." },
      { property: "og:title", content: "Set a new password — AI Hub" },
      { property: "og:description", content: "Choose a new password for your AI Hub account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) return setError("Password must be at least 8 characters");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setError(error.message);
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <h1 className="text-center text-3xl font-semibold tracking-tight">Set a new password</h1>
        <input
          type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password"
          autoComplete="new-password"
          className="h-14 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? <Loader2 className="size-4 animate-spin" /> : "Save password"}
        </button>
      </form>
    </div>
  );
}
