import { exercises, weeklyPattern } from './exercises';

/*
  Calendar data generator.
  Builds a map of dates (YYYY-MM-DD) to workout info for June & July 2026.
  Each entry is either { type: 'rest' } or { type: 'workout', category, exercises: [...] }
*/

// Helper: get the day-of-week name from a Date object
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getDayName(date) {
  return DAY_NAMES[date.getDay()];
}

// Format date as YYYY-MM-DD (the "key" for each day)
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Build the full calendar for June & July 2026
function buildCalendar() {
  const calendar = {};

  // June 2026: days 1–30
  // July 2026: days 1–31
  const months = [
    { year: 2026, month: 5 }, // June (0-indexed month)
    { year: 2026, month: 6 }, // July
  ];

  for (const { year, month } of months) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = formatDate(date);
      const dayName = getDayName(date);
      const pattern = weeklyPattern[dayName];

      if (!pattern) {
        // Rest day
        calendar[dateKey] = { type: 'rest' };
      } else {
        // Workout day — resolve exercise IDs to full objects
        calendar[dateKey] = {
          type: 'workout',
          category: pattern.category,
          exercises: pattern.exercises.map(id => exercises[id]),
        };
      }
    }
  }

  return calendar;
}

export const calendar = buildCalendar();

/*
  Helper: get all days for a specific month as an array of { date, dateKey, ...calendarEntry }
  month is 0-indexed (5 = June, 6 = July)
*/
export function getMonthDays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = formatDate(date);
    days.push({
      date,
      dateKey,
      dayOfMonth: day,
      dayOfWeek: date.getDay(), // 0=Sun, 1=Mon, ..., 6=Sat
      ...calendar[dateKey],
    });
  }

  return days;
}

/*
  Helper: get the first day of the month's weekday (for padding the calendar grid).
  Returns 0=Mon, 1=Tue, ..., 6=Sun (ISO week, so Monday is first column)
*/
export function getFirstDayOffset(year, month) {
  const day = new Date(year, month, 1).getDay(); // 0=Sun
  // Convert to Mon=0, Tue=1, ..., Sun=6
  return day === 0 ? 6 : day - 1;
}
