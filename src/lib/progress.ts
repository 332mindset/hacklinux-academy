import type { CourseLevel } from "@/data/courses";

const COMPLETED_LEVELS_KEY = "hacklinux.completedLevels";
const COURSE_PROGRESS_KEY = "hacklinux.courseProgress";

function notifyProgressUpdated() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event("hacklinux-progress-updated"));
}

export function getCompletedLevels(): CourseLevel[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(COMPLETED_LEVELS_KEY);

    if (!rawValue) {
      return [];
    }

    return JSON.parse(rawValue) as CourseLevel[];
  } catch {
    return [];
  }
}

export function isCourseCompleted(level: CourseLevel) {
  return getCompletedLevels().includes(level);
}

export function setCompletedLevel(level: CourseLevel) {
  if (typeof window === "undefined") {
    return;
  }

  const completedLevels = getCompletedLevels();

  if (!completedLevels.includes(level)) {
    const nextCompletedLevels = [...completedLevels, level];

    window.localStorage.setItem(
      COMPLETED_LEVELS_KEY,
      JSON.stringify(nextCompletedLevels),
    );
  }

  notifyProgressUpdated();
}

export function removeCompletedLevel(level: CourseLevel) {
  if (typeof window === "undefined") {
    return;
  }

  const nextCompletedLevels = getCompletedLevels().filter(
    (completedLevel) => completedLevel !== level,
  );

  window.localStorage.setItem(
    COMPLETED_LEVELS_KEY,
    JSON.stringify(nextCompletedLevels),
  );

  notifyProgressUpdated();
}

export function getCourseProgress(level: CourseLevel) {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const rawValue = window.localStorage.getItem(COURSE_PROGRESS_KEY);

    if (!rawValue) {
      return 0;
    }

    const progress = JSON.parse(rawValue) as Record<string, number>;

    return progress[level] ?? 0;
  } catch {
    return 0;
  }
}

export function setCourseProgress(level: CourseLevel, taskIndex: number) {
  if (typeof window === "undefined") {
    return;
  }

  let progress: Record<string, number> = {};

  try {
    const rawValue = window.localStorage.getItem(COURSE_PROGRESS_KEY);
    progress = rawValue ? JSON.parse(rawValue) : {};
  } catch {
    progress = {};
  }

  progress[level] = taskIndex;

  window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));

  notifyProgressUpdated();
}

export function resetCourseProgress(level: CourseLevel) {
  if (typeof window === "undefined") {
    return;
  }

  let progress: Record<string, number> = {};

  try {
    const rawValue = window.localStorage.getItem(COURSE_PROGRESS_KEY);
    progress = rawValue ? JSON.parse(rawValue) : {};
  } catch {
    progress = {};
  }

  delete progress[level];

  window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));

  notifyProgressUpdated();
}

export function resetAllProgress() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(COMPLETED_LEVELS_KEY);
  window.localStorage.removeItem(COURSE_PROGRESS_KEY);

  notifyProgressUpdated();
}

export function getPreviousLevel(level: CourseLevel): CourseLevel | null {
  if (level === "beginner") {
    return null;
  }

  if (level === "medium") {
    return "beginner";
  }

  if (level === "advanced") {
    return "medium";
  }

  return null;
}

export function getNextLevel(level: CourseLevel): CourseLevel | null {
  if (level === "beginner") {
    return "medium";
  }

  if (level === "medium") {
    return "advanced";
  }

  if (level === "advanced") {
    return null;
  }

  return null;
}

export function isCourseUnlocked(level: CourseLevel) {
  const previousLevel = getPreviousLevel(level);

  if (!previousLevel) {
    return true;
  }

  return isCourseCompleted(previousLevel);
}
