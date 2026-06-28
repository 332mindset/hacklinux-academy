"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courseList } from "@/data/courses";
import type { CourseLevel } from "@/data/courses";
import {
  getCourseProgress,
  isCourseCompleted,
  isCourseUnlocked,
  resetAllProgress,
} from "@/lib/progress";

type CourseProgressInfo = {
  slug: CourseLevel;
  title: string;
  badge: string;
  description: string;
  completed: boolean;
  unlocked: boolean;
  currentTask: number;
  totalTasks: number;
  percent: number;
};

export function ProfileDashboard() {
  const [items, setItems] = useState<CourseProgressInfo[]>([]);

  function loadProgress() {
    const nextItems = courseList.map((course) => {
      const completed = isCourseCompleted(course.slug);
      const unlocked = isCourseUnlocked(course.slug);
      const currentTask = getCourseProgress(course.slug);
      const totalTasks = course.tasks.length;

      const percent = completed
        ? 100
        : totalTasks > 0
          ? Math.min(100, Math.round((currentTask / totalTasks) * 100))
          : 0;

      return {
        slug: course.slug,
        title: course.shortTitle,
        badge: course.badge,
        description: course.description,
        completed,
        unlocked,
        currentTask,
        totalTasks,
        percent,
      };
    });

    setItems(nextItems);
  }

  useEffect(() => {
    loadProgress();

    window.addEventListener("hacklinux-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("hacklinux-progress-updated", loadProgress);
    };
  }, []);

  const overallProgress = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }

    const totalPercent = items.reduce((sum, item) => sum + item.percent, 0);

    return Math.round(totalPercent / items.length);
  }, [items]);

  function handleResetAllProgress() {
    const confirmed = window.confirm(
      "Точно сбросить весь прогресс? Это действие нельзя отменить.",
    );

    if (!confirmed) {
      return;
    }

    resetAllProgress();
    loadProgress();
  }

  return (
    <div className="grid gap-8">
      <section className="border border-green-500/40 bg-black/85 rounded-2xl p-6 md:p-8 shadow-[0_0_45px_rgba(34,197,94,0.18)]">
        <p className="font-mono text-sm text-green-300 mb-3">
          user@hacklinux:~$ cat progress.json
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Общий прогресс: {overallProgress}%
        </h2>

        <div className="h-4 rounded-full bg-green-950 border border-green-500/20 overflow-hidden mb-6">
          <div
            className="h-full bg-green-400 transition-all shadow-[0_0_18px_rgba(34,197,94,0.8)]"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/learn"
            className="text-center border border-green-400 bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
          >
            К уровням
          </Link>

          <Link
            href="/practice"
            className="text-center border border-green-500/40 text-green-200 px-5 py-3 rounded-xl font-bold hover:border-green-300 hover:text-green-100 transition"
          >
            К практике
          </Link>

          <button
            type="button"
            onClick={handleResetAllProgress}
            className="text-center border border-red-500/50 text-red-300 px-5 py-3 rounded-xl font-bold hover:bg-red-500/10 transition"
          >
            Сбросить прогресс
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {items.map((item) => {
          let status = "Не начат";
          let statusClassName = "border-green-500/30 text-green-300";

          if (!item.unlocked) {
            status = "Заблокирован";
            statusClassName = "border-red-500/40 text-red-300";
          } else if (item.completed) {
            status = "Завершён ✅";
            statusClassName = "border-green-400/60 text-green-200";
          } else if (item.currentTask > 0) {
            status = `В процессе: ${item.percent}%`;
            statusClassName = "border-yellow-500/40 text-yellow-300";
          }

          return (
            <article
              key={item.slug}
              className={
                item.unlocked
                  ? "border border-green-500/40 bg-black/85 rounded-2xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.14)]"
                  : "border border-red-500/30 bg-black/70 rounded-2xl p-6 opacity-70"
              }
            >
              <p className="font-mono text-sm text-green-300 mb-3">
                {item.badge}
              </p>

              <div
                className={`w-fit border rounded-full px-3 py-1 text-xs font-mono mb-4 ${statusClassName}`}
              >
                {status}
              </div>

              <h3 className="text-3xl font-bold mb-4">{item.title}</h3>

              <p className="text-green-100 leading-7 mb-6">
                {item.description}
              </p>

              <div className="mb-4 flex justify-between text-sm font-mono text-green-300">
                <span>
                  task {Math.min(item.currentTask, item.totalTasks)} /{" "}
                  {item.totalTasks}
                </span>
                <span>{item.percent}%</span>
              </div>

              <div className="h-2 rounded-full bg-green-950 border border-green-500/20 overflow-hidden mb-6">
                <div
                  className="h-full bg-green-400 transition-all"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              {item.unlocked ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/learn/${item.slug}/1`}
                    className="text-center border border-green-400 bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
                  >
                    Теория
                  </Link>

                  <Link
                    href={`/practice/${item.slug}`}
                    className="text-center border border-green-500/40 text-green-200 px-5 py-3 rounded-xl font-bold hover:border-green-300 hover:text-green-100 transition"
                  >
                    Практика
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full text-center border border-red-500/30 text-red-300/70 px-5 py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  Заблокировано
                </button>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
