import { useParams, useNavigate } from 'react-router-dom';
import { calendar } from '../data/calendar';

/*
  DayDetail — shows the full workout for a specific day.
  This is like a "detail endpoint" — you click a day on the calendar and get full info.
  Displays the exercise list with sets × reps and a "Start Workout" button.
*/

// Format a date string (YYYY-MM-DD) into a human-readable header
function formatHeader(dateKey) {
  const date = new Date(dateKey + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function DayDetail() {
  const { dateKey } = useParams();
  const navigate = useNavigate();
  const dayData = calendar[dateKey];

  // If invalid date or rest day, redirect back
  if (!dayData || dayData.type === 'rest') {
    return (
      <div className="view-enter max-w-lg mx-auto px-4 py-6 text-center">
        <p className="text-slate-500">No workout scheduled for this day.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 underline"
        >
          Back to calendar
        </button>
      </div>
    );
  }

  const { category, exercises } = dayData;
  const isGreen = category === 'green';

  return (
    <div className="view-enter max-w-lg mx-auto px-4 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        aria-label="Back to calendar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Calendar
      </button>

      {/* Date header */}
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        {formatHeader(dateKey)}
      </h1>

      {/* Category badge */}
      <span
        className={`
          inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6
          ${isGreen ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
        `}
      >
        {isGreen ? 'Strength' : 'Toning'}
      </span>

      {/* Exercise list */}
      <ol className="space-y-3 mb-8" aria-label="Exercise list">
        {exercises.map((ex, index) => (
          <li
            key={ex.id + '-' + index}
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-100"
          >
            {/* Exercise number */}
            <span
              className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white
                ${isGreen ? 'bg-green-500' : 'bg-blue-500'}
              `}
            >
              {index + 1}
            </span>

            {/* Exercise info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{ex.title}</p>
              <p className="text-sm text-slate-500">
                {ex.sets} × {ex.reps} {ex.unit === 'seconds' ? 's' : 'reps'}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Start workout button */}
      <button
        onClick={() => navigate(`/workout/${dateKey}`)}
        className={`
          w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg
          transition-all duration-200 active:scale-95
          ${isGreen
            ? 'bg-green-600 hover:bg-green-700 shadow-green-200'
            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
          }
        `}
      >
        Start Workout
      </button>
    </div>
  );
}
