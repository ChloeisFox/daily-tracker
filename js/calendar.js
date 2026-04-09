const app = window.dailyTracker;
let monthCursor = new Date();
let selectedDate = app?.helpers?.today?.() || new Date().toISOString().slice(0, 10);

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function renderEmpty(message) {
  return `<div class="empty-state">${message}</div>`;
}

async function renderOverview(profile, dateString) {
  const [meals, weights, workouts] = await Promise.all([
    app.db.list('meals', { profileId: profile.id, date: dateString }),
    app.db.list('weights', { profileId: profile.id, date: dateString }),
    app.db.list('workouts', { profileId: profile.id, date: dateString })
  ]);
  const settings = (await app.db.list('profiles', { id: profile.id }))[0] || profile;
  const totals = app.helpers.calcDayTotals({ meals, workouts, settings });
  const target = document.getElementById('dayOverview');
  document.getElementById('selectedDateTitle').textContent = app.helpers.formatDate(dateString);
  document.getElementById('editDateLink').href = `entry.html?date=${dateString}`;

  target.innerHTML = `
    <div class="summary-row"><span>Weight</span><strong>${weights[0]?.value || '--'}</strong></div>
    <div class="summary-row"><span>Total calories</span><strong>${totals.mealCalories}</strong></div>
    <div class="summary-row"><span>Calories left</span><strong>${totals.caloriesLeft}</strong></div>
    <div class="summary-row"><span>Workout minutes</span><strong>${totals.workoutMinutes}</strong></div>
    <div class="summary-row"><span>Calories burned</span><strong>${totals.caloriesBurned}</strong></div>
    <div class="divider"></div>
    ${meals.length ? meals.map((meal) => `<div class="list-item"><strong>${meal.mealType}</strong><p>${meal.name || 'Meal'} · ${meal.calories} kcal</p></div>`).join('') : renderEmpty('No meals on this date.')}
    ${workouts.length ? workouts.map((workout) => `<div class="list-item"><strong>${workout.type}</strong><p>${workout.minutes} min · ${workout.caloriesBurned || 0} kcal</p></div>`).join('') : renderEmpty('No workouts on this date.')}
  `;
}

async function renderCalendar(profile) {
  const grid = document.getElementById('calendarGrid');
  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  document.getElementById('monthLabel').textContent = monthCursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const allMeals = await app.db.list('meals', { profileId: profile.id });
  const allWeights = await app.db.list('weights', { profileId: profile.id });
  const allWorkouts = await app.db.list('workouts', { profileId: profile.id });
  const markedDates = new Set([...allMeals, ...allWeights, ...allWorkouts].map((item) => item.date));

  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  grid.innerHTML = headers.map((label) => `<div class="calendar-cell is-header">${label}</div>`).join('');

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startOffset);

  for (let i = 0; i < 42; i += 1) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    const key = dateKey(cellDate);
    const inMonth = cellDate.getMonth() === month;
    const isSelected = key === selectedDate;
    const button = document.createElement('button');
    button.className = `calendar-cell${inMonth ? '' : ' is-other-month'}${isSelected ? ' is-selected' : ''}`;
    button.innerHTML = `<span>${cellDate.getDate()}</span>${markedDates.has(key) ? '<span class="dot"></span>' : ''}`;
    button.addEventListener('click', async () => {
      selectedDate = key;
      await renderCalendar(profile);
      await renderOverview(profile, key);
    });
    grid.appendChild(button);
  }
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  const profile = app.getCurrentProfile();
  document.getElementById('prevMonth').addEventListener('click', async () => { monthCursor.setMonth(monthCursor.getMonth() - 1); await renderCalendar(profile); });
  document.getElementById('nextMonth').addEventListener('click', async () => { monthCursor.setMonth(monthCursor.getMonth() + 1); await renderCalendar(profile); });
  await renderCalendar(profile);
  await renderOverview(profile, selectedDate);
}

init();
