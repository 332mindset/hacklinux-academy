import { lessons as beginnerLessons } from "./lessons";
import { practiceTasks as beginnerTasks } from "./tasks";
import type { Lesson } from "./lessons";
import type { PracticeTask } from "./tasks";

export type CourseLevel = "beginner" | "medium" | "advanced";

export type Course = {
  slug: CourseLevel;
  title: string;
  shortTitle: string;
  description: string;
  badge: string;
  lessons: Lesson[];
  tasks: PracticeTask[];
};

const mediumLessons: Lesson[] = [
  {
    id: 1,
    command: "filesystem",
    title: "Структура Linux-директорий",
    description:
      "В Linux всё начинается с корня файловой системы — /. От него идут основные системные папки: /home, /etc, /var, /usr, /tmp и другие.",
    syntax: "ls /",
    examples: [
      {
        command: "ls /",
        result: "bin  boot  dev  etc  home  tmp  usr  var",
        explanation: "Показывает папки в корне файловой системы.",
      },
      {
        command: "cd /etc",
        explanation: "Переход в директорию с конфигурационными файлами.",
      },
    ],
    notes: [
      "/ — корень всей файловой системы.",
      "/home — домашние папки пользователей.",
      "/etc — конфиги системы и программ.",
      "/var — изменяемые данные: логи, кэш, очереди.",
      "/tmp — временные файлы.",
    ],
  },
  {
    id: 2,
    command: "home",
    title: "Домашний каталог пользователя",
    description:
      "Домашний каталог — это личная папка пользователя. Обычно она находится по пути /home/username. Для быстрого перехода используется символ ~.",
    syntax: "cd ~",
    examples: [
      {
        command: "cd ~",
        explanation: "Перейти в домашнюю папку текущего пользователя.",
      },
      {
        command: "pwd",
        result: "/home/student",
        explanation: "Проверить текущий путь.",
      },
    ],
    notes: [
      "~ означает домашний каталог.",
      ". означает текущую папку.",
      ".. означает папку выше.",
      "Абсолютный путь начинается с /, например /home/student.",
    ],
  },
  {
    id: 3,
    command: "sudo",
    title: "sudo — выполнить команду с правами администратора",
    description:
      "sudo временно запускает команду с повышенными правами. Это нужно для действий, которые обычному пользователю запрещены.",
    syntax: "sudo [command]",
    examples: [
      {
        command: "sudo whoami",
        result: "root",
        explanation: "Команда выполнится от имени администратора root.",
      },
      {
        command: "sudo pacman -S nginx",
        explanation: "Пример установки пакета в Arch Linux.",
      },
    ],
    notes: [
      "root — главный администратор системы.",
      "sudo нужно использовать осторожно.",
      "Не вводи sudo перед командами, смысл которых не понимаешь.",
    ],
  },
  {
    id: 4,
    command: "users",
    title: "Пользователи и группы",
    description:
      "В Linux у каждого процесса и файла есть владелец. Пользователи могут входить в группы, а группы используются для выдачи прав.",
    syntax: "id",
    examples: [
      {
        command: "whoami",
        result: "student",
        explanation: "Показывает имя текущего пользователя.",
      },
      {
        command: "id",
        result:
          "uid=1000(student) gid=1000(student) groups=1000(student),998(wheel)",
        explanation: "Показывает UID, GID и группы пользователя.",
      },
      {
        command: "groups",
        result: "student wheel",
        explanation: "Показывает группы текущего пользователя.",
      },
    ],
    notes: [
      "UID — числовой ID пользователя.",
      "GID — числовой ID группы.",
      "Группа wheel часто используется для доступа к sudo.",
    ],
  },
  {
    id: 5,
    command: "chmod",
    title: "chmod — изменить права доступа",
    description:
      "chmod меняет права файла или папки. Права определяют, кто может читать, изменять или запускать файл.",
    syntax: "chmod [permissions] [file]",
    examples: [
      {
        command: "chmod 644 config.txt",
        explanation:
          "Владелец может читать и писать, остальные только читать.",
      },
      {
        command: "chmod +x script.sh",
        explanation: "Добавляет право запуска для скрипта.",
      },
    ],
    notes: [
      "r — read, чтение.",
      "w — write, запись.",
      "x — execute, выполнение.",
      "chmod +x часто используют для запуска shell-скриптов.",
    ],
  },
  {
    id: 6,
    command: "chown",
    title: "chown — изменить владельца файла",
    description:
      "chown меняет владельца и группу файла. Обычно для этого нужны права администратора.",
    syntax: "sudo chown [user]:[group] [file]",
    examples: [
      {
        command: "sudo chown root:root config.txt",
        explanation: "Делает root владельцем файла config.txt.",
      },
      {
        command: "sudo chown student:student note.txt",
        explanation: "Возвращает файл пользователю student.",
      },
    ],
    notes: [
      "chown часто требует sudo.",
      "Формат user:group означает владелец и группа.",
      "Не меняй владельца системных файлов без понимания.",
    ],
  },
  {
    id: 7,
    command: "find",
    title: "find — поиск файлов",
    description:
      "find ищет файлы и папки по имени, типу, размеру и другим параметрам.",
    syntax: "find [path] [conditions]",
    examples: [
      {
        command: 'find . -name "*.txt"',
        explanation: "Ищет все .txt файлы в текущей папке и ниже.",
      },
      {
        command: "find /etc -name nginx.conf",
        explanation: "Ищет файл nginx.conf внутри /etc.",
      },
    ],
    notes: [
      ". означает искать от текущей папки.",
      "-name ищет по имени.",
      "Шаблон *.txt означает все файлы с расширением .txt.",
    ],
  },
  {
    id: 8,
    command: "grep",
    title: "grep — поиск текста внутри файлов",
    description:
      "grep ищет строки, где встречается нужный текст. Это одна из самых полезных команд для логов и конфигов.",
    syntax: "grep [text] [file]",
    examples: [
      {
        command: 'grep "error" app.log',
        explanation: "Ищет строки со словом error в файле app.log.",
      },
      {
        command: "grep -i warning app.log",
        explanation: "Ищет warning без учёта регистра.",
      },
    ],
    notes: [
      "grep часто используют при анализе логов.",
      "-i игнорирует регистр букв.",
      "-n показывает номер строки.",
    ],
  },
  {
    id: 9,
    command: "pipes",
    title: "Пайпы и перенаправление",
    description:
      "Пайп | передаёт вывод одной команды на вход другой. Перенаправление > и >> записывает вывод в файл.",
    syntax: "command1 | command2",
    examples: [
      {
        command: 'cat app.log | grep "error"',
        explanation: "Вывод cat передаётся в grep для фильтрации.",
      },
      {
        command: "ls > files.txt",
        explanation: "Записывает вывод ls в файл files.txt.",
      },
      {
        command: "date >> log.txt",
        explanation: "Добавляет вывод date в конец файла log.txt.",
      },
    ],
    notes: [
      "| передаёт данные дальше.",
      "> перезаписывает файл.",
      ">> добавляет в конец файла.",
    ],
  },
  {
    id: 10,
    command: "processes",
    title: "Процессы: ps, top, kill",
    description:
      "Процесс — это запущенная программа. Linux позволяет смотреть процессы и завершать их.",
    syntax: "ps aux",
    examples: [
      {
        command: "ps aux",
        explanation: "Показывает список процессов.",
      },
      {
        command: "top",
        explanation: "Открывает интерактивный просмотр процессов.",
      },
      {
        command: "kill 1234",
        explanation: "Отправляет сигнал процессу с PID 1234.",
      },
    ],
    notes: [
      "PID — ID процесса.",
      "kill не всегда означает мгновенное убийство процесса, это отправка сигнала.",
      "top помогает понять, что грузит систему.",
    ],
  },
];

