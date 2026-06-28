import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <p className="font-mono text-sm text-green-300 mb-2">
          root@hacklinux:~$ ./contact.sh
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Контакты
        </h1>

        <div className="border border-green-500/40 bg-black/85 rounded-2xl p-6 md:p-8 shadow-[0_0_45px_rgba(34,197,94,0.18)]">
          <p className="text-green-100 text-lg leading-8 mb-8">
            Пока это тестовая страница. Позже сюда можно добавить форму обратной
            связи, ссылку на Telegram, GitHub или email.
          </p>

          <div className="space-y-4 font-mono">
            <div className="border border-green-500/30 rounded-xl p-4 bg-zinc-950">
              <span className="text-green-500">github:</span>{" "}
              <span className="text-green-100">coming_soon</span>
            </div>

            <div className="border border-green-500/30 rounded-xl p-4 bg-zinc-950">
              <span className="text-green-500">telegram:</span>{" "}
              <span className="text-green-100">coming_soon</span>
            </div>

            <div className="border border-green-500/30 rounded-xl p-4 bg-zinc-950">
              <span className="text-green-500">email:</span>{" "}
              <span className="text-green-100">coming_soon</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="text-center border border-green-400 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
            >
              На главную
            </Link>

            <Link
              href="/about"
              className="text-center border border-green-500/40 text-green-200 px-6 py-3 rounded-xl font-bold hover:text-green-100 hover:border-green-300 transition"
            >
              О проекте
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
