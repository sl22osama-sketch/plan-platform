# منصة تقييم الخطط التعليمية (Next.js)

- واجهة عربية RTL
- تسجيل دخول بسيط (MVP)
- رفع نص خطة وتقييمها وفق 20 معياراً
- تعديل الملاحظات واعتماد التقرير

## تشغيل محلياً
1) انسخ `.env.example` إلى `.env`
2) `npm install`
3) `npx prisma migrate dev --name init`
4) `npm run seed`
5) `npm run dev` ثم افتح http://localhost:3000

## تفعيل الذكاء الاصطناعي
ضع `OPENAI_API_KEY` في `.env`

## حساب تجريبي
coordinator@example.com / 123456
