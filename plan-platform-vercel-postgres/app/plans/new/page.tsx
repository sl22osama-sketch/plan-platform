"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Textarea } from "@/components/ui";

export default function NewPlan() {
  const [teacherName, setTeacherName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [weekLabel, setWeekLabel] = useState("");
  const [planText, setPlanText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true); setError(null);
    const res = await fetch("/api/plans", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ teacherName, gradeLevel, weekLabel, planText }),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(()=>({}));
      setError(j?.error || "تعذر حفظ الخطة.");
      return;
    }
    const j = await res.json();
    window.location.href = `/plans/${j.planId}`;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">رفع وتقييم خطة</h2>
          <p className="text-sm text-slate-600">لـ MVP: أدخل نص الخطة (يمكن إضافة رفع PDF/Word لاحقاً).</p>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">اسم المعلم</div>
              <Input value={teacherName} onChange={(e)=>setTeacherName(e.target.value)} placeholder="مثال: أ. محمد" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">الصف</div>
              <Input value={gradeLevel} onChange={(e)=>setGradeLevel(e.target.value)} placeholder="مثال: الخامس" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">الأسبوع</div>
              <Input value={weekLabel} onChange={(e)=>setWeekLabel(e.target.value)} placeholder="مثال: الأسبوع 3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">نص الخطة</div>
            <Textarea rows={12} value={planText} onChange={(e)=>setPlanText(e.target.value)} placeholder="الصق نص الخطة هنا..." />
          </div>

          {error && <div className="text-sm text-rose-600">{error}</div>}
          <Button onClick={submit} disabled={loading || !teacherName || !gradeLevel || !weekLabel || !planText} className="w-full">
            {loading ? "جاري الإرسال..." : "بدء التقييم"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
