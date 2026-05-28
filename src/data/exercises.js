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
    description: 'Stai pe spate cu genunchii indoiti si talpile pe podea. Ridica bazinul pana corpul formeaza o linie dreapta. Strange fesierii sus 2 secunde si coboara lent.',
  },
  'rdl': {
    id: 'rdl',
    title: 'RDL',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'green',
    description: 'Tine ganterele in maini. Genunchii usor indoiti. Impinge soldurile in spate cu spatele drept pana simti intindere in spatele coapsei, apoi revino lent.',
  },
  'fandari': {
    id: 'fandari',
    title: 'Fandari',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Fa un pas mare in spate si coboara controlat. Impinge in calcaiul piciorului din fata pentru a reveni.',
  },
  'donkey-kicks': {
    id: 'donkey-kicks',
    title: 'Donkey kicks',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'green',
    description: 'Din pozitia in 4 labe, ridica talpa spre tavan fara sa arcuesti spatele.',
  },
  'wall-sit': {
    id: 'wall-sit',
    title: 'Wall sit',
    sets: 3,
    reps: 45,
    unit: 'seconds',
    category: 'green',
    description: 'Sprijina-te cu spatele de perete si coboara pana genunchii sunt la aproximativ 90°. Mentine pozitia.',
  },
  'sumo-squat': {
    id: 'sumo-squat',
    title: 'Sumo squat',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'blue',
    description: 'Picioarele mai departate decat soldurile, varfurile usor spre exterior. Coboara drept in jos.',
  },
  'pulsed-squats': {
    id: 'pulsed-squats',
    title: 'Pulsed squats',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Ramai jos intr-o genuflexiune partiala si fa miscari mici pulsate.',
  },
  'fire-hydrants': {
    id: 'fire-hydrants',
    title: 'Fire hydrants',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'blue',
    description: 'Din pozitia in 4 labe, ridica genunchiul lateral fara sa rotesti corpul.',
  },
  'side-leg-raises': {
    id: 'side-leg-raises',
    title: 'Side leg raises',
    sets: 3,
    reps: 15,
    unit: 'reps',
    category: 'blue',
    description: 'Culcata pe o parte, ridica piciorul de sus lent si controlat.',
  },
  'bridge-hold': {
    id: 'bridge-hold',
    title: 'Bridge hold',
    sets: 3,
    reps: 30,
    unit: 'seconds',
    category: 'blue',
    description: 'Mentine pozitia sus in glute bridge timp de 30 secunde.',
  },
  'squats-lente': {
    id: 'squats-lente',
    title: 'Squats lente',
    sets: 4,
    reps: 12,
    unit: 'reps',
    category: 'green',
    description: 'Coboara lent ca si cum te-ai aseza pe un scaun. Ridica-te apasand in calcaie.',
  },
  'bulgarian-split-squat': {
    id: 'bulgarian-split-squat',
    title: 'Bulgarian split squat',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Piciorul din spate sprijinit pe un scaun sau canapea. Coboara lent pe piciorul din fata si revino controlat.',
  },
  'step-back-lunges': {
    id: 'step-back-lunges',
    title: 'Step-back lunges',
    sets: 3,
    reps: 10,
    unit: 'reps',
    category: 'green',
    description: 'Fa un pas in spate si coboara lent. Revino fara sa te grabesti.',
  },
  'frog-pumps': {
    id: 'frog-pumps',
    title: 'Frog pumps',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Stai pe spate cu talpile lipite intre ele si genunchii deschisi. Ridica bazinul rapid si controlat.',
  },
  'clamshells': {
    id: 'clamshells',
    title: 'Clamshells',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'Pe o parte, genunchii indoiti. Ridica genunchiul de sus fara sa misti bazinul.',
  },
  'bridge-pulses': {
    id: 'bridge-pulses',
    title: 'Bridge pulses',
    sets: 3,
    reps: 20,
    unit: 'reps',
    category: 'blue',
    description: 'In pozitia de glute bridge, fa miscari mici pulsate sus.',
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
