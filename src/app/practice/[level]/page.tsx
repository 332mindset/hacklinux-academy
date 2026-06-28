import Link from "next/link";
import { notFound } from "next/navigation";
import { LevelAccessGuard } from "@/components/LevelAccessGuard";
import { TerminalSimulator } from "@/components/TerminalSimulator";
import { courseList, getCourse } from "@/data/courses";

type PracticePageProps = {
  params: Promise<{
    level: string;
  }>;
};

export function generateStaticParams() {
  return courseList.map((course) => ({
    level: course.slug,
  }));
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { level } = await params;
  const course = getCourse(level);

  if (!course) {
    notFound();
  }

  return (
    <LevelAccessGuard level={course.slug}>
      <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-green-300 mb-2 font-mono">
                root@hacklinux:~$ ./mission_mode.sh --level={course.slug}
              </p>

              <p className="font-mono text-sm text-green-500 mb-2">
                {course.badge}
              </p>

              <h1 className="text-3xl md:text-5xl font-bold">
                Практика: {course.shortTitle}
              </h1>

              <p className="text-green-200 mt-3 max-w-3xl">
                {course.description}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/learn/${course.slug}/1`}
                className="border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ./theory
              </Link>

              <Link
                href="/practice"
                className="border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ./missions
              </Link>

              <Link
                href="/"
                className="border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
              >
                ./home
              </Link>
            </div>
          </header>

          <TerminalSimulator level={course.slug} />
        </section>
      </main>
    </LevelAccessGuard>
  );
}
