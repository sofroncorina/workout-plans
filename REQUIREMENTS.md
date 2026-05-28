# Workout Calendar App — Requirements

## Overview

An interactive web app that displays a 2-month workout calendar (June & July 2026).
Users can navigate days, view scheduled exercises, and run a guided workout session
with a per-exercise countdown timer.

---

## Data

All workout data is derived from the two PDFs in `/resources`.

### Exercise library

Each exercise has:
- `id` — unique slug (e.g. `glute-bridge`)
- `title` — display name (e.g. "Glute bridge")
- `sets` — number of sets (e.g. `4`)
- `reps` — reps per set, or duration in seconds (e.g. `15` reps or `45`s)
- `unit` — `"reps"` or `"seconds"`
- `description` — full form cue text from the exercise guide PDF
- `category` — `"green"` (harder) or `"blue"` (toning)

### Calendar data

Each calendar day (1 Jun – 31 Jul 2026) is either:
- `"rest"` — no workout
- An ordered list of exercise IDs matching the weekly pattern from the calendar PDF

Weekly pattern (repeats across both months):

| Day       | Type  | Exercises                                                                 |
|-----------|-------|---------------------------------------------------------------------------|
| Monday    | green | Glute bridge 4×15, RDL 4×12, Fandari 3×10, Donkey kicks 3×15, Wall sit 3×45s |
| Tuesday   | blue  | Sumo squat 4×12, Pulsed squats 3×20, Fire hydrants 3×15, Side leg raises 3×15, Bridge hold 3×30s |
| Wednesday | rest  | —                                                                         |
| Thursday  | green | Squats lente 4×12, Bulgarian split squat 3×10, RDL 4×12, Step-back lunges 3×10, Donkey kicks 3×15 |
| Friday    | rest  | —                                                                         |
| Saturday  | blue  | Wall sit 3×45s, Frog pumps 3×20, Clamshells 3×20, Side leg raises 3×15, Bridge pulses 3×20 |
| Sunday    | rest  | —                                                                         |

---

## Views

### 1. Calendar view (default)

- Displays a full-month grid (Mon–Sun columns) for June 2026.
- A tab or arrow navigation allows switching to July 2026.
- Each day cell shows:
  - The day number.
  - A colour-coded pill or dot indicating workout type: green, blue, or grey (rest).
  - The first exercise title truncated if needed (e.g. "Glute bridge +4 more").
- Rest days show "REST" in muted style.
- Today's date is visually highlighted.
- Days with workouts are clickable.

### 2. Day detail view (overlay / zoom-in)

- Opens when the user clicks a workout day.
- Displays:
  - Date header (e.g. "Monday, 2 June 2026").
  - Workout category badge (green / blue).
  - Full ordered list of exercises, each showing title, sets × reps/duration.
  - A **Start Workout** button.
- A back/close control returns to the calendar.

### 3. Workout session view

- Activated by pressing **Start Workout**.
- Walks through each exercise in sequence.

#### Persistent header (all session screens)

A fixed header bar is visible on every screen within the workout session:

- **Top-left: Back button** — exits the current screen (with a confirmation prompt
  on the session view) and returns to the previous view.
- **Top-right: Total workout timer** — counts up from 0:00 from the moment the
  session starts. Persists and continues running across all session screens
  (per-exercise, rest countdown, and completion screen). Pauses when the session
  is paused.

#### Per-exercise screen layout (top → bottom, vertically centred)

```
← Back          0:00  ↑total timer
─────────────────────────────────────
Exercise title           ← large heading
─────────────────────────
     MM:SS               ← countdown timer, centred, prominent
─────────────────────────
Form cue description     ← body text, scrollable if long
```

- The per-exercise timer counts down from **2:00** (120 seconds) for every
  exercise regardless of reps or duration.
- When the timer reaches 0:
  - A brief audio/visual cue signals the end of the exercise.
  - The app automatically advances to the next exercise after a **10-second rest**
    countdown displayed as "Rest — next up: [exercise name]".
- After the final exercise:
  - A completion screen appears: "Workout complete!" with the date and total time
    (pulled from the persistent total timer).
  - A **Back to Calendar** button is shown.

#### Session controls

- **Pause / Resume** — pauses and resumes both the per-exercise countdown and the
  total workout timer.
- **Skip** — immediately ends the current exercise and moves to the next (with the
  10-second rest).
- **Back** (top-left button) — exits the session (with a confirmation prompt) and
  returns to the day detail view.

#### Progress indicator

- A progress bar or step indicator (e.g. "3 / 5") shows how many exercises have
  been completed in the current session.

---

## Behaviour & UX rules

- The app must work entirely in the browser with no backend (static/client-side).
- All data (exercises, calendar schedule) is hardcoded from the PDFs — no file
  parsing at runtime.
- Transitions between views should be animated (slide or fade, ≤ 300 ms).
- The session view must prevent the screen from sleeping where the browser API
  allows it (`navigator.wakeLock`).
- The app must be fully usable on a mobile screen (≥ 375 px wide) in portrait
  orientation — this is the primary use case.
- No authentication or data persistence is required for v1.

---

## Tech stack (proposed)

- **Framework:** React (Vite scaffold)
- **Styling:** Tailwind CSS
- **State management:** React context or Zustand (lightweight)
- **Routing:** React Router (hash-based, no server needed)
- **Audio cue:** Web Audio API (short beep, no external assets)
- **Build output:** static files, deployable to GitHub Pages or similar

---

## Out of scope (v1)

- User accounts or progress tracking.
- Editing or customising the workout schedule.
- Video demonstrations of exercises.
- Push notifications or reminders.
