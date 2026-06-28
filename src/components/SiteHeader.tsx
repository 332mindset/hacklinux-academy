"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/learn",
    label: "./learn",
  },
  {
    href: "/practice",
    label: "./practice",
  },
  {
    href: "/profile",
    label: "./profile",
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  function isActiveLink(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="group">
          <p className="font-mono text-sm text-green-500">
            root@hacklinux:~$
          </p>

          <h1 className="text-xl font-bold text-green-300 group-hover:text-green-100 transition">
            HackLinux Academy
          </h1>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 font-mono text-sm">
          {links.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "border border-green-400 bg-green-400 text-black px-4 py-2 rounded-xl font-bold transition"
                    : "border border-green-500/30 text-green-300 px-4 py-2 rounded-xl hover:border-green-300 hover:text-green-100 transition"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