const mediumTasks: PracticeTask[] = [
  {
    id: 1,
    title: "Покажи корень системы",
    description:
      "Введи команду, которая показывает содержимое корневой папки /.",
    correctCommands: ["ls /"],
    successText: "Верно. ls / показывает верхний уровень файловой системы.",
    hint: "Используй ls и путь /.",
    fakeOutput: "bin  boot  dev  etc  home  tmp  usr  var",
  },
  {
    id: 2,
    title: "Перейди домой",
    description: "Перейди в домашний каталог пользователя через символ ~.",
    correctCommands: ["cd ~"],
    successText: "Верно. cd ~ переносит в домашнюю папку.",
    hint: "После cd используй символ тильды.",
    fakeOutput: "",
  },
  {
    id: 3,
    title: "Проверь sudo",
    description: "Выполни whoami через sudo.",
    correctCommands: ["sudo whoami"],
    successText: "Верно. Через sudo команда выполняется от имени root.",
    hint: "Нужно написать sudo перед whoami.",
    fakeOutput: "root",
  },
  {
    id: 4,
    title: "Покажи ID пользователя",
    description: "Введи команду, которая показывает UID, GID и группы.",
    correctCommands: ["id"],
    successText: "Верно. id показывает пользователя и группы.",
    hint: "Команда состоит из двух букв.",
    fakeOutput:
      "uid=1000(student) gid=1000(student) groups=1000(student),998(wheel)",
  },
  {
    id: 5,
    title: "Измени права файла",
    description: "Задай файлу config.txt права 644.",
    correctCommands: ["chmod 644 config.txt"],
    successText: "Верно. chmod 644 config.txt меняет права файла.",
    hint: "Используй chmod, затем 644, затем имя файла.",
    fakeOutput: "",
  },
  {
    id: 6,
    title: "Измени владельца файла",
    description: "Сделай root владельцем и группой файла config.txt.",
    correctCommands: ["sudo chown root:root config.txt"],
    successText: "Верно. chown меняет владельца и группу.",
    hint: "Нужны sudo, chown и root:root.",
    fakeOutput: "",
  },
  {
    id: 7,
    title: "Найди txt-файлы",
    description: "Найди все файлы .txt в текущей директории и ниже.",
    correctCommands: [
      'find . -name "*.txt"',
      "find . -name '*.txt'",
      "find . -name *.txt",
    ],
    successText: "Верно. find умеет искать файлы по шаблону имени.",
    hint: "Используй find . -name и шаблон *.txt.",
    fakeOutput: "./notes.txt\n./logs/report.txt",
  },
  {
    id: 8,
    title: "Найди error в логе",
    description: "Найди слово error в файле app.log.",
    correctCommands: [
      'grep "error" app.log',
      "grep error app.log",
      "grep 'error' app.log",
    ],
    successText: "Верно. grep нашёл строки с error.",
    hint: "Используй grep, слово error и файл app.log.",
    fakeOutput: "2026-06-28 14:21:04 error connection refused",
  },
  {
    id: 9,
    title: "Используй пайп",
    description: "Передай вывод cat app.log в grep для поиска error.",
    correctCommands: [
      'cat app.log | grep "error"',
      "cat app.log | grep error",
      "cat app.log | grep 'error'",
    ],
    successText: "Верно. Пайп передал вывод одной команды другой.",
    hint: "Между командами нужен символ |.",
    fakeOutput: "2026-06-28 14:21:04 error connection refused",
  },
  {
    id: 10,
    title: "Покажи процессы",
    description: "Введи команду, которая показывает список процессов.",
    correctCommands: ["ps aux"],
    successText: "Верно. ps aux показывает процессы.",
    hint: "Команда состоит из ps и флагов aux.",
    fakeOutput:
      "USER       PID %CPU %MEM COMMAND\nstudent   120  0.1  1.2 bash\nstudent   245  3.4  8.1 node",
  },
];

