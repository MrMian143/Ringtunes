import { cookies } from "next/headers";

const COOKIE_NAME = "rt_admin";

export function isAuthed() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return Boolean(token) && token === process.env.ADMIN_PASSWORD;
}

export function requireAuthOr401() {
  if (!isAuthed()) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}

// Reads the admin cookie straight off the raw Request object instead of
// going through next/headers' cookies(). Used inside @vercel/blob's
// handleUpload callbacks, which run in a nested async context where relying
// on Next's request-scoped cookies() has been an unreliable pattern in some
// setups — reading the Cookie header directly removes that uncertainty.
export function isAuthedFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  const token = match ? decodeURIComponent(match[1]) : null;
  return Boolean(token) && Boolean(process.env.ADMIN_PASSWORD) && token === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME };
