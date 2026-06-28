import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_45%)]" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full border border-red-500/50 bg-black/90 rounded-2xl p-8 md:p-10 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
          <p className="font-mono text-sm text-red-300 mb-4">
            root@hacklinux:~$ open requested_route
          </p>

          <h1 className="text-5xl md:text-8xl font-bold text-red-400 mb-6">
            404
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ROUTE NOT FOUND
          </h2>

          <p className="text-green-100 text-lg leading-8 mb-8">
            Такой страницы не существует. Возможно, путь был введён неверно
            или уровень ещё не создан.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="text-center border border-green-400 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
            >
              На главную
            </Link>

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
