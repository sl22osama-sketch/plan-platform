import "./globals.css";

export const metadata = {
  title: "منصة تقييم الخطط التعليمية",
  description: "منصة للمنسقين لتقييم خطط المعلمين وفق 20 معياراً",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-6xl p-4 md:p-8">{children}</div>
      </body>
    </html>
  );
}
