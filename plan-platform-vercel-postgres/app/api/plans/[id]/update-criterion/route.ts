import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) return Response.json({ error: "غير مصرح" }, { status: 401 });

  const form = await req.formData();
  const criterionId = Number(form.get("criterionId"));
  const status = String(form.get("status") || "PARTIAL");
  const comment = String(form.get("comment") || "");

  const ev = await prisma.evaluation.findUnique({ where: { planId: params.id } });
  if (!ev) return Response.json({ error: "لا يوجد تقييم" }, { status: 404 });

  const results = (ev.results as any[]) || [];
  const idx = results.findIndex((r) => r.criterionId === criterionId);
  const item = { criterionId, status, comment };
  if (idx >= 0) results[idx] = { ...results[idx], ...item };
  else results.push(item);

  await prisma.evaluation.update({
    where: { id: ev.id },
    data: { results, isFinal: false },
  });
  await prisma.plan.update({ where: { id: params.id }, data: { status: "REVIEWED" } });

  return Response.redirect(new URL(`/plans/${params.id}`, req.url));
}
