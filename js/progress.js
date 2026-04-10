const app = window.dailyTracker;

function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatNumber(value, digits = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num.toFixed(digits) : '0';
}

function getLatestWeight(weights) {
  if (!weights.length) return null;

  return [...weights].sort((a, b) => {
    const dateCompare = String(b.date || '').localeCompare(String(a.date || ''));
    if (dateCompare !== 0) return dateCompare;
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  })[0];
}

function getWeeklyAverageWeight(weights) {
  if (!weights.length) return 0;

  const sorted = [...weights].sort((a, b) => {
    const dateCompare = String(b.date || '').localeCompare(String(a.date || ''));
    if (dateCompare !== 0) return dateCompare;
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });

  const latestSeven = sorted.slice(0, 7);
  if (!latestSeven.length) return 0;

  const total = latestSeven.reduce((sum, item) => sum + safeNumber(item.value), 0);
  return total / latestSeven.length;
}

function getDaysTracked(meals, weights, workouts) {
  const dates = new Set();

  meals.forEach((item) => item.date && dates.add(item.date));
  weights.forEach((item) => item.date && dates.add(item.date));
  workouts.forEach((item) => item.date && dates.add(item.date));

  return dates.size;
}

function calculateAverageCaloriesPerDay(meals) {
  if (!meals.length) return 0;

  const caloriesByDate = {};

  meals.forEach((meal) => {
    const date = meal.date;
    if (!date) return;

    if (!caloriesByDate[date]) {
      caloriesByDate[date] = 0;
    }

    caloriesByDate[date] += safeNumber(meal.calories);
  });

  const days = Object.keys(caloriesByDate);
  if (!days.length) return 0;

  const totalCalories = days.reduce((sum, date) => sum + caloriesByDate[date], 0);
  return Math.round(totalCalories / days.length);
}

function calculateGoalProgress(currentWeight, startWeight, goalWeight) {
  const current = safeNumber(currentWeight);
  const start = safeNumber(startWeight);
  const goal = safeNumber(goalWeight);

  if (!current || !start || !goal) return '0%';

  const totalNeeded = Math.abs(start - goal);
  if (totalNeeded === 0) return '0%';

  const completed = Math.abs(start - current);
  const percent = Math.max(0, Math.min(100, Math.round((completed / totalNeeded) * 100)));

  return `${percent}%`;
}

function calculatePoundsLost(currentWeight, startWeight) {
  const current = safeNumber(currentWeight);
  const start = safeNumber(startWeight);

  if (!current || !start) return 0;
  return start - current;
}

function calculateWorkoutTotals(workouts) {
  return workouts.reduce(
    (totals, workout) => {
      totals.minutes += safeNumber(workout.minutes);
      totals.caloriesBurned += safeNumber(workout.caloriesBurned);
      return totals;
    },
    { minutes: 0, caloriesBurned: 0 }
  );
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = value;
}

async function loadProgress() {
  const profile = app.getCurrentProfile();
  if (!profile) return;

  const [meals, weights, workouts, profiles] = await Promise.all([
    app.db.list('meals', { profileId: profile.id }),
    app.db.list('weights', { profileId: profile.id }),
    app.db.list('workouts', { profileId: profile.id }),
    app.db.list('profiles', { id: profile.id })
  ]);

  const liveProfile = profiles[0] || profile;
  const goals = liveProfile.goals || {};

  const latestWeightEntry = getLatestWeight(weights);
  const currentWeight = latestWeightEntry ? safeNumber(latestWeightEntry.value) : 0;
  const startWeight = safeNumber(goals.startWeight);
  const goalWeight = safeNumber(goals.goalWeight);

  const poundsLost = calculatePoundsLost(currentWeight, startWeight);
  const daysTracked = getDaysTracked(meals, weights, workouts);
  const avgCalories = calculateAverageCaloriesPerDay(meals);
  const weeklyAvgWeight = getWeeklyAverageWeight(weights);
  const goalProgress = calculateGoalProgress(currentWeight, startWeight, goalWeight);
  const workoutTotals = calculateWorkoutTotals(workouts);

  setText('currentWeight', currentWeight ? formatNumber(currentWeight, 1) : '--');
  setText('poundsLost', formatNumber(poundsLost, 1));
  setText('daysTracked', String(daysTracked));
  setText('avgCaloriesPerDay', String(avgCalories));
  setText('weeklyAvgWeight', weeklyAvgWeight ? formatNumber(weeklyAvgWeight, 1) : '--');
  setText('goalProgress', goalProgress);
  setText('totalWorkoutMinutes', String(workoutTotals.minutes));
  setText('totalCaloriesBurned', String(workoutTotals.caloriesBurned));
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  await loadProgress();
}

init();