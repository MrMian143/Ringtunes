import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: "ADMIN_PASSWORD env variable set nahi hai. Vercel project settings mein add karein." },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Ghalat password." }, { status: 401 });
  }

  cookies().set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  cookies().delete(COOKIE_NAME);
  return Response.json({ ok: true });
}
