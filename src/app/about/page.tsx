import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <p className="font-mono text-sm text-green-300 mb-2">
          root@hacklinux:~$ cat about_project.md
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          О проекте
        </h1>

        <article className="border border-green-500/40 bg-black/85 rounded-2xl p-6 md:p-8 shadow-[0_0_45px_rgba(34,197,94,0.18)]">
          <p className="text-green-100 text-lg leading-8 mb-6">
            HackLinux Academy — это интерактивный тренажёр Linux-команд.
            Сначала пользователь изучает теорию, потом закрепляет знания
            в терминале-симуляторе.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
              <p className="font-mono text-sm text-green-500 mb-2">level_1</p>
              <h2 className="text-xl font-bold mb-2">Новичок</h2>
              <p className="text-green-100">
                Базовые команды: pwd, ls, cd, mkdir, touch, cat.
              </p>
            </div>

            <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
              <p className="font-mono text-sm text-green-500 mb-2">level_2</p>
              <h2 className="text-xl font-bold mb-2">Средний</h2>
              <p className="text-green-100">
                sudo, права, пользователи, grep, find, процессы.
              </p>
            </div>

            <div className="border border-green-500/30 rounded-xl p-5 bg-zinc-950">
              <p className="font-mono text-sm text-green-500 mb-2">level_3</p>
              <h2 className="text-xl font-bold mb-2">Высокий</h2>
              <p className="text-green-100">
                systemd, journalctl, сеть, SSH, cron, bash.
              </p>
            </div>
          </div>

          <p className="text-green-100 leading-8 mb-8">
            Сейчас терминал работает как безопасная симуляция. Он не выполняет
            реальные команды на сервере, а проверяет ввод пользователя.
            Это хорошо для MVP: быстро, безопасно и понятно.
          </p>

          <Link
            href="/learn"
            className="inline-flex border border-green-400 bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
          >
            Начать обучение
          </Link>
        </article>
      </section>
    </main>
  );
}
