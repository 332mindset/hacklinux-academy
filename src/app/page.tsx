import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-green-400 overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_45%)]" />

      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full border border-green-500/40 bg-black/85 shadow-[0_0_45px_rgba(34,197,94,0.25)] p-8 md:p-12 rounded-2xl">
          <p className="text-sm text-green-300 mb-4 font-mono">
            root@hacklinux:~$ ./start_training.sh
          </p>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            HackLinux Academy
          </h1>

          <p className="text-lg md:text-xl text-green-200 max-w-2xl mb-8">
            Изучи Linux через короткую теорию и закрепи знания в интерактивном
            терминале. Выбери уровень: новичок, средний или высокий.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center border border-green-400 px-8 py-4 rounded-xl text-lg font-bold text-black bg-green-400 hover:bg-green-300 transition shadow-[0_0_25px_rgba(34,197,94,0.6)]"
            >
              ОБУЧИТЬСЯ
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center justify-center border border-green-500/40 px-8 py-4 rounded-xl text-lg font-bold text-green-200 hover:text-green-100 hover:border-green-300 transition"
            >
              ПРАКТИКА
            </Link>

            <div className="border border-green-500/30 rounded-xl px-6 py-4 text-green-200 font-mono">
              status: waiting_for_student
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-green-500/20 bg-black/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-green-700 font-mono">
            © 2026 HackLinux Academy
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-mono">
            <Link
              href="/learn"
              className="text-green-300 hover:text-green-100 transition"
            >
              ./learn
            </Link>

            <Link
              href="/practice"
              className="text-green-300 hover:text-green-100 transition"
            >
              ./practice
            </Link>

            <a
              href="#"
              className="text-green-300 hover:text-green-100 transition"
            >
              ./github
            </a>

            <a
              href="#"
              className="text-green-300 hover:text-green-100 transition"
            >
              ./contact
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
