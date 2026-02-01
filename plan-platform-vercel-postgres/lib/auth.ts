import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE = "pp_session";

export async function getUser() {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return null;
  return prisma.user.findUnique({ where: { id: c } });
}

export async function setSession(userId: string) {
  cookies().set(COOKIE, userId, { httpOnly: true, sameSite: "lax", path: "/" });
}

export async function clearSession() {
  cookies().delete(COOKIE);
}
