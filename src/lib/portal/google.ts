import { getSiteUrl } from "@/lib/seo/site";

/**
 * "Nastavi sa Google-om" for the client portal — plain OAuth 2.0 code flow,
 * no auth library.
 *
 * Google only proves the mailbox, exactly like a magic link does, so a Google
 * login lands on the same portal_users row as the link for that address. Only
 * a verified Google email is accepted; otherwise anyone could claim someone
 * else's upiti by adding their address to a Google account.
 *
 * Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET hides the button; the magic
 * link keeps working.
 */

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

export const GOOGLE_STATE_COOKIE = "portal_google_state";
export const GOOGLE_STATE_MAX_AGE_SECONDS = 10 * 60;

type GoogleConfig = { clientId: string; clientSecret: string };

function config(): GoogleConfig | null {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

export function isGoogleLoginConfigured(): boolean {
  return config() !== null;
}

/** Fixed to the canonical site so it matches the one URI registered in Google
 *  Cloud — the .de domain and preview deploys would otherwise each need theirs. */
export function googleRedirectUri(): string {
  return `${getSiteUrl()}/api/portal/google/callback`;
}

export function buildGoogleAuthUrl(state: string, clientId: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export function googleAuthUrl(state: string): string | null {
  const cfg = config();
  return cfg ? buildGoogleAuthUrl(state, cfg.clientId, googleRedirectUri()) : null;
}

/** The state cookie carries the CSRF nonce and where to land, as `nonce|next`. */
export function encodeGoogleState(nonce: string, next: string): string {
  return `${nonce}|${next}`;
}

export function readGoogleState(
  cookieValue: string | undefined,
  returnedState: string | null,
): { next: string } | null {
  if (!cookieValue || !returnedState) return null;
  const [nonce, next] = cookieValue.split("|");
  if (!nonce || nonce.length < 16 || nonce !== returnedState) return null;
  return { next: next || "/nalog" };
}

export type GoogleProfile = { email: string; name: string | null };

/** Trades the code for the user's verified email. Null on any failure. */
export async function fetchGoogleProfile(code: string): Promise<GoogleProfile | null> {
  const cfg = config();
  if (!cfg) return null;

  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      redirect_uri: googleRedirectUri(),
      grant_type: "authorization_code",
    }),
  });
  if (!tokenResponse.ok) return null;
  const { access_token: accessToken } = (await tokenResponse.json()) as { access_token?: string };
  if (!accessToken) return null;

  const infoResponse = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!infoResponse.ok) return null;
  const info = (await infoResponse.json()) as {
    email?: string;
    email_verified?: boolean;
    name?: string;
  };
  if (!info.email || info.email_verified !== true) return null;
  return { email: info.email.trim().toLowerCase(), name: info.name?.trim() || null };
}
