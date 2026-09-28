import { getSiteUrl } from "@/lib/seo/site";

/**
 * Owner login for /os — Google OAuth 2.0 code flow, no password.
 *
 * Anyone can sign in with Google, but a session only starts for a verified
 * email on ADMIN_EMAILS. Same client credentials as the client portal
 * (GOOGLE_CLIENT_ID/SECRET), different redirect URI so Google routes back here.
 */

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

export const GOOGLE_STATE_COOKIE = "os_google_state";
export const GOOGLE_STATE_MAX_AGE_SECONDS = 10 * 60;

export const ADMIN_EMAILS = ["web.wise018@gmail.com", "djordje@adspire.rs"];

export function isAllowedAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

type GoogleConfig = { clientId: string; clientSecret: string };

function config(): GoogleConfig | null {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

export function isGoogleLoginConfigured(): boolean {
  return config() !== null;
}

/** Fixed to the canonical site so it matches the URI registered in Google Cloud. */
export function googleRedirectUri(): string {
  return `${getSiteUrl()}/api/os/google/callback`;
}

export function googleAuthUrl(state: string): string | null {
  const cfg = config();
  if (!cfg) return null;
  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export function readGoogleState(
  cookieValue: string | undefined,
  returnedState: string | null,
): boolean {
  if (!cookieValue || !returnedState) return false;
  return cookieValue.length >= 16 && cookieValue === returnedState;
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
