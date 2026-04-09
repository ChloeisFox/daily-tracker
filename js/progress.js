const app = window.dailyTracker;

function groupByDate(items, numericKey) {
  return items.reduce((acc, item) => {
    acc[item.date] = (acc[item.date] || 0) + Number(item[numericKey] || 0);
    return acc;
  }, {});
}

function renderList(targetId, entries, suffix = '') {
  const target = document.getElementById(targetId);
  if (!entries.length) {
    target.innerHTML = '<div class="empty-state">Not enough data yet.</div>';
    return;
  }
  target.innerHTML = entries.map(([label, value]) => `<div class="summary-row"><span>${label}</span><strong>${value}${suffix}</strong></div>`).join('');
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  const profile = app.getCurrentProfile();
  const [meals, weights, workouts] = await Promise.all([
    app.db.list('meals', { profileId: profile.id }),
    app.db.list('weights', { profileId: profile.id }),
    app.db.list('workouts', { profileId: profile.id })
  ]);
  const settings = (await app.db.list('profiles', { id: profile.id }))[0] || profile;

  const sortedWeights = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const latestWeight = sortedWeights.at(-1);
  const startWeight = Number(settings?.goals?.startWeight || sortedWeights[0]?.value || 0);
  const poundsLost = latestWeight && startWeight ? (startWeight - Number(latestWeight.value)).toFixed(1) : '--';

  const dailyCalories = Object.values(groupByDate(meals, 'calories'));
  const avgCalories = dailyCalories.length ? Math.round(dailyCalories.reduce((a, b) => a + b, 0) / dailyCalories.length) : '--';
  const trackedDays = new Set([...meals, ...weights, ...workouts].map((item) => item.date)).size;

  document.getElementById('progressCurrentWeight').textContent = latestWeight?.value || '--';
  document.getElementById('progressPoundsLost').textContent = poundsLost;
  document.getElementById('progressAvgCalories').textContent = avgCalories;
  document.getElementById('progressDaysTracked').textContent = trackedDays;

  renderList('weightTrend', sortedWeights.slice(-8).reverse().map((entry) => [app.helpers.formatDate(entry.date), entry.value]));
  const workoutByDate = Object.entries(groupByDate(workouts, 'minutes')).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 8).map(([date, minutes]) => [app.helpers.formatDate(date), minutes]);
  renderList('workoutTrend', workoutByDate, ' min');

  const mealCount = meals.length || 1;
  const protein = meals.reduce((sum, item) => sum + Number(item.protein || 0), 0) / mealCount;
  const carbs = meals.reduce((sum, item) => sum + Number(item.carbs || 0), 0) / mealCount;
  const fats = meals.reduce((sum, item) => sum + Number(item.fat || 0), 0) / mealCount;
  const goalWeight = settings?.goals?.goalWeight || '--';
  document.getElementById('nutritionSummary').innerHTML = `
    <div class="summary-row"><span>Average protein per meal</span><strong>${protein.toFixed(1)} g</strong></div>
    <div class="summary-row"><span>Average carbs per meal</span><strong>${carbs.toFixed(1)} g</strong></div>
    <div class="summary-row"><span>Average fats per meal</span><strong>${fats.toFixed(1)} g</strong></div>
    <div class="summary-row"><span>Goal weight</span><strong>${goalWeight}</strong></div>
  `;
}

init();
