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

export { COOKIE_NAME };
