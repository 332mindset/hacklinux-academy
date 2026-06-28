"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import type { CourseLevel } from "@/data/courses";
import { getPreviousLevel, isCourseUnlocked } from "@/lib/progress";

type LevelAccessGuardProps = {
  level: CourseLevel;
  children: ReactNode;
};

const levelNames: Record<CourseLevel, string> = {
  beginner: "Новичок",
  medium: "Средний",
  advanced: "Высокий",
};

export function LevelAccessGuard({ level, children }: LevelAccessGuardProps) {
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isCourseUnlocked(level));
    setChecking(false);
  }, [level]);

  if (checking) {
    return (
      <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="border border-green-500/40 bg-black/85 rounded-2xl p-8 shadow-[0_0_45px_rgba(34,197,94,0.2)]">
            <p className="font-mono text-green-300">
              checking_access_permissions...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!unlocked) {
    const previousLevel = getPreviousLevel(level);

    return (
      <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_45%)]" />

        <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl w-full border border-red-500/50 bg-black/90 rounded-2xl p-8 md:p-10 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
            <p className="font-mono text-sm text-red-300 mb-4">
              root@hacklinux:~$ access_level --check
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-red-400 mb-6">
              ACCESS DENIED
            </h1>

            <p className="text-green-100 text-lg leading-8 mb-8">
              Уровень “{levelNames[level]}” пока заблокирован.
              {previousLevel
                ? ` Сначала заверши уровень “${levelNames[previousLevel]}”.`
                : ""}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {previousLevel && (
                <Link
                  href={`/practice/${previousLevel}`}
                  className="text-center border border-green-400 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
                >
                  Пройти предыдущий уровень
                </Link>
              )}

              <Link
                href="/learn"
                className="text-center border border-green-500/40 text-green-200 px-6 py-3 rounded-xl font-bold hover:text-green-100 hover:border-green-300 transition"
              >
                К уровням
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
