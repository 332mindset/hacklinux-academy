import Link from "next/link";
import { CourseLevelCard } from "@/components/CourseLevelCard";
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
            Уровни открываются постепенно. Сначала пройди новичка, потом средний,
            потом высокий.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <CourseLevelCard key={course.slug} course={course} />
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
