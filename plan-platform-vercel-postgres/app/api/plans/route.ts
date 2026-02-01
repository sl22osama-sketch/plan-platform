import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { evaluatePlanText } from "@/lib/evaluate";

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return Response.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const { teacherName, gradeLevel, weekLabel, planText } = body || {};
  if (!teacherName || !gradeLevel || !weekLabel || !planText) {
    return Response.json({ error: "الحقول مطلوبة" }, { status: 400 });
  }

  const plan = await prisma.plan.create({
    data: { teacherName, gradeLevel, weekLabel, planText, status: "SUBMITTED" },
  });

  const evaluation = await evaluatePlanText(planText);

  await prisma.evaluation.create({
    data: {
      planId: plan.id,
      overallPercent: Math.max(0, Math.min(100, Math.round(evaluation.overallPercent))),
      overallSummary: evaluation.overallSummary || "",
      strengths: evaluation.strengths || [],
      improvements: evaluation.improvements || [],
      results: evaluation.results || [],
    },
  });

  await prisma.plan.update({ where: { id: plan.id }, data: { status: "AI_DONE" } });

  return Response.json({ planId: plan.id });
}
