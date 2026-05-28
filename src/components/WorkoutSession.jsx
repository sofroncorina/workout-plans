import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { calendar } from '../data/calendar';

/*
  WorkoutSession — the guided workout timer screen.
  Think of this as a "state machine" with states:
    - 'exercise' → showing countdown for current exercise
    - 'rest' → 10-second rest between exercises
    - 'complete' → workout finished

  The component manages two timers:
    1. Total elapsed time (counts UP from 0:00)
    2. Per-exercise countdown (counts DOWN from 2:00)
*/

// === Audio helper: plays a short beep using Web Audio API ===
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 880; // A5 note
    oscillator.type = 'sine';
    gain.gain.value = 0.3;
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.15); // 150ms beep
  } catch (e) {
    // Audio not available — fail silently
  }
}

// === Format seconds to MM:SS ===
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function WorkoutSession() {
  const { dateKey } = useParams();
  const navigate = useNavigate();
  const dayData = calendar[dateKey];

  // --- State ---
  const [currentIndex, setCurrentIndex] = useState(0); // which exercise we're on
  const [phase, setPhase] = useState('exercise'); // 'exercise' | 'rest' | 'complete'
  const [countdown, setCountdown] = useState(300); // per-exercise: starts at 5:00
  const [totalTime, setTotalTime] = useState(0); // total elapsed seconds
  const [isPaused, setIsPaused] = useState(false);

  // Refs for interval management
  const intervalRef = useRef(null);
  const wakeLockRef = useRef(null);

  const exercises = dayData?.exercises || [];
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentIndex];

  // --- Wake Lock: prevent screen from sleeping during workout ---
  useEffect(() => {
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch (e) {
        // Wake lock not available or denied — non-critical
      }
    }
    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);

  // --- Timer tick logic ---
  useEffect(() => {
    if (isPaused || phase === 'complete') {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      // Increment total timer
      setTotalTime(t => t + 1);

      // Decrement countdown
      setCountdown(c => {
        if (c <= 1) {
          // Timer hit zero
          playBeep();

          if (phase === 'exercise') {
            // Move to rest phase (or complete if last exercise)
            if (currentIndex >= totalExercises - 1) {
              setPhase('complete');
            } else {
              setPhase('rest');
              return 10; // 10-second rest countdown
            }
          } else if (phase === 'rest') {
            // Rest finished — advance to next exercise
            setCurrentIndex(i => i + 1);
            setPhase('exercise');
            return 300; // Reset to 5:00 for next exercise
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, phase, currentIndex, totalExercises]);

  // --- Skip: end current exercise early ---
  const handleSkip = useCallback(() => {
    playBeep();
    if (currentIndex >= totalExercises - 1) {
      setPhase('complete');
      setCountdown(0);
    } else {
      setPhase('rest');
      setCountdown(10);
    }
  }, [currentIndex, totalExercises]);

  // --- Back: exit session with confirmation ---
  const handleBack = useCallback(() => {
    if (phase === 'complete' || window.confirm('Exit workout? Your progress will be lost.')) {
      navigate(`/day/${dateKey}`);
    }
  }, [navigate, dateKey, phase]);

  // --- Guard: invalid route ---
  if (!dayData || dayData.type === 'rest') {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 text-center">
        <p className="text-slate-500">No workout found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">
          Back to calendar
        </button>
      </div>
    );
  }

  const isGreen = dayData.category === 'green';
  const accentClass = isGreen ? 'text-green-600' : 'text-blue-600';
  const accentBg = isGreen ? 'bg-green-600' : 'bg-blue-600';

  // === COMPLETE SCREEN ===
  if (phase === 'complete') {
    return (
      <div className="view-enter min-h-dvh flex flex-col">
        {/* Persistent header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
          <button onClick={() => navigate(`/day/${dateKey}`)} className="text-sm text-slate-500 hover:text-slate-800">
            ← Back
          </button>
          <span className="text-sm font-mono font-semibold text-slate-700">
            {formatTime(totalTime)}
          </span>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Workout complete!</h1>
          <p className="text-slate-500 mb-1">
            {new Date(dateKey + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <p className="text-lg font-semibold text-slate-700 mb-8">
            Total time: {formatTime(totalTime)}
          </p>
          <button
            onClick={() => navigate('/')}
            className={`px-8 py-3 rounded-xl text-white font-bold ${accentBg} shadow-lg active:scale-95 transition-transform`}
          >
            Back to Calendar
          </button>
        </div>
      </div>
    );
  }

  // === EXERCISE / REST SCREEN ===
  const nextExercise = exercises[currentIndex + 1];

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50">
      {/* Persistent header with back button and total timer */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
        <button
          onClick={handleBack}
          className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Exit workout"
        >
          ← Back
        </button>
        <span className="text-sm font-mono font-semibold text-slate-700" aria-label="Total workout time">
          {formatTime(totalTime)}
        </span>
      </header>

      {/* Progress indicator */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Exercise {currentIndex + 1} / {totalExercises}</span>
          <span>{Math.round(((currentIndex + (phase === 'rest' ? 1 : 0)) / totalExercises) * 100)}%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${accentBg}`}
            style={{ width: `${((currentIndex + (phase === 'rest' ? 1 : 0)) / totalExercises) * 100}%` }}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {phase === 'exercise' ? (
          <>
            {/* Exercise title */}
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {currentExercise.title}
            </h2>

            {/* Countdown timer — big and prominent */}
            <div className={`text-6xl font-mono font-bold mb-4 ${countdown <= 10 ? 'text-red-500 animate-pulse' : accentClass}`}>
              {formatTime(countdown)}
            </div>

            {/* Sets × reps info */}
            <p className="text-sm text-slate-500 mb-3">
              {currentExercise.sets} × {currentExercise.reps} {currentExercise.unit === 'seconds' ? 's' : 'reps'}
            </p>

            {/* Form cue description */}
            <div className="max-h-48 overflow-y-auto px-2">
              <p className="text-base text-slate-600 leading-relaxed">
                {currentExercise.description}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Rest phase */}
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Rest</p>
            <h2 className="text-xl font-bold text-slate-700 mb-6">
              Next up: {nextExercise?.title}
            </h2>
            <div className="text-5xl font-mono font-bold text-amber-500">
              {formatTime(countdown)}
            </div>
          </>
        )}
      </div>

      {/* Session controls: Pause / Skip */}
      <div className="px-4 pb-6 pt-3 flex gap-3">
        <button
          onClick={() => setIsPaused(p => !p)}
          className="flex-1 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold
                     hover:bg-slate-100 active:scale-95 transition-all"
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        {phase === 'exercise' && (
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold
                       hover:bg-slate-100 active:scale-95 transition-all"
          >
            ⏭ Skip
          </button>
        )}
      </div>
    </div>
  );
}