const advancedLessons: Lesson[] = [
  {
    id: 1,
    command: "packages",
    title: "Пакетные менеджеры",
    description:
      "Пакетный менеджер устанавливает, обновляет и удаляет программы. В Arch Linux используется pacman, в Debian/Ubuntu — apt.",
    syntax: "sudo pacman -S [package]",
    examples: [
      {
        command: "sudo pacman -S nginx",
        explanation: "Установить nginx в Arch Linux.",
      },
      {
        command: "pacman -Q",
        explanation: "Показать установленные пакеты.",
      },
    ],
    notes: [
      "В разных дистрибутивах разные пакетные менеджеры.",
      "В Arch Linux основной менеджер — pacman.",
      "Установка пакетов обычно требует sudo.",
    ],
  },
  {
    id: 2,
    command: "systemd",
    title: "systemd и службы",
    description:
      "systemd управляет службами системы. Через systemctl можно запускать, останавливать и включать автозапуск сервисов.",
    syntax: "systemctl [action] [service]",
    examples: [
      {
        command: "systemctl status sshd",
        explanation: "Показать статус службы sshd.",
      },
      {
        command: "sudo systemctl enable nginx",
        explanation: "Включить автозапуск nginx.",
      },
    ],
    notes: [
      "service — это фоновая служба.",
      "status показывает состояние.",
      "enable включает автозапуск при старте системы.",
    ],
  },
  {
    id: 3,
    command: "journalctl",
    title: "Логи через journalctl",
    description:
      "journalctl показывает системные логи. Это полезно, когда нужно понять, почему сервис не запускается.",
    syntax: "journalctl [options]",
    examples: [
      {
        command: "journalctl -xe",
        explanation: "Показать последние важные системные сообщения.",
      },
      {
        command: "journalctl -u nginx",
        explanation: "Показать логи службы nginx.",
      },
    ],
    notes: [
      "-u фильтрует логи по сервису.",
      "-f показывает логи в реальном времени.",
      "Логи помогают искать причину ошибок.",
    ],
  },
  {
    id: 4,
    command: "network",
    title: "Сетевые команды",
    description:
      "Linux позволяет смотреть IP-адреса, проверять доступность узлов и открытые порты.",
    syntax: "ip addr",
    examples: [
      {
        command: "ip addr",
        explanation: "Показать сетевые интерфейсы и IP-адреса.",
      },
      {
        command: "ping 8.8.8.8",
        explanation: "Проверить доступность узла.",
      },
      {
        command: "ss -tulpn",
        explanation: "Показать открытые TCP/UDP-порты.",
      },
    ],
    notes: [
      "ip addr показывает адреса интерфейсов.",
      "ping проверяет связность.",
      "ss помогает смотреть сетевые подключения.",
    ],
  },
  {
    id: 5,
    command: "ssh",
    title: "SSH — удалённый доступ",
    description:
      "SSH позволяет подключаться к удалённому Linux-серверу через терминал.",
    syntax: "ssh user@host",
    examples: [
      {
        command: "ssh admin@192.168.1.10",
        explanation: "Подключиться к серверу по SSH.",
      },
      {
        command: "scp file.txt admin@server:/home/admin/",
        explanation: "Скопировать файл на сервер.",
      },
    ],
    notes: [
      "SSH нужен администраторам и DevOps-инженерам.",
      "Не подключайся к чужим серверам без разрешения.",
      "scp копирует файлы поверх SSH.",
    ],
  },
  {
    id: 6,
    command: "tar",
    title: "Архивы и бэкапы",
    description:
      "tar часто используют для упаковки папок в архивы. С gzip получается файл .tar.gz.",
    syntax: "tar -czf archive.tar.gz folder",
    examples: [
      {
        command: "tar -czf backup.tar.gz projects",
        explanation: "Создать архив папки projects.",
      },
      {
        command: "tar -xzf backup.tar.gz",
        explanation: "Распаковать архив.",
      },
    ],
    notes: [
      "c — create, создать архив.",
      "x — extract, распаковать.",
      "z — использовать gzip.",
      "f — указать имя файла архива.",
    ],
  },
  {
    id: 7,
    command: "cron",
    title: "cron — задачи по расписанию",
    description:
      "cron запускает команды по расписанию. Его используют для регулярных бэкапов, очистки и автоматизации.",
    syntax: "crontab -e",
    examples: [
      {
        command: "crontab -e",
        explanation: "Открыть расписание cron текущего пользователя.",
      },
      {
        command: "crontab -l",
        explanation: "Показать текущие cron-задачи.",
      },
    ],
    notes: [
      "cron полезен для автоматизации.",
      "Неправильная cron-задача может регулярно ломать систему.",
      "Перед автоматизацией проверь команду вручную.",
    ],
  },
  {
    id: 8,
    command: "env",
    title: "Переменные окружения",
    description:
      "Переменные окружения хранят настройки shell и программ. Например, PATH говорит системе, где искать команды.",
    syntax: "echo $PATH",
    examples: [
      {
        command: "echo $PATH",
        explanation:
          "Показать список директорий, где shell ищет команды.",
      },
      {
        command: "export APP_ENV=production",
        explanation: "Создать переменную окружения APP_ENV.",
      },
    ],
    notes: [
      "$PATH — одна из важнейших переменных.",
      "export делает переменную доступной дочерним процессам.",
      "Переменные часто используют в серверах и деплое.",
    ],
  },
  {
    id: 9,
    command: "bash",
    title: "Bash-скрипты",
    description:
      "Bash-скрипт — это файл с набором команд. Он позволяет автоматизировать повторяющиеся действия.",
    syntax: "./script.sh",
    examples: [
      {
        command: "chmod +x deploy.sh",
        explanation: "Дать скрипту право на запуск.",
      },
      {
        command: "./deploy.sh",
        explanation: "Запустить скрипт из текущей папки.",
      },
    ],
    notes: [
      "Скрипты обычно имеют расширение .sh.",
      "Перед запуском чужого скрипта прочитай его содержимое.",
      "chmod +x нужен, чтобы файл можно было выполнить.",
    ],
  },
  {
    id: 10,
    command: "disk",
    title: "Диски и место",
    description:
      "Команды df, du и lsblk помогают понять, сколько места занято и какие диски подключены.",
    syntax: "df -h",
    examples: [
      {
        command: "df -h",
        explanation: "Показать свободное место на файловых системах.",
      },
      {
        command: "du -sh projects",
        explanation: "Показать размер папки projects.",
      },
      {
        command: "lsblk",
        explanation: "Показать блочные устройства и диски.",
      },
    ],
    notes: [
      "df показывает файловые системы.",
      "du показывает размер файлов и папок.",
      "lsblk показывает диски и разделы.",
    ],
  },
];

