import Link from "next/link";
import { courseList } from "@/data/courses";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <header className="mb-10">
          <p className="font-mono text-sm text-green-300 mb-2">
            root@hacklinux:~$ select_course --level
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Выбери уровень
          </h1>

          <p className="text-green-200 text-lg max-w-3xl">
            Начни с базовых команд или переходи к системному администрированию.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <article
              key={course.slug}
              className="border border-green-500/40 bg-black/85 rounded-2xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.16)]"
            >
              <p className="font-mono text-sm text-green-300 mb-3">
                {course.badge}
              </p>

              <h2 className="text-3xl font-bold mb-4">{course.shortTitle}</h2>

              <p className="text-green-100 leading-7 mb-6">
                {course.description}
              </p>

              <div className="flex flex-col gap-3">
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
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="font-mono text-green-300 hover:text-green-100 transition"
          >
            ← ./home
          </Link>
        </div>
      </section>
    </main>
  );
}
