/*
  Exercise library — all workout exercises with form cues.
  Each exercise has an id (slug), display title, sets, reps, unit, description, and category.
  Categories: "green" = harder/strength, "blue" = toning/lighter
*/

export const exercises = {
  'glute-bridge': {
    id: 'glute-bridge',
    title: 'Glute bridge',
    sets: 4,
    reps: 15,
    unit: 'reps',
    category: 'green',
    description: 'Lie on your back with knees bent, feet flat on the floor hip-width apart. Push through your heels to lift your hips toward the ceiling, squeezing your glutes at the top. Hold for a second, then lower slowly. Keep your core engaged and avoid arching your lower back.',
  },
  'rdl': {
    id: 'rdl',
    title: 'RDL (Romanian Deadlift)',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'green',
    description: 'Stand with feet hip-width apart, slight bend in your knees. Hinge at the hips pushing them back, keeping your back flat and chest up. Lower your hands along your legs until you feel a stretch in your hamstrings, then drive your hips forward to stand. Keep the weight close to your body throughout.',
  },
  'fandari': {
    id: 'fandari',
    title: 'Fandări (Lunges)',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Stand tall with feet together. Step forward with one leg and lower your hips until both knees are bent at approximately 90 degrees. Your back knee should hover just above the floor. Push through your front heel to return to standing. Alternate legs each rep. Keep your torso upright and core engaged.',
  },
  'donkey-kicks': {
    id: 'donkey-kicks',
    title: 'Donkey kicks',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'green',
    description: 'Start on all fours with hands under shoulders and knees under hips. Keeping your knee bent at 90 degrees, lift one leg up toward the ceiling, pressing your foot upward. Squeeze your glute at the top without arching your lower back. Lower slowly and repeat. Complete all reps on one side before switching.',
  },
  'wall-sit': {
    id: 'wall-sit',
    title: 'Wall sit',
    sets: 3,
    reps: 45,
    unit: 'seconds',
    category: 'green',
    description: 'Stand with your back flat against a wall. Slide down until your thighs are parallel to the floor, knees at 90 degrees. Keep your back pressed into the wall, core tight, and hold the position. Do not rest hands on your thighs. Breathe steadily throughout the hold.',
  },
  'sumo-squat': {
    id: 'sumo-squat',
    title: 'Sumo squat',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'blue',
    description: 'Stand with feet wider than shoulder-width, toes pointed out at 45 degrees. Lower your hips straight down, keeping your chest up and knees tracking over your toes. Go as low as you can while maintaining form, then push through your heels to stand. Squeeze your glutes and inner thighs at the top.',
  },
  'pulsed-squats': {
    id: 'pulsed-squats',
    title: 'Pulsed squats',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Lower into a squat position with thighs parallel to the floor. Instead of standing fully, pulse up and down a few inches, maintaining tension in your quads and glutes. Stay low throughout the set. Keep your weight in your heels and chest lifted.',
  },
  'fire-hydrants': {
    id: 'fire-hydrants',
    title: 'Fire hydrants',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'blue',
    description: 'Start on all fours with hands under shoulders, knees under hips. Keeping your knee bent at 90 degrees, lift one leg out to the side until your thigh is parallel to the floor. Hold briefly at the top, squeezing your glute, then lower slowly. Keep your hips level — don\'t lean to the opposite side.',
  },
  'side-leg-raises': {
    id: 'side-leg-raises',
    title: 'Side leg raises',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'blue',
    description: 'Lie on your side with legs stacked and body in a straight line. Lift your top leg toward the ceiling, keeping it straight and leading with your heel. Raise until you feel tension in your outer hip, then lower slowly. Don\'t let your hips roll forward or backward. Complete all reps before switching sides.',
  },
  'bridge-hold': {
    id: 'bridge-hold',
    title: 'Bridge hold',
    sets: 3,
    reps: 30,
    unit: 'seconds',
    category: 'blue',
    description: 'Lie on your back with knees bent and feet flat on the floor. Push your hips up into a bridge position and hold at the top. Squeeze your glutes hard and keep your core braced. Don\'t let your hips sag — maintain a straight line from shoulders to knees throughout the hold.',
  },
  'squats-lente': {
    id: 'squats-lente',
    title: 'Squats lente (Slow squats)',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'green',
    description: 'Stand with feet shoulder-width apart. Lower into a squat over 3-4 seconds, controlling the descent. Go as deep as comfortable, keeping your chest up and weight in your heels. Pause at the bottom, then rise slowly over 2-3 seconds. The slow tempo increases time under tension for greater muscle activation.',
  },
  'bulgarian-split-squat': {
    id: 'bulgarian-split-squat',
    title: 'Bulgarian split squat',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Stand a step away from a bench or chair. Place the top of one foot on the surface behind you. Lower your body by bending your front knee until your thigh is parallel to the floor. Your front knee should track over your toes. Push through your front heel to stand. Keep your torso upright throughout.',
  },
  'step-back-lunges': {
    id: 'step-back-lunges',
    title: 'Step-back lunges',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Stand tall with feet together. Step one foot back and lower your hips until both knees form 90-degree angles. Your back knee should hover just above the floor. Push through your front heel to return to standing. Alternate legs. Keep your torso upright and avoid leaning forward.',
  },
  'frog-pumps': {
    id: 'frog-pumps',
    title: 'Frog pumps',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Lie on your back with the soles of your feet together and knees fallen out to the sides (butterfly position). Push through your feet to lift your hips, squeezing your glutes hard at the top. Lower slowly and repeat. Keep your upper back on the floor and focus on the glute contraction.',
  },
  'clamshells': {
    id: 'clamshells',
    title: 'Clamshells',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Lie on your side with knees bent at 45 degrees, feet together, and head resting on your arm. Keeping your feet touching, open your top knee toward the ceiling like a clamshell. Lift as high as possible without rolling your hips backward. Lower slowly with control. Complete all reps before switching sides.',
  },
  'bridge-pulses': {
    id: 'bridge-pulses',
    title: 'Bridge pulses',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Lie on your back with knees bent and feet flat on the floor. Lift your hips into a bridge position. Instead of lowering fully, pulse your hips up and down a few inches, keeping constant tension on your glutes. Stay elevated throughout the set and squeeze at the top of each pulse.',
  },
};

/*
  Weekly workout patterns — the exercise IDs for each workout day.
  Monday & Thursday are "green" (harder), Tuesday & Saturday are "blue" (toning).
*/
export const weeklyPattern = {
  monday: {
    category: 'green',
    exercises: ['glute-bridge', 'rdl', 'fandari', 'donkey-kicks', 'wall-sit'],
  },
  tuesday: {
    category: 'blue',
    exercises: ['sumo-squat', 'pulsed-squats', 'fire-hydrants', 'side-leg-raises', 'bridge-hold'],
  },
  wednesday: null, // rest
  thursday: {
    category: 'green',
    exercises: ['squats-lente', 'bulgarian-split-squat', 'rdl', 'step-back-lunges', 'donkey-kicks'],
  },
  friday: null, // rest
  saturday: {
    category: 'blue',
    exercises: ['wall-sit', 'frog-pumps', 'clamshells', 'side-leg-raises', 'bridge-pulses'],
  },
  sunday: null, // rest
};
