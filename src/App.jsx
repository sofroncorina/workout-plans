import { Routes, Route } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import DayDetail from './components/DayDetail';
import WorkoutSession from './components/WorkoutSession';

/*
  App — the top-level component that defines our routes.
  Think of this like a "router" or "controller" in a backend framework:
  it maps URL paths to the component that should render.

  Routes:
    /              → Calendar view (month grid)
    /day/:dateKey  → Day detail (exercise list for that day)
    /workout/:dateKey → Workout session (guided timer)
*/

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarView />} />
      <Route path="/day/:dateKey" element={<DayDetail />} />
      <Route path="/workout/:dateKey" element={<WorkoutSession />} />
    </Routes>
  );
}
