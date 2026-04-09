const app = window.dailyTracker;

function setRing(progress) {
  const circle = document.getElementById('calorieRing');
  const circumference = 301.59;
  const clamped = Math.max(0, Math.min(1, progress));
  circle.style.strokeDashoffset = `${circumference * (1 - clamped)}`;
}

function renderTodayOverview(meals, weights, workouts, settings) {
  const container = document.getElementById('todayOverview');
  const totals = app.helpers.calcDayTotals({ meals, workouts, settings });
  const latestWeight = weights.sort((a, b) => b.date.localeCompare(a.date))[0];
  const items = [];

  if (latestWeight) {
    items.push(`<div class="summary-row"><span>Weight</span><strong>${latestWeight.value}</strong></div>`);
  }
  items.push(`<div class="summary-row"><span>Calories</span><strong>${totals.mealCalories}</strong></div>`);
  items.push(`<div class="summary-row"><span>Protein</span><strong>${totals.protein.toFixed(1)} g</strong></div>`);
  items.push(`<div class="summary-row"><span>Workouts</span><strong>${workouts.length}</strong></div>`);

  const mealRows = meals.map((meal) => `
    <div class="list-item">
      <div class="summary-row"><span>${meal.mealType}: ${meal.name || 'Meal'}</span><strong>${meal.calories} kcal</strong></div>
      <span class="helper-text">P ${meal.protein || 0} • C ${meal.carbs || 0} • F ${meal.fat || 0}</span>
    </div>`).join('');

  const workoutRows = workouts.map((workout) => `
    <div class="list-item">
      <div class="summary-row"><span>${workout.type}</span><strong>${workout.minutes} min</strong></div>
      <span class="helper-text">${workout.caloriesBurned || 0} kcal burned</span>
    </div>`).join('');

  container.innerHTML = `
    <div class="section-list">${items.join('')}</div>
    ${mealRows || '<div class="empty-state">No meals saved for this date yet.</div>'}
    ${workoutRows || '<div class="empty-state">No workouts saved for this date yet.</div>'}
  `;
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  const profile = app.getCurrentProfile();
  document.getElementById('greetingName').textContent = `Hi, ${profile.name}`;
  const today = app.helpers.today();
  document.getElementById('todayDateLabel').textContent = app.helpers.formatDate(today);

  const [meals, weights, workouts] = await Promise.all([
    app.db.list('meals', { profileId: profile.id, date: today }),
    app.db.list('weights', { profileId: profile.id }),
    app.db.list('workouts', { profileId: profile.id, date: today })
  ]);
  const settings = (await app.db.list('profiles', { id: profile.id }))[0] || profile;

  const totals = app.helpers.calcDayTotals({ meals, workouts, settings });
  document.getElementById('todayCalories').textContent = totals.mealCalories;
  document.getElementById('caloriesLeft').textContent = totals.caloriesLeft;
  document.getElementById('caloriesBurned').textContent = totals.caloriesBurned;
  document.getElementById('workoutMinutes').textContent = totals.workoutMinutes;
  document.getElementById('mealCount').textContent = meals.length;
  setRing(totals.calorieTarget ? totals.mealCalories / totals.calorieTarget : 0);

  const latestWeight = [...weights].sort((a, b) => b.date.localeCompare(a.date))[0];
  const startWeight = Number(settings?.goals?.startWeight || latestWeight?.value || 0);
  const goalWeight = Number(settings?.goals?.goalWeight || 0);
  if (latestWeight) {
    document.getElementById('currentWeight').textContent = `${latestWeight.value}`;
    const poundsLost = startWeight ? (startWeight - Number(latestWeight.value)).toFixed(1) : '0.0';
    document.getElementById('weightProgressText').textContent = `${poundsLost} lbs from start weight.`;
  }
  if (goalWeight && latestWeight) {
    const remaining = (Number(latestWeight.value) - goalWeight).toFixed(1);
    document.getElementById('goalProgress').textContent = `${remaining}`;
    document.getElementById('goalText').textContent = `${remaining} lbs to goal.`;
  }

  const banner = document.getElementById('reminderBanner');
  const reminderDays = Number(settings?.goals?.weighInDays || 5);
  if (!latestWeight || ((new Date(today) - new Date(latestWeight.date)) / 86400000) >= reminderDays) {
    banner.textContent = `Reminder: it has been ${latestWeight ? Math.floor((new Date(today) - new Date(latestWeight.date)) / 86400000) : reminderDays} days since your last weight entry.`;
    banner.classList.remove('hidden');
    if (Notification.permission === 'granted') {
      new Notification('Daily Tracker reminder', { body: 'It may be time to log a new weight entry.' });
    }
  }

  renderTodayOverview(meals, weights.filter((item) => item.date === today), workouts, settings);
}

init();