const advancedTasks: PracticeTask[] = [
  {
    id: 1,
    title: "Покажи установленные пакеты",
    description:
      "Введи команду pacman, которая показывает установленные пакеты.",
    correctCommands: ["pacman -Q"],
    successText: "Верно. pacman -Q показывает установленные пакеты.",
    hint: "В Arch Linux используй pacman с флагом -Q.",
    fakeOutput: "bash 5.3\nlinux 6.x\nnodejs 26.x",
  },
  {
    id: 2,
    title: "Проверь статус SSH",
    description: "Покажи статус службы sshd через systemctl.",
    correctCommands: ["systemctl status sshd"],
    successText: "Верно. systemctl status показывает состояние службы.",
    hint: "Команда начинается с systemctl status.",
    fakeOutput: "● sshd.service - OpenSSH Daemon\n   Active: active (running)",
  },
  {
    id: 3,
    title: "Покажи последние системные логи",
    description: "Введи команду journalctl для последних важных сообщений.",
    correctCommands: ["journalctl -xe"],
    successText:
      "Верно. journalctl -xe показывает последние системные события.",
    hint: "Нужна команда journalctl с флагом -xe.",
    fakeOutput:
      "Jun 28 kernel: network interface ready\nJun 28 systemd: Started sshd.service",
  },
  {
    id: 4,
    title: "Покажи сетевые адреса",
    description: "Введи команду, которая показывает IP-адреса интерфейсов.",
    correctCommands: ["ip addr"],
    successText: "Верно. ip addr показывает сетевые интерфейсы.",
    hint: "Команда состоит из ip и addr.",
    fakeOutput: "1: lo: inet 127.0.0.1/8\n2: eth0: inet 192.168.1.50/24",
  },
  {
    id: 5,
    title: "Подключись по SSH",
    description: "Напиши команду подключения к серверу admin@192.168.1.10.",
    correctCommands: ["ssh admin@192.168.1.10"],
    successText: "Верно. SSH используется для удалённого подключения.",
    hint: "Формат: ssh user@host.",
    fakeOutput: "admin@192.168.1.10's password:",
  },
  {
    id: 6,
    title: "Создай архив",
    description: "Создай архив backup.tar.gz из папки projects.",
    correctCommands: ["tar -czf backup.tar.gz projects"],
    successText: "Верно. tar создал архив.",
    hint: "Используй tar -czf, затем имя архива и папку.",
    fakeOutput: "",
  },
  {
    id: 7,
    title: "Открой cron",
    description: "Введи команду для редактирования cron-задач.",
    correctCommands: ["crontab -e"],
    successText: "Верно. crontab -e открывает расписание задач.",
    hint: "Команда начинается с crontab.",
    fakeOutput: "# Edit this file to introduce tasks to be run by cron.",
  },
  {
    id: 8,
    title: "Покажи PATH",
    description: "Выведи переменную окружения PATH.",
    correctCommands: ["echo $PATH"],
    successText: "Верно. PATH показывает, где shell ищет команды.",
    hint: "Используй echo и переменную $PATH.",
    fakeOutput: "/usr/local/bin:/usr/bin:/bin:/home/student/.local/bin",
  },
  {
    id: 9,
    title: "Сделай скрипт исполняемым",
    description: "Добавь право запуска файлу deploy.sh.",
    correctCommands: ["chmod +x deploy.sh"],
    successText: "Верно. chmod +x делает скрипт исполняемым.",
    hint: "Используй chmod +x.",
    fakeOutput: "",
  },
  {
    id: 10,
    title: "Покажи свободное место",
    description:
      "Введи команду, которая показывает место на дисках в удобном виде.",
    correctCommands: ["df -h"],
    successText: "Верно. df -h показывает место на файловых системах.",
    hint: "Используй df с флагом -h.",
    fakeOutput: "Filesystem      Size  Used Avail Use%\n/dev/sda1        50G   18G   30G  38%",
  },
];

