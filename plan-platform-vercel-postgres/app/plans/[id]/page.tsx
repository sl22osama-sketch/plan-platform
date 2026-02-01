import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { Card, CardBody, CardHeader, Button, Badge } from "@/components/ui";
import { CRITERIA_AR } from "@/lib/criteria.ar";

const mapStatus = (s: string) => (s === "MET" ? ["مستوفى", "ok"] : s === "PARTIAL" ? ["جزئي", "warn"] : ["غير مستوفى", "bad"]);

export default async function PlanPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) redirect("/login");

  const plan = await prisma.plan.findUnique({ where: { id: params.id }, include: { evaluation: true } });
  if (!plan) redirect("/dashboard");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">تقييم الخطة</h1>
          <p className="text-slate-600">{plan.teacherName} — {plan.gradeLevel} — {plan.weekLabel}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard"><Button variant="ghost">رجوع</Button></Link>
          {plan.evaluation && (
            <form action={`/api/plans/${plan.id}/finalize`} method="post">
              <Button type="submit">اعتماد التقرير</Button>
            </form>
          )}
        </div>
      </div>

      {!plan.evaluation ? (
        <Card>
          <CardHeader><div className="font-semibold">جاري التقييم...</div></CardHeader>
          <CardBody className="text-sm text-slate-700">إذا لم يظهر التقرير، أعد تحميل الصفحة بعد لحظات.</CardBody>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardHeader><div className="font-semibold">النتيجة الإجمالية</div></CardHeader><CardBody className="text-3xl font-bold">{plan.evaluation.overallPercent}%</CardBody></Card>
            <Card><CardHeader><div className="font-semibold">الحالة</div></CardHeader><CardBody className="text-lg font-semibold">{plan.evaluation.isFinal ? "معتمد" : "مسودة"}</CardBody></Card>
            <Card><CardHeader><div className="font-semibold">ملخص</div></CardHeader><CardBody className="text-sm text-slate-700">{plan.evaluation.overallSummary}</CardBody></Card>
          </div>

          <Card>
            <CardHeader><div className="font-semibold">المعايير (20)</div></CardHeader>
            <CardBody className="space-y-3">
              {CRITERIA_AR.map((c) => {
                const res = (plan.evaluation?.results as any[]).find((r) => r.criterionId === c.id);
                const [label, tone] = mapStatus(res?.status || "PARTIAL");
                return (
                  <div key={c.id} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{c.id}. {c.textAr}</div>
                        <div className="mt-1 text-sm text-slate-700">{res?.comment || "—"}</div>
                      </div>
                      <Badge tone={tone as any}>{label}</Badge>
                    </div>

                    <form action={`/api/plans/${plan.id}/update-criterion`} method="post" className="mt-2 grid gap-2 md:grid-cols-3">
                      <input type="hidden" name="criterionId" value={String(c.id)} />
                      <select name="status" defaultValue={res?.status || "PARTIAL"} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                        <option value="MET">✅ مستوفى</option>
                        <option value="PARTIAL">⚠️ جزئي</option>
                        <option value="NOT_MET">❌ غير مستوفى</option>
                      </select>
                      <input name="comment" defaultValue={res?.comment || ""} placeholder="تعديل الملاحظة (اختياري)" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm md:col-span-2" />
                      <Button variant="ghost" type="submit" className="md:col-span-3">حفظ تعديل هذا المعيار</Button>
                    </form>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
