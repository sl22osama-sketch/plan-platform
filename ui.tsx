import React from "react";
import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("rounded-2xl bg-white shadow-sm border border-slate-200", className)}>{children}</div>;
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-4 md:p-5 border-b border-slate-200">{children}</div>;
}
export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-4 md:p-5">{children}</div>;
}
export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : variant === "danger"
      ? "bg-rose-600 text-white hover:bg-rose-500"
      : "bg-transparent text-slate-900 hover:bg-slate-100 border border-slate-200";
  return <button className={clsx(base, styles, className)} {...props} />;
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300", (props as any).className)} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300", (props as any).className)} />;
}
export function Badge({ tone, children }: { tone: "ok" | "warn" | "bad" | "info"; children: React.ReactNode }) {
  const map = { ok: "bg-emerald-50 text-emerald-700 border-emerald-200", warn: "bg-amber-50 text-amber-700 border-amber-200", bad: "bg-rose-50 text-rose-700 border-rose-200", info: "bg-slate-50 text-slate-700 border-slate-200" };
  return <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", map[tone])}>{children}</span>;
}
