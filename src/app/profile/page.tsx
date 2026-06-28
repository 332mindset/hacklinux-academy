import Link from "next/link";
import { ProfileDashboard } from "@/components/ProfileDashboard";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_45%)]" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-sm text-green-300 mb-2">
              root@hacklinux:~$ open profile
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Профиль
            </h1>

            <p className="text-green-200 text-lg max-w-3xl">
              Здесь отображается прогресс по всем уровням. Сейчас данные
              сохраняются локально в браузере.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/learn"
              className="border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
            >
              ./levels
            </Link>

            <Link
              href="/"
              className="border border-green-500/40 px-4 py-2 rounded-xl text-sm font-mono text-green-200 hover:text-green-100 hover:border-green-300 transition"
            >
              ./home
            </Link>
          </div>
        </header>

        <ProfileDashboard />
      </section>
    </main>
  );
}
