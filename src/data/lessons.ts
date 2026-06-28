export type Lesson = {
  id: number;
  command: string;
  title: string;
  description: string;
  syntax: string;
  examples: {
    command: string;
    result?: string;
    explanation: string;
  }[];
  notes?: string[];
};

export const lessons: Lesson[] = [
  {
    id: 1,
    command: "terminal",
    title: "Что такое терминал",
    description:
      "Терминал — это текстовый способ управлять Linux. Ты вводишь команды, а система выполняет их и возвращает результат.",
    syntax: "command [options] [arguments]",
    examples: [
      {
        command: "whoami",
        result: "student",
        explanation: "Показывает имя текущего пользователя.",
      },
      {
        command: "clear",
        explanation: "Очищает экран терминала.",
      },
    ],
    notes: [
      "Команда — это действие, которое ты просишь выполнить.",
      "Флаги обычно начинаются с дефиса, например -l или -a.",
      "Аргументы — это то, с чем команда работает: файл, папка, текст.",
    ],
  },
  {
    id: 2,
    command: "pwd",
    title: "pwd — где я нахожусь",
    description:
      "Команда pwd показывает полный путь к папке, в которой ты сейчас находишься.",
    syntax: "pwd",
    examples: [
      {
        command: "pwd",
        result: "/home/student",
        explanation: "Показывает текущую директорию.",
      },
    ],
    notes: [
      "pwd расшифровывается как print working directory.",
      "Это одна из первых команд, которую полезно знать новичку.",
    ],
  },
  {
    id: 3,
    command: "ls",
    title: "ls — посмотреть файлы",
    description:
      "Команда ls показывает файлы и папки в текущей директории. У неё есть полезные флаги.",
    syntax: "ls [flags] [path]",
    examples: [
      {
        command: "ls",
        result: "documents  downloads  readme.txt",
        explanation: "Показывает обычный список файлов и папок.",
      },
      {
        command: "ls -l",
        explanation:
          "Показывает подробный список: права, владельца, размер и дату.",
      },
      {
        command: "ls -a",
        explanation: "Показывает скрытые файлы. Они обычно начинаются с точки.",
      },
      {
        command: "ls -la",
        explanation:
          "Комбинация флагов -l и -a: подробный список плюс скрытые файлы.",
      },
    ],
    notes: [
      "Флаги можно объединять: ls -l -a и ls -la часто дают одинаковую идею.",
      "Скрытые файлы в Linux начинаются с точки: .config, .bashrc, .git.",
    ],
  },
  {
    id: 4,
    command: "cd",
    title: "cd — переход между папками",
    description:
      "Команда cd меняет текущую директорию. С её помощью ты перемещаешься по файловой системе.",
    syntax: "cd [path]",
    examples: [
      {
        command: "cd documents",
        explanation: "Перейти в папку documents.",
      },
      {
        command: "cd ..",
        explanation: "Вернуться на одну папку выше.",
      },
      {
        command: "cd ~",
        explanation: "Перейти в домашнюю папку пользователя.",
      },
    ],
    notes: [
      ". означает текущую папку.",
      ".. означает папку уровнем выше.",
      "~ означает домашнюю папку пользователя.",
    ],
  },
  {
    id: 5,
    command: "mkdir",
    title: "mkdir — создать папку",
    description: "Команда mkdir создаёт новую директорию, то есть папку.",
    syntax: "mkdir [folder_name]",
    examples: [
      {
        command: "mkdir projects",
        explanation: "Создаёт папку projects в текущей директории.",
      },
      {
        command: "mkdir -p projects/linux/basics",
        explanation:
          "Создаёт вложенные папки сразу. Флаг -p не ругается, если часть пути уже существует.",
      },
    ],
    notes: [
      "mkdir расшифровывается как make directory.",
      "Флаг -p часто используют для создания вложенной структуры папок.",
    ],
  },
  {
    id: 6,
    command: "touch",
    title: "touch — создать файл",
    description:
      "Команда touch создаёт пустой файл. Если файл уже есть, она обновляет дату изменения файла.",
    syntax: "touch [file_name]",
    examples: [
      {
        command: "touch note.txt",
        explanation: "Создаёт пустой файл note.txt.",
      },
      {
        command: "touch index.html",
        explanation: "Создаёт файл index.html.",
      },
    ],
    notes: [
      "touch часто используют, когда нужно быстро создать пустой файл.",
      "Расширение файла — это часть имени: .txt, .html, .js, .ts.",
    ],
  },
  {
    id: 7,
    command: "cat",
    title: "cat — посмотреть содержимое файла",
    description: "Команда cat выводит содержимое файла прямо в терминал.",
    syntax: "cat [file_name]",
    examples: [
      {
        command: "cat readme.txt",
        result: "Welcome to Linux",
        explanation: "Показывает содержимое файла readme.txt.",
      },
      {
        command: "cat notes.txt",
        explanation: "Выводит текст из файла notes.txt.",
      },
    ],
    notes: [
      "cat удобно использовать для коротких текстовых файлов.",
      "Для больших файлов позже лучше изучить less, head и tail.",
    ],
  },
  {
    id: 8,
    command: "cp",
    title: "cp — копировать",
    description: "Команда cp копирует файлы и папки.",
    syntax: "cp [source] [destination]",
    examples: [
      {
        command: "cp note.txt backup.txt",
        explanation: "Копирует note.txt в новый файл backup.txt.",
      },
      {
        command: "cp -r project project_backup",
        explanation: "Копирует папку project вместе со всем содержимым.",
      },
    ],
    notes: [
      "source — откуда копируем.",
      "destination — куда копируем.",
      "Для папок часто нужен флаг -r.",
    ],
  },
  {
    id: 9,
    command: "mv",
    title: "mv — переместить или переименовать",
    description:
      "Команда mv перемещает файлы и папки. Её же используют для переименования.",
    syntax: "mv [source] [destination]",
    examples: [
      {
        command: "mv note.txt todo.txt",
        explanation: "Переименовывает note.txt в todo.txt.",
      },
      {
        command: "mv todo.txt documents/",
        explanation: "Перемещает todo.txt в папку documents.",
      },
    ],
    notes: [
      "Если destination — новое имя, файл переименуется.",
      "Если destination — папка, файл переместится в неё.",
    ],
  },
  {
    id: 10,
    command: "rm",
    title: "rm — удалить",
    description:
      "Команда rm удаляет файлы. С ней нужно быть осторожным, потому что в терминале удаление часто необратимо.",
    syntax: "rm [file_name]",
    examples: [
      {
        command: "rm todo.txt",
        explanation: "Удаляет файл todo.txt.",
      },
      {
        command: "rm -r old_project",
        explanation: "Удаляет папку old_project и всё внутри неё.",
      },
    ],
    notes: [
      "rm — опасная команда, особенно с флагом -r.",
      "Никогда не копируй команды удаления из интернета, если не понимаешь их.",
      "В нашем тренажёре rm будет безопасной симуляцией.",
    ],
  },
];
