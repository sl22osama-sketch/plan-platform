"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input } from "@/components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("coordinator@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(()=>({}));
      setError(j?.error || "تعذر تسجيل الدخول.");
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">تسجيل الدخول</h2>
          <p className="text-sm text-slate-600">واجهة خاصة بالمنسقين.</p>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">البريد الإلكتروني</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">كلمة المرور</div>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-sm text-rose-600">{error}</div>}
          <Button onClick={onSubmit} disabled={loading} className="w-full">
            {loading ? "..." : "دخول"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
