import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/** Only same-origin relative paths may be used as a post-login redirect. */
const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/";

const AuthPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = safeNext(params.get("next"));

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (error) return setError(error.message);
      return setNotice("Check your email to confirm your account, then sign in.");
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message);
    window.location.href = next;
  };

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-6 py-20">
      <h1 className="font-naruto text-3xl">
        {mode === "signin" ? "Sign in" : "Create an account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to authorize an AI assistant to access this portfolio's tools.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary/60"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          className="w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary/60"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        {notice && <p className="text-xs text-muted-foreground">{notice}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setNotice(null);
        }}
        className="mt-4 text-xs text-muted-foreground underline underline-offset-4"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-2 text-xs text-muted-foreground/70"
      >
        Back to portfolio
      </button>
    </main>
  );
};

export default AuthPage;
