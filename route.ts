import { prisma } from "@/lib/db";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return Response.json({ error: "بيانات ناقصة" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) return Response.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });

  await setSession(user.id);
  return Response.json({ ok: true });
}
