import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMonthDays, getFirstDayOffset, formatDate } from '../data/calendar';

/*
  CalendarView — the default screen.
  Shows a month grid (Mon–Sun columns) with navigation between June & July 2026.
  Each day cell shows a colour-coded dot and exercise preview.
  Think of this like a "list endpoint" — it shows an overview and links to detail pages.
*/

const MONTHS = [
  { year: 2026, month: 5, label: 'June 2026' },
  { year: 2026, month: 6, label: 'July 2026' },
];

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarView() {
  // Track which month tab is active (0 = June, 1 = July)
  const [monthIndex, setMonthIndex] = useState(() => {
    // Default to current month if it's June or July 2026, otherwise June
    const now = new Date();
    if (now.getFullYear() === 2026 && now.getMonth() === 6) return 1;
    return 0;
  });

  const navigate = useNavigate();
  const { year, month, label } = MONTHS[monthIndex];
  const days = getMonthDays(year, month);
  const firstDayOffset = getFirstDayOffset(year, month);

  // Today's date key for highlighting
  const todayKey = formatDate(new Date());

  function handleDayClick(day) {
    if (day.type === 'workout') {
      navigate(`/day/${day.dateKey}`);
    }
  }

  return (
    <div className="view-enter max-w-lg mx-auto px-4 py-6">
      {/* Header with month title and navigation arrows */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMonthIndex(0)}
          disabled={monthIndex === 0}
          className="p-2 rounded-lg disabled:opacity-30 hover:bg-slate-100 active:bg-slate-200 transition-colors"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <h1 className="text-xl font-bold text-slate-800">{label}</h1>

        <button
          onClick={() => setMonthIndex(1)}
          disabled={monthIndex === 1}
          className="p-2 rounded-lg disabled:opacity-30 hover:bg-slate-100 active:bg-slate-200 transition-colors"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </header>

      {/* Weekday column headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAY_LABELS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid — 7 columns, variable rows */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the 1st of the month */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {days.map(day => {
          const isToday = day.dateKey === todayKey;
          const isWorkout = day.type === 'workout';
          const isGreen = isWorkout && day.category === 'green';
          const isBlue = isWorkout && day.category === 'blue';

          return (
            <button
              key={day.dateKey}
              onClick={() => handleDayClick(day)}
              disabled={!isWorkout}
              aria-label={`${day.dayOfMonth} ${label}${isWorkout ? `, ${day.category} workout` : ', rest day'}`}
              className={`
                relative aspect-square rounded-lg p-1 flex flex-col items-center justify-start
                text-sm transition-all duration-150
                ${isToday ? 'ring-2 ring-slate-800 ring-offset-1' : ''}
                ${isWorkout ? 'cursor-pointer hover:scale-105 hover:shadow-md active:scale-95' : 'cursor-default'}
                ${isGreen ? 'bg-green-50 hover:bg-green-100' : ''}
                ${isBlue ? 'bg-blue-50 hover:bg-blue-100' : ''}
                ${!isWorkout ? 'bg-slate-50' : ''}
              `}
            >
              {/* Day number */}
              <span className={`text-xs font-semibold ${isToday ? 'text-slate-900' : 'text-slate-600'}`}>
                {day.dayOfMonth}
              </span>

              {/* Category dot */}
              <span
                className={`
                  mt-0.5 w-2 h-2 rounded-full
                  ${isGreen ? 'bg-green-500' : ''}
                  ${isBlue ? 'bg-blue-500' : ''}
                  ${!isWorkout ? 'bg-slate-300' : ''}
                `}
              />

              {/* Exercise preview or REST label */}
              {isWorkout ? (
                <span className="mt-0.5 text-[9px] leading-tight text-center text-slate-600 line-clamp-2">
                  {day.exercises[0].title}
                  {day.exercises.length > 1 && ` +${day.exercises.length - 1}`}
                </span>
              ) : (
                <span className="mt-0.5 text-[9px] text-slate-400 font-medium">REST</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Strength
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Toning
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Rest
        </span>
      </div>
    </div>
  );
}
