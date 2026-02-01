export type Criterion = { id: number; section: "lesson_elements" | "overall"; textAr: string };

export const CRITERIA_AR: Criterion[] = [
  { id: 1, section: "lesson_elements", textAr: "تتضمن الخطة المعايير الأكاديمية، والأهداف العامة، والأسئلة الأساسية، والأهداف التعليمية المحددة" },
  { id: 2, section: "lesson_elements", textAr: "الأهداف التعليمية مكتوبة بصيغة سلوكية قابلة للملاحظة والقياس" },
  { id: 3, section: "lesson_elements", textAr: "تم إدراج جميع المواد والمراجع والموارد اللازمة للدرس" },
  { id: 4, section: "lesson_elements", textAr: "أدوات التقييم متماشية مع الأهداف وتقيس النتائج المتوقعة من التعلم" },
  { id: 5, section: "lesson_elements", textAr: "الأنشطة التعليمية مصممة لتحقيق الأهداف الموضوعة" },
  { id: 6, section: "lesson_elements", textAr: "توجد انتقالات واضحة ومنطقية بين أجزاء الدرس" },
  { id: 7, section: "lesson_elements", textAr: "يرتبط الدرس بالتعلم السابق ويهيئ للدرس القادم عند الحاجة" },
  { id: 8, section: "lesson_elements", textAr: "تم توضيح أدوار الطالب والتعليمات الخاصة بالأنشطة بشكل واضح" },
  { id: 9, section: "lesson_elements", textAr: "تم تضمين أسئلة موجهة أو محفزة للنقاش داخل الحصة" },
  { id: 10, section: "lesson_elements", textAr: "يوفر الدرس تسلسلاً في الدعم التعليمي (نموذج → تدريب → تطبيق)" },
  { id: 11, section: "lesson_elements", textAr: "يرتبط المحتوى الجديد بخبرات الطلاب السابقة" },
  { id: 12, section: "lesson_elements", textAr: "تم تقديم مخطط أو تسلسل واضح للمحتوى" },
  { id: 13, section: "lesson_elements", textAr: "استُخدمت استراتيجيات تدريس مناسبة" },
  { id: 14, section: "lesson_elements", textAr: "يوجد تمايز واضح في الأنشطة" },
  { id: 15, section: "lesson_elements", textAr: "يتضمن الدرس أدوات تقييم تكويني" },
  { id: 16, section: "lesson_elements", textAr: "تنتهي الحصة بخلاصة" },
  { id: 17, section: "overall", textAr: "وتيرة تنفيذ الدرس مناسبة" },
  { id: 18, section: "overall", textAr: "تم استخدام مصادر متنوعة وأنشطة مشوقة" },
  { id: 19, section: "overall", textAr: "الخطة واضحة ومكتوبة بشكل يسمح لأي معلم بتطبيقها" },
  { id: 20, section: "overall", textAr: "الخطة خالية من الأخطاء الإملائية والنحوية" }
];
