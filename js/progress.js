const app = window.dailyTracker;

function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatNumber(value, digits = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num.toFixed(digits) : '--';
}

function renderEmpty(message) {
  return `<div class="empty-state">${message}</div>`;
}

function groupMealsByDate(meals) {
  const grouped = {};

  meals.forEach((meal) => {
    if (!meal.date) return;
    if (!grouped[meal.date]) grouped[meal.date] = [];
    grouped[meal.date].push(meal);
  });

  return grouped;
}

function calculateAverageCaloriesPerDay(meals) {
  if (!meals.length) return 0;

  const grouped = groupMealsByDate(meals);
  const dates = Object.keys(grouped);
  if (!dates.length) return 0;

  const totalCalories = dates.reduce((sum, date) => {
    const dayTotal = grouped[date].reduce((inner, meal) => inner + safeNumber(meal.calories), 0);
    return sum + dayTotal;
  }, 0);

  return Math.round(totalCalories / dates.length);
}

function getDaysTracked(meals, weights, workouts) {
  const dates = new Set();

  meals.forEach((item) => item.date && dates.add(item.date));
  weights.forEach((item) => item.date && dates.add(item.date));
  workouts.forEach((item) => item.date && dates.add(item.date));

  return dates.size;
}

function getLatestWeight(weights) {
  if (!weights.length) return null;

  return [...weights].sort((a, b) => {
    const byDate = String(b.date || '').localeCompare(String(a.date || ''));
    if (byDate !== 0) return byDate;
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  })[0];
}

function calculatePoundsLost(currentWeight, startWeight) {
  const current = safeNumber(currentWeight);
  const start = safeNumber(startWeight);

  if (!current || !start) return 0;
  return start - current;
}

function calculateMealMacroAverages(meals) {
  if (!meals.length) {
    return { protein: 0, carbs: 0, fat: 0 };
  }

  const totals = meals.reduce(
    (acc, meal) => {
      acc.protein += safeNumber(meal.protein);
      acc.carbs += safeNumber(meal.carbs);
      acc.fat += safeNumber(meal.fat);
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0 }
  );

  return {
    protein: totals.protein / meals.length,
    carbs: totals.carbs / meals.length,
    fat: totals.fat / meals.length
  };
}

function renderWeightTrend(weights) {
  const container = document.getElementById('weightTrend');
  if (!container) return;

  if (!weights.length) {
    container.innerHTML = renderEmpty('No weight entries yet.');
    return;
  }

  const sorted = [...weights].sort((a, b) => {
    const byDate = String(b.date || '').localeCompare(String(a.date || ''));
    if (byDate !== 0) return byDate;
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });

  container.innerHTML = sorted
    .slice(0, 7)
    .map(
      (entry) => `
        <div class="summary-row">
          <span>${app.helpers.formatDate(entry.date)}</span>
          <strong>${formatNumber(entry.value, 1)}</strong>
        </div>
      `
    )
    .join('');
}

function renderWorkoutTrend(workouts) {
  const container = document.getElementById('workoutTrend');
  if (!container) return;

  if (!workouts.length) {
    container.innerHTML = renderEmpty('No workouts yet.');
    return;
  }

  const grouped = {};

  workouts.forEach((workout) => {
    if (!workout.date) return;

    if (!grouped[workout.date]) {
      grouped[workout.date] = { minutes: 0, caloriesBurned: 0 };
    }

    grouped[workout.date].minutes += safeNumber(workout.minutes);
    grouped[workout.date].caloriesBurned += safeNumber(workout.caloriesBurned);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  container.innerHTML = sortedDates
    .slice(0, 7)
    .map((date) => `
      <div class="summary-row">
        <span>${app.helpers.formatDate(date)}</span>
        <strong>${grouped[date].minutes} min</strong>
      </div>
    `)
    .join('');
}

function renderNutritionSummary(meals, profile) {
  const container = document.getElementById('nutritionSummary');
  if (!container) return;

  const averages = calculateMealMacroAverages(meals);
  const goalWeight = profile?.goals?.goalWeight || '--';

  container.innerHTML = `
    <div class="summary-row">
      <span>Average protein per meal</span>
      <strong>${formatNumber(averages.protein, 1)} g</strong>
    </div>
    <div class="summary-row">
      <span>Average carbs per meal</span>
      <strong>${formatNumber(averages.carbs, 1)} g</strong>
    </div>
    <div class="summary-row">
      <span>Average fats per meal</span>
      <strong>${formatNumber(averages.fat, 1)} g</strong>
    </div>
    <div class="summary-row">
      <span>Goal weight</span>
      <strong>${goalWeight || '--'}</strong>
    </div>
  `;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = value;
}

async function loadProgress() {
  const profile = app.getCurrentProfile();
  if (!profile) return;

  const [meals, weights, workouts, liveProfiles] = await Promise.all([
    app.db.list('meals', { profileId: profile.id }),
    app.db.list('weights', { profileId: profile.id }),
    app.db.list('workouts', { profileId: profile.id }),
    app.db.list('profiles', { id: profile.id })
  ]);

  const liveProfile = liveProfiles[0] || profile;
  const latestWeightEntry = getLatestWeight(weights);
  const currentWeight = latestWeightEntry ? safeNumber(latestWeightEntry.value) : 0;
  const startWeight = safeNumber(liveProfile?.goals?.startWeight);
  const poundsLost = calculatePoundsLost(currentWeight, startWeight);
  const avgCalories = calculateAverageCaloriesPerDay(meals);
  const daysTracked = getDaysTracked(meals, weights, workouts);

  setText('progressCurrentWeight', currentWeight ? formatNumber(currentWeight, 1) : '--');
  setText('progressPoundsLost', formatNumber(poundsLost, 1));
  setText('progressAvgCalories', avgCalories ? String(avgCalories) : '--');
  setText('avgCaloriesPerDay', String(avgCalories));
  setText('progressDaysTracked', String(daysTracked));

  renderWeightTrend(weights);
  renderWorkoutTrend(workouts);
  renderNutritionSummary(meals, liveProfile);
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  await loadProgress();
}

init();