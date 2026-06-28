export type PracticeTask = {
  id: number;
  title: string;
  description: string;
  correctCommands: string[];
  successText: string;
  hint: string;
  fakeOutput?: string;
};

export const practiceTasks: PracticeTask[] = [
  {
    id: 1,
    title: "Определи текущую директорию",
    description: "Введи команду, которая показывает, где ты сейчас находишься.",
    correctCommands: ["pwd"],
    successText: "Верно. pwd показывает текущую директорию.",
    hint: "Команда состоит из трёх букв: p w d.",
    fakeOutput: "/home/student",
  },
  {
    id: 2,
    title: "Посмотри список файлов",
    description: "Введи команду, которая показывает файлы и папки.",
    correctCommands: ["ls"],
    successText: "Отлично. ls показывает содержимое текущей папки.",
    hint: "Команда короткая: l s.",
    fakeOutput: "documents  downloads  readme.txt",
  },
  {
    id: 3,
    title: "Покажи скрытые файлы",
    description:
      "Введи команду ls с флагами, чтобы увидеть скрытые файлы и подробности.",
    correctCommands: ["ls -la", "ls -al"],
    successText:
      "Верно. ls -la показывает скрытые файлы и подробную информацию.",
    hint: "Нужны флаги -l и -a. Можно написать ls -la.",
    fakeOutput:
      "drwxr-xr-x student student 4096 .\ndrwxr-xr-x root    root    4096 ..\n-rw-r--r-- student student  220 .bashrc\ndrwxr-xr-x student student 4096 documents\n-rw-r--r-- student student   16 readme.txt",
  },
  {
    id: 4,
    title: "Перейди в папку documents",
    description: "Используй cd, чтобы перейти в папку documents.",
    correctCommands: ["cd documents"],
    successText: "Отлично. Ты перешёл в папку documents.",
    hint: "Команда начинается с cd, потом название папки.",
    fakeOutput: "",
  },
  {
    id: 5,
    title: "Вернись на папку выше",
    description: "Используй команду, которая возвращает на один уровень выше.",
    correctCommands: ["cd .."],
    successText: "Верно. cd .. возвращает на одну папку назад.",
    hint: "После cd нужны две точки.",
    fakeOutput: "",
  },
  {
    id: 6,
    title: "Создай папку projects",
    description: "Создай новую папку с названием projects.",
    correctCommands: ["mkdir projects"],
    successText: "Готово. mkdir projects создаёт папку projects.",
    hint: "Команда для создания папки — mkdir.",
    fakeOutput: "",
  },
  {
    id: 7,
    title: "Создай файл note.txt",
    description: "Создай пустой файл note.txt.",
    correctCommands: ["touch note.txt"],
    successText: "Верно. touch note.txt создаёт пустой файл.",
    hint: "Команда для создания файла — touch.",
    fakeOutput: "",
  },
  {
    id: 8,
    title: "Посмотри файл readme.txt",
    description: "Выведи содержимое файла readme.txt в терминал.",
    correctCommands: ["cat readme.txt"],
    successText: "Отлично. cat readme.txt показывает содержимое файла.",
    hint: "Команда для просмотра файла — cat.",
    fakeOutput: "Welcome to HackLinux Academy",
  },
  {
    id: 9,
    title: "Переименуй note.txt",
    description: "Переименуй note.txt в todo.txt.",
    correctCommands: ["mv note.txt todo.txt"],
    successText: "Верно. mv может переименовывать файлы.",
    hint: "Используй mv: сначала старое имя, потом новое.",
    fakeOutput: "",
  },
  {
    id: 10,
    title: "Удали todo.txt",
    description: "Удали файл todo.txt.",
    correctCommands: ["rm todo.txt"],
    successText: "Верно. rm удаляет файл.",
    hint: "Команда удаления — rm.",
    fakeOutput: "",
  },
];
