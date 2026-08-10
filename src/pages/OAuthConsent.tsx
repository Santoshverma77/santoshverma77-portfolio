import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type AuthorizationDetails = {
  client?: { name?: string };
  redirect_url?: string;
  redirect_to?: string;
};

/** Minimal typed view of the beta `supabase.auth.oauth` namespace. */
type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");

      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = `/auth?next=${encodeURIComponent(next)}`;
        return;
      }

      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);

      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? "this app";

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-6 py-20">
      {error ? (
        <>
          <h1 className="font-naruto text-2xl">Authorization failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </>
      ) : !details ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <>
          <h1 className="font-naruto text-2xl">Connect {clientName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {clientName} is requesting access to this portfolio's assistant tools as you.
          </p>
          <div className="mt-8 flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => decide(true)}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
            >
              Approve
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => decide(false)}
              className="flex-1 rounded-lg border border-border/60 px-4 py-2 text-sm disabled:opacity-50"
            >
              Deny
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default OAuthConsent;
