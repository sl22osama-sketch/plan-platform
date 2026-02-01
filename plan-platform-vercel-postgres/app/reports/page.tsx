import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { Card, CardBody, CardHeader, Button } from "@/components/ui";

export default async function Reports() {
  const user = await getUser();
  if (!user) redirect("/login");

  const evals = await prisma.evaluation.findMany({
    orderBy: { updatedAt: "desc" },
    take: 50,
    include: { plan: true },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">التقارير</h1>
        <Link href="/dashboard"><Button variant="ghost">رجوع</Button></Link>
      </div>

      <Card>
        <CardHeader><div className="font-semibold">تقارير حديثة</div></CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-600">
              <tr className="border-b">
                <th className="py-2 text-right">المعلم</th>
                <th className="py-2 text-right">الأسبوع</th>
                <th className="py-2 text-right">النتيجة</th>
                <th className="py-2 text-right">الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {evals.map((e) => (
                <tr key={e.id} className="border-b last:border-0">
                  <td className="py-2">{e.plan.teacherName}</td>
                  <td className="py-2">{e.plan.weekLabel}</td>
                  <td className="py-2">{e.overallPercent}%</td>
                  <td className="py-2">{e.isFinal ? "معتمد" : "مسودة"}</td>
                  <td className="py-2 text-left">
                    <Link href={`/plans/${e.planId}`} className="underline">فتح</Link>
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
