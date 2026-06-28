"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { getCourse } from "@/data/courses";

type TerminalLine = {
  id: number;
  text: string;
  type: "command" | "success" | "error" | "system" | "output";
};

type TerminalSimulatorProps = {
  level?: string;
};

export function TerminalSimulator({
  level = "beginner",
}: TerminalSimulatorProps) {
  const course = getCourse(level) ?? getCourse("beginner");
  const tasks = course?.tasks ?? [];

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      text: "Mission Mode загружен. Выполняй задания по очереди.",
      type: "system",
    },
    {
      id: 2,
      text: "Подсказка: команды вводятся без символа $ в начале.",
      type: "system",
    },
    {
      id: 3,
      text: "Служебные команды: help, clear.",
      type: "system",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const isFinished = currentTaskIndex >= tasks.length;
  const currentTask = isFinished ? null : tasks[currentTaskIndex];

  const progress = useMemo(() => {
    if (tasks.length === 0) {
      return 0;
    }

    return Math.round((currentTaskIndex / tasks.length) * 100);
  }, [currentTaskIndex, tasks.length]);

  function normalizeCommand(command: string) {
    return command.trim().replace(/\s+/g, " ").toLowerCase();
  }

  function addLine(text: string, type: TerminalLine["type"]) {
    setLines((previousLines) => [
      ...previousLines,
      {
        id: Date.now() + Math.random(),
        text,
        type,
      },
    ]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentTask || isFinished) {
      return;
    }

    const cleanInput = input.trim();

    if (!cleanInput) {
      return;
    }

    const userCommand = normalizeCommand(cleanInput);
    const correctCommands = currentTask.correctCommands.map(normalizeCommand);

    addLine(`student@hacklinux:~$ ${cleanInput}`, "command");

    if (userCommand === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (userCommand === "help") {
      addLine("Доступные служебные команды: help, clear", "system");
      setInput("");
      return;
    }

    if (correctCommands.includes(userCommand)) {
      if (currentTask.fakeOutput) {
        addLine(currentTask.fakeOutput, "output");
      }

      addLine(`✅ ${currentTask.successText}`, "success");

      const nextTaskIndex = currentTaskIndex + 1;
      setCurrentTaskIndex(nextTaskIndex);

      if (nextTaskIndex >= tasks.length) {
        addLine("ACCESS GRANTED. Курс завершён.", "success");
      } else {
        addLine("Следующее задание загружено...", "system");
      }
    } else {
      addLine(`❌ Неверно. Подсказка: ${currentTask.hint}`, "error");
    }

    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      <aside className="border border-green-500/30 rounded-2xl p-6 bg-zinc-950/90 shadow-[0_0_30px_rgba(34,197,94,0.12)]">
        <p className="text-sm text-green-300 mb-2 font-mono">
          MISSION STATUS
        </p>

        <div className="w-full bg-green-950 rounded-full h-3 mb-6 overflow-hidden border border-green-500/20">
          <div
            className="bg-green-400 h-full transition-all shadow-[0_0_18px_rgba(34,197,94,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!isFinished && currentTask ? (
          <>
            <p className="text-sm text-green-300 mb-2 font-mono">
              Задание {currentTask.id} / {tasks.length}
            </p>

            <h2 className="text-2xl font-bold mb-4">{currentTask.title}</h2>

            <p className="text-green-100 leading-7 mb-6">
              {currentTask.description}
            </p>

            <div className="border border-green-500/20 rounded-xl p-4 bg-black text-sm text-green-200 font-mono">
              input_required: true
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-green-300 mb-2 font-mono">
              mission_complete
            </p>

            <h2 className="text-3xl font-bold mb-4">ACCESS GRANTED</h2>

            <p className="text-green-100 leading-7 mb-6">
              Ты прошёл этот уровень. Можно вернуться к выбору уровней или
              пройти другой курс.
            </p>

            <a
              href="/learn"
              className="inline-flex border border-green-400 bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
            >
              К уровням
            </a>
          </>
        )}
      </aside>

      <section className="border border-green-500/40 rounded-2xl bg-black shadow-[0_0_35px_rgba(34,197,94,0.18)] overflow-hidden">
        <div className="border-b border-green-500/30 px-5 py-3 flex items-center gap-2 bg-zinc-950">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />

          <span className="ml-3 text-sm text-green-200 font-mono">
            terminal — hacklinux.local
          </span>
        </div>

        <div
          className="p-5 h-[560px] overflow-y-auto font-mono text-sm md:text-base"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-2 whitespace-pre-wrap">
            {lines.map((line) => (
              <p
                key={line.id}
                className={
                  line.type === "success"
                    ? "text-green-300"
                    : line.type === "error"
                      ? "text-red-400"
                      : line.type === "system"
                        ? "text-cyan-300"
                        : line.type === "output"
                          ? "text-green-100"
                          : "text-green-200"
                }
              >
                {line.text}
              </p>
            ))}
          </div>

          {!isFinished && (
            <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
              <span className="text-green-400 shrink-0">
                student@hacklinux:~$
              </span>

              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-none text-green-100 caret-green-400 min-w-0"
                placeholder="введи команду..."
              />
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
