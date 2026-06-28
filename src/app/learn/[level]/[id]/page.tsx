import Link from "next/link";
import { notFound } from "next/navigation";
import { LevelAccessGuard } from "@/components/LevelAccessGuard";
import { courseList, getCourse } from "@/data/courses";

type LessonPageProps = {
  params: Promise<{
    level: string;
    id: string;
  }>;
};

export function generateStaticParams() {
  return courseList.flatMap((course) =>
    course.lessons.map((lesson) => ({
      level: course.slug,
      id: String(lesson.id),
    })),
  );
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { level, id } = await params;

  const course = getCourse(level);

  if (!course) {
    notFound();
  }

  const lessonId = Number(id);
  const lesson = course.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    notFound();
  }

  const currentIndex = course.lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

  const progress = Math.round((lesson.id / course.lessons.length) * 100);

  return (
    <LevelAccessGuard level={course.slug}>
      <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

        <section className="relative z-10 max-w-5xl mx-auto px-6 py-10">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-sm text-green-300 mb-2">
                root@hacklinux:~$ open {course.slug}/lesson_{lesson.id}.md
              </p>

              <p className="font-mono text-sm text-green-500 mb-2">
                {course.badge}
              </p>

              <h1 className="text-3xl md:text-5xl font-bold">
                {lesson.title}
              </h1>
            </div>

            <div className="flex gap-3">
              <Link
                href="/learn"
                className="w-fit border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ./levels
              </Link>

              <Link
                href="/"
                className="w-fit border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ./home
              </Link>
            </div>
          </header>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 font-mono text-sm text-green-300">
              <span>
                lesson {lesson.id} / {course.lessons.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 rounded-full bg-green-950 border border-green-500/20 overflow-hidden">
              <div
                className="h-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <article className="border border-green-500/40 bg-black/85 rounded-2xl shadow-[0_0_45px_rgba(34,197,94,0.18)] overflow-hidden">
            <div className="border-b border-green-500/30 px-5 py-3 flex items-center gap-2 bg-zinc-950">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-sm text-green-200 font-mono">
                theory — {lesson.command}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-lg text-green-100 leading-8 mb-8">
                {lesson.description}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">Синтаксис</h2>

                <div className="border border-green-500/30 rounded-xl bg-zinc-950 p-4 font-mono text-green-200">
                  $ {lesson.syntax}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Примеры</h2>

                <div className="space-y-4">
                  {lesson.examples.map((example) => (
                    <div
                      key={example.command}
                      className="border border-green-500/20 rounded-xl bg-black p-4"
                    >
                      <code className="block font-mono text-green-300 mb-3">
                        $ {example.command}
                      </code>

                      {example.result && (
                        <pre className="mb-3 whitespace-pre-wrap rounded-lg bg-zinc-950 border border-green-500/20 p-3 text-green-100">
                          {example.result}
                        </pre>
                      )}

                      <p className="text-green-100">
                        {example.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {lesson.notes && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Запомни</h2>

                  <ul className="space-y-3">
                    {lesson.notes.map((note) => (
                      <li
                        key={note}
                        className="border-l-2 border-green-400 pl-4 text-green-100"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </article>

          <nav className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            {previousLesson ? (
              <Link
                href={`/learn/${course.slug}/${previousLesson.id}`}
                className="text-center border border-green-500/40 px-6 py-4 rounded-xl text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ← Назад: {previousLesson.command}
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/learn/${course.slug}/${nextLesson.id}`}
                className="text-center border border-green-400 bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                Далее: {nextLesson.command} →
              </Link>
            ) : (
              <Link
                href={`/practice/${course.slug}`}
                className="text-center border border-green-400 bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                Перейти к практике →
              </Link>
            )}
          </nav>
        </section>
      </main>
    </LevelAccessGuard>
  );
}