export const courses: Record<CourseLevel, Course> = {
  beginner: {
    slug: "beginner",
    title: "Уровень новичка",
    shortTitle: "Новичок",
    badge: "BASIC ACCESS",
    description:
      "Базовые команды Linux: pwd, ls, cd, mkdir, touch, cat, cp, mv, rm.",
    lessons: beginnerLessons,
    tasks: beginnerTasks,
  },
  medium: {
    slug: "medium",
    title: "Средний уровень",
    shortTitle: "Средний",
    badge: "OPERATOR ACCESS",
    description:
      "Структура Linux, домашний каталог, sudo, пользователи, права, поиск, grep, пайпы и процессы.",
    lessons: mediumLessons,
    tasks: mediumTasks,
  },
  advanced: {
    slug: "advanced",
    title: "Высокий уровень",
    shortTitle: "Высокий",
    badge: "ROOT ACCESS",
    description:
      "Администрирование Linux: пакеты, systemd, логи, сеть, SSH, архивы, cron, переменные окружения и bash.",
    lessons: advancedLessons,
    tasks: advancedTasks,
  },
};

export const courseList = [
  courses.beginner,
  courses.medium,
  courses.advanced,
];

export function getCourse(level: string) {
  return courses[level as CourseLevel] ?? null;
}
