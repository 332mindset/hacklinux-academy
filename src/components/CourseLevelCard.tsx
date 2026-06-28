"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Course } from "@/data/courses";
import {
  getCourseProgress,
  getPreviousLevel,
  isCourseCompleted,
  isCourseUnlocked,
} from "@/lib/progress";

type CourseLevelCardProps = {
  course: Course;
};

export function CourseLevelCard({ course }: CourseLevelCardProps) {
  const [completed, setCompleted] = useState(false);
  const [unlocked, setUnlocked] = useState(course.slug === "beginner");
  const [progress, setProgress] = useState(0);

  function loadProgress() {
    setCompleted(isCourseCompleted(course.slug));
    setUnlocked(isCourseUnlocked(course.slug));
    setProgress(getCourseProgress(course.slug));
  }

  useEffect(() => {
    loadProgress();

    window.addEventListener("hacklinux-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("hacklinux-progress-updated", loadProgress);
    };
  }, [course.slug]);

  const progressPercent =
    course.tasks.length > 0
      ? Math.min(100, Math.round((progress / course.tasks.length) * 100))
      : 0;

  const previousLevel = getPreviousLevel(course.slug);

  let statusText = "Не начат";
  let statusClassName = "text-green-300 border-green-500/30";

  if (!unlocked) {
    statusText =
      previousLevel === "beginner"
        ? "Заблокирован: пройди новичка"
        : "Заблокирован: пройди средний";
    statusClassName = "text-red-300 border-red-500/40";
  } else if (completed) {
    statusText = "Завершён ✅";
    statusClassName = "text-green-200 border-green-400/60";
  } else if (progress > 0) {
    statusText = `В процессе: ${progressPercent}%`;
    statusClassName = "text-yellow-300 border-yellow-500/40";
  }

  return (
    <article
      className={
        unlocked
          ? "border border-green-500/40 bg-black/85 rounded-2xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.16)]"
          : "border border-red-500/30 bg-black/70 rounded-2xl p-6 opacity-70"
      }
    >
      <p className="font-mono text-sm text-green-300 mb-3">{course.badge}</p>

      <div
        className={`w-fit border rounded-full px-3 py-1 text-xs font-mono mb-4 ${statusClassName}`}
      >
        {statusText}
      </div>

      <h2 className="text-3xl font-bold mb-4">{course.shortTitle}</h2>

      <p className="text-green-100 leading-7 mb-6">{course.description}</p>

      <div className="h-2 rounded-full bg-green-950 border border-green-500/20 overflow-hidden mb-6">
        <div
          className="h-full bg-green-400 transition-all"
          style={{ width: completed ? "100%" : `${progressPercent}%` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {unlocked ? (
          <>
            <Link
              href={`/learn/${course.slug}/1`}
              className="text-center border border-green-400 bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
            >
              Теория
            </Link>

            <Link
              href={`/practice/${course.slug}`}
              className="text-center border border-green-500/40 px-5 py-3 rounded-xl text-green-200 hover:text-green-100 hover:border-green-300 transition"
            >
              Практика
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled
              className="text-center border border-red-500/30 text-red-300/70 px-5 py-3 rounded-xl font-bold cursor-not-allowed"
            >
              Заблокировано
            </button>

            <p className="text-sm text-red-300/80 font-mono">
              Сначала заверши предыдущий уровень.
            </p>
          </>
        )}
      </div>
    </article>
  );
}
