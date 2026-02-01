import Link from "next/link";
import { Card, CardBody, CardHeader, Button } from "@/components/ui";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">منصة تقييم الخطط التعليمية 📚</h1>
          <p className="text-slate-600">منصة للمنسقين لتقييم خطط المعلمين وفق 20 معياراً تربوياً.</p>
        </div>
        <div className="flex gap-2">
          {user ? (
            <Link href="/dashboard"><Button>لوحة التحكم</Button></Link>
          ) : (
            <Link href="/login"><Button>تسجيل الدخول</Button></Link>
          )}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><div className="font-semibold">تقييم آلي</div></CardHeader>
          <CardBody className="text-sm text-slate-700">تحليل الخطة آلياً وفق 20 معياراً مع ملاحظات تطويرية.</CardBody>
        </Card>
        <Card>
          <CardHeader><div className="font-semibold">تدخل اختياري</div></CardHeader>
          <CardBody className="text-sm text-slate-700">يمكن للمنسق تعديل الملاحظات والاعتماد النهائي عند الحاجة.</CardBody>
        </Card>
        <Card>
          <CardHeader><div className="font-semibold">تقارير وأرشفة</div></CardHeader>
          <CardBody className="text-sm text-slate-700">تقارير تفصيلية وأرشيف بحث وفلترة.</CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><div className="font-semibold">الدخول التجريبي</div></CardHeader>
        <CardBody className="text-sm text-slate-700">
          البريد: <span className="font-mono">coordinator@example.com</span> — كلمة المرور: <span className="font-mono">123456</span>
        </CardBody>
      </Card>
    </div>
  );
}
