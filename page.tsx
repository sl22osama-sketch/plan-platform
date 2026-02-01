import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { Card, CardBody, CardHeader, Button, Badge } from "@/components/ui";

function tone(status: string) {
  if (status === "APPROVED") return "ok";
  if (status === "REVIEWED") return "info";
  if (status === "AI_DONE") return "warn";
  return "info";
}

export default async function Dashboard() {
  const user = await getUser();
  if (!user) redirect("/login");

  const [plans, counts] = await Promise.all([
    prisma.plan.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { evaluation: true } }),
    prisma.plan.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const map: Record<string, number> = {};
  counts.forEach((c: any) => (map[c.status] = c._count._all));

  const avg = await prisma.evaluation.aggregate({ _avg: { overallPercent: true } });
  const avgVal = Math.round((avg._avg.overallPercent ?? 0) as number);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-slate-600">إحصائيات سريعة وإدارة الخطط.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/plans/new"><Button>رفع وتقييم خطة</Button></Link>
          <Link href="/reports"><Button variant="ghost">التقارير</Button></Link>
          <form action="/api/auth/logout" method="post">
            <Button variant="ghost" type="submit">خروج</Button>
          </form>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><div className="font-semibold">الخطط المُقيّمة</div></CardHeader><CardBody className="text-3xl font-bold">{map["APPROVED"] ?? 0}</CardBody></Card>
        <Card><CardHeader><div className="font-semibold">الخطط المعلقة</div></CardHeader><CardBody className="text-3xl font-bold">{(map["SUBMITTED"] ?? 0) + (map["AI_DONE"] ?? 0)}</CardBody></Card>
        <Card><CardHeader><div className="font-semibold">متوسط التقييم</div></CardHeader><CardBody className="text-3xl font-bold">{avgVal || 0}%</CardBody></Card>
      </div>

      <Card>
        <CardHeader><div className="font-semibold">آخر الخطط</div></CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-600">
              <tr className="border-b">
                <th className="py-2 text-right">المعلم</th>
                <th className="py-2 text-right">الصف</th>
                <th className="py-2 text-right">الأسبوع</th>
                <th className="py-2 text-right">الحالة</th>
                <th className="py-2 text-right">النتيجة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2">{p.teacherName}</td>
                  <td className="py-2">{p.gradeLevel}</td>
                  <td className="py-2">{p.weekLabel}</td>
                  <td className="py-2"><Badge tone={tone(p.status) as any}>{p.status}</Badge></td>
                  <td className="py-2">{p.evaluation ? `${p.evaluation.overallPercent}%` : "—"}</td>
                  <td className="py-2 text-left">
                    <Link href={`/plans/${p.id}`} className="text-slate-900 underline">فتح</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
