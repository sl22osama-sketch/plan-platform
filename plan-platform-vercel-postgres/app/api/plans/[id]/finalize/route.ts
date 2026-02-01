import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) return Response.json({ error: "غير مصرح" }, { status: 401 });

  const ev = await prisma.evaluation.findUnique({ where: { planId: params.id } });
  if (!ev) return Response.json({ error: "لا يوجد تقييم" }, { status: 404 });

  await prisma.evaluation.update({ where: { id: ev.id }, data: { isFinal: true } });
  await prisma.plan.update({ where: { id: params.id }, data: { status: "APPROVED" } });

  return Response.redirect(new URL(`/plans/${params.id}`, req.url));
}
