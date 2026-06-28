"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCourse } from "@/data/courses";
import type { CourseLevel } from "@/data/courses";
import {
  getCourseProgress,
  getNextLevel,
  isCourseCompleted,
  resetCourseProgress,
  removeCompletedLevel,
} from "@/lib/progress";

type ResultPanelProps = {
  level: CourseLevel;
};

export function ResultPanel({ level }: ResultPanelProps) {
  const course = getCourse(level);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCompleted(isCourseCompleted(level));
    setProgress(getCourseProgress(level));
  }, [level]);

  if (!course) {
    return null;
  }

  const nextLevel = getNextLevel(level);
  const nextCourse = nextLevel ? getCourse(nextLevel) : null;

  function resetLevel() {
    removeCompletedLevel(level);
    resetCourseProgress(level);
    window.location.href = `/practice/${level}`;
  }

  if (!completed) {
    return (
      <section className="max-w-3xl mx-auto border border-red-500/50 bg-black/90 rounded-2xl p-8 md:p-10 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
        <p className="font-mono text-sm text-red-300 mb-4">
          root@hacklinux:~$ result --check
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-red-400 mb-6">
          RESULT LOCKED
        </h1>

        <p className="text-green-100 text-lg leading-8 mb-8">
          Этот результат пока недоступен. Сначала заверши практику уровня
          “{course.shortTitle}”.
        </p>

        <Link
          href={`/practice/${level}`}
          className="inline-flex border border-green-400 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
        >
          Вернуться к практике
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="border border-green-500/40 bg-black/90 rounded-2xl p-8 md:p-10 shadow-[0_0_55px_rgba(34,197,94,0.25)]">
        <p className="font-mono text-sm text-green-300 mb-4">
          root@hacklinux:~$ cat mission_result.json
        </p>

        <p className="font-mono text-sm text-green-500 mb-3">
          {course.badge}
        </p>

        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          ACCESS GRANTED
        </h1>

        <p className="text-xl text-green-100 leading-8 mb-8">
          Уровень “{course.shortTitle}” завершён. Прогресс сохранён в браузере.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
            <p className="font-mono text-sm text-green-500 mb-2">
              level
            </p>
            <p className="text-2xl font-bold">{course.shortTitle}</p>
          </div>

          <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
            <p className="font-mono text-sm text-green-500 mb-2">
              tasks
            </p>
            <p className="text-2xl font-bold">
              {course.tasks.length} / {course.tasks.length}
            </p>
          </div>

          <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
            <p className="font-mono text-sm text-green-500 mb-2">
              status
            </p>
            <p className="text-2xl font-bold">completed</p>
          </div>
        </div>

        <div className="h-4 rounded-full bg-green-950 border border-green-500/20 overflow-hidden mb-8">
          <div
            className="h-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.8)]"
            style={{ width: "100%" }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {nextCourse ? (
            <Link
              href={`/learn/${nextCourse.slug}/1`}
              className="text-center border border-green-400 bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              Следующий уровень: {nextCourse.shortTitle}
            </Link>
          ) : (
            <Link
              href="/profile"
              className="text-center border border-green-400 bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              Открыть профиль
            </Link>
          )}

          <Link
            href="/learn"
            className="text-center border border-green-500/40 text-green-200 px-6 py-4 rounded-xl font-bold hover:border-green-300 hover:text-green-100 transition"
          >
            К уровням
          </Link>

          <button
            type="button"
            onClick={resetLevel}
            className="text-center border border-red-500/50 text-red-300 px-6 py-4 rounded-xl font-bold hover:bg-red-500/10 transition"
          >
            Пройти заново
          </button>
        </div>

        <p className="mt-6 text-sm font-mono text-green-700">
          saved_progress: {progress}
        </p>
      </div>
    </section>
  );
}
