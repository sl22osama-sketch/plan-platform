import { CRITERIA_AR } from "./criteria.ar";

export type Status = "MET" | "PARTIAL" | "NOT_MET";

export type CriterionResult = {
  criterionId: number;
  status: Status;
  comment: string;
  evidence?: string;
};

export type Evaluation = {
  overallPercent: number;
  overallSummary: string;
  strengths: string[];
  improvements: string[];
  results: CriterionResult[];
};

function fallbackEvaluate(_: string): Evaluation {
  const results = CRITERIA_AR.map((c) => ({
    criterionId: c.id,
    status: "PARTIAL" as const,
    comment: "لم يتم تفعيل التحليل الذكي بعد. يُرجى إضافة مفتاح OPENAI_API_KEY لتوليد تقييم تلقائي دقيق.",
    evidence: "",
  }));
  return {
    overallPercent: 50,
    overallSummary: "تقييم تجريبي (بدون ذكاء اصطناعي).",
    strengths: ["تم استلام الخطة بنجاح داخل المنصة."],
    improvements: ["أضف مفتاح OPENAI_API_KEY لتفعيل التحليل الآلي.", "يمكن للمنسق تعديل الملاحظات قبل الاعتماد."],
    results,
  };
}

export async function evaluatePlanText(planText: string): Promise<Evaluation> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return fallbackEvaluate(planText);

  const system = "أنت مقيم تربوي محترف. قيّم خطة معلم لغة عربية وفق 20 معياراً. أعِد JSON صالحاً فقط دون أي شرح.";
  const criteria = CRITERIA_AR.map((c) => ({ id: c.id, text: c.textAr }));
  const user = { criteria, planText };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify({
          ...user,
          contract: {
            overallPercent: "number 0..100",
            overallSummary: "string",
            strengths: "string[]",
            improvements: "string[]",
            results: "Array<{criterionId:number,status:'MET'|'PARTIAL'|'NOT_MET',comment:string,evidence?:string}>"
          }
        }) }
      ],
    }),
  });

  if (!resp.ok) return fallbackEvaluate(planText);
  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  try {
    const parsed = JSON.parse(content);
    if (!parsed?.results || !Array.isArray(parsed.results)) return fallbackEvaluate(planText);
    return parsed as Evaluation;
  } catch {
    return fallbackEvaluate(planText);
  }
}
