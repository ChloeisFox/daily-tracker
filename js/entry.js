const app = window.dailyTracker;

function summaryTemplate(weights, meals, workouts, settings) {
  const totals = app.helpers.calcDayTotals({ meals, workouts, settings });
  return `
    <div class="summary-row"><span>Meals</span><strong>${meals.length}</strong></div>
    <div class="summary-row"><span>Total calories</span><strong>${totals.mealCalories}</strong></div>
    <div class="summary-row"><span>Calories left</span><strong>${totals.caloriesLeft}</strong></div>
    <div class="summary-row"><span>Workout minutes</span><strong>${totals.workoutMinutes}</strong></div>
    <div class="summary-row"><span>Calories burned</span><strong>${totals.caloriesBurned}</strong></div>
    <div class="summary-row"><span>Weight entry</span><strong>${weights[0]?.value || '--'}</strong></div>
  `;
}

async function refresh(date, profile) {
  const [weights, meals, workouts] = await Promise.all([
    app.db.list('weights', { profileId: profile.id, date }),
    app.db.list('meals', { profileId: profile.id, date }),
    app.db.list('workouts', { profileId: profile.id, date })
  ]);
  const settings = (await app.db.list('profiles', { id: profile.id }))[0] || profile;
  document.getElementById('entrySummary').innerHTML = summaryTemplate(weights, meals, workouts, settings);
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  const profile = app.getCurrentProfile();
  const dateInput = document.getElementById('entryDate');
  const urlDate = new URLSearchParams(window.location.search).get('date');
  dateInput.value = urlDate || app.helpers.today();

  async function saveMeal(event) {
    event.preventDefault();
    await app.db.create('meals', {
      profileId: profile.id,
      date: dateInput.value,
      mealType: document.getElementById('mealType').value,
      name: document.getElementById('mealName').value.trim(),
      calories: Number(document.getElementById('mealCalories').value || 0),
      protein: Number(document.getElementById('mealProtein').value || 0),
      carbs: Number(document.getElementById('mealCarbs').value || 0),
      fat: Number(document.getElementById('mealFat').value || 0),
      notes: document.getElementById('mealNotes').value.trim(),
      createdAt: new Date().toISOString()
    });
    event.target.reset();
    await refresh(dateInput.value, profile);
  }

  async function saveWeight(event) {
    event.preventDefault();
    const existing = await app.db.list('weights', { profileId: profile.id, date: dateInput.value });
    const payload = {
      profileId: profile.id,
      date: dateInput.value,
      value: Number(document.getElementById('weightValue').value || 0),
      notes: document.getElementById('weightNotes').value.trim(),
      updatedAt: new Date().toISOString()
    };
    if (existing[0]) {
      await app.db.upsert('weights', existing[0].id, payload);
    } else {
      await app.db.create('weights', payload);
    }
    event.target.reset();
    await refresh(dateInput.value, profile);
  }

  async function saveWorkout(event) {
    event.preventDefault();
    await app.db.create('workouts', {
      profileId: profile.id,
      date: dateInput.value,
      type: document.getElementById('workoutType').value.trim(),
      minutes: Number(document.getElementById('workoutMinutesInput').value || 0),
      caloriesBurned: Number(document.getElementById('workoutCalories').value || 0),
      notes: document.getElementById('workoutNotes').value.trim(),
      createdAt: new Date().toISOString()
    });
    event.target.reset();
    await refresh(dateInput.value, profile);
  }

  document.getElementById('mealForm').addEventListener('submit', saveMeal);
  document.getElementById('weightForm').addEventListener('submit', saveWeight);
  document.getElementById('workoutForm').addEventListener('submit', saveWorkout);
  dateInput.addEventListener('change', () => refresh(dateInput.value, profile));

  await refresh(dateInput.value, profile);
}

init();
