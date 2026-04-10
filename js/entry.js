const app = window.dailyTracker;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function setDefaultDates() {
  const selectedDate = document.getElementById('entryDate')?.value || today();

  const mealDate = document.getElementById('mealDate');
  const weightDate = document.getElementById('weightDate');
  const workoutDate = document.getElementById('workoutDate');

  if (weightDate && !weightDate.value) weightDate.value = selectedDate;
  if (workoutDate && !workoutDate.value) workoutDate.value = selectedDate;

  const entryDate = document.getElementById('entryDate');
  if (entryDate && !entryDate.value) entryDate.value = today();
}

function numberValue(id) {
  return Number(document.getElementById(id)?.value || 0);
}

function stringValue(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

async function loadRecipesIntoSelect() {
  const profile = app.getCurrentProfile();
  const select = document.getElementById('savedRecipeSelect');
  if (!select) return;

  const recipes = await app.db.list('recipes', { profileId: profile.id });

  select.innerHTML = `
    <option value="">Choose a saved recipe</option>
    ${recipes
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      .map((recipe) => `<option value="${recipe.id}">${recipe.name}</option>`)
      .join('')}
  `;
}

async function applySelectedRecipe() {
  const profile = app.getCurrentProfile();
  const recipeId = document.getElementById('savedRecipeSelect')?.value;
  if (!recipeId) return;

  const recipes = await app.db.list('recipes', { profileId: profile.id });
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  document.getElementById('mealName').value = recipe.name || '';
  document.getElementById('mealType').value = recipe.category || 'Dinner';
  document.getElementById('mealCalories').value = recipe.calories ?? '';
  document.getElementById('mealProtein').value = recipe.protein ?? '';
  document.getElementById('mealCarbs').value = recipe.carbs ?? '';
  document.getElementById('mealFat').value = recipe.fat ?? '';
  document.getElementById('mealNotes').value = recipe.notes || '';
}

async function loadEntrySummary() {
  const profile = app.getCurrentProfile();
  const date = document.getElementById('entryDate')?.value || today();
  const summary = document.getElementById('entrySummary');

  const [meals, weights, workouts] = await Promise.all([
    app.db.list('meals', { profileId: profile.id, date }),
    app.db.list('weights', { profileId: profile.id, date }),
    app.db.list('workouts', { profileId: profile.id, date })
  ]);

  const blocks = [];

  if (weights.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Weight</strong>
        ${weights.map(item => `<div>${item.value}</div>`).join('')}
      </div>
    `);
  }

  if (meals.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Meals</strong>
        ${meals.map(item => `<div>${item.mealType}: ${item.name || 'Meal'} - ${item.calories || 0} cal</div>`).join('')}
      </div>
    `);
  }

  if (workouts.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Workouts</strong>
        ${workouts.map(item => `<div>${item.workoutType || 'Workout'} - ${item.minutes || 0} min - ${item.caloriesBurned || 0} cal</div>`).join('')}
      </div>
    `);
  }

  summary.innerHTML = blocks.length
    ? blocks.join('')
    : `<div class="empty-state">Nothing saved for this date yet.</div>`;
}

async function installMealForm() {
  const form = document.getElementById('mealForm');
  if (!form) return;

  await loadRecipesIntoSelect();

  const recipeSelect = document.getElementById('savedRecipeSelect');
  if (recipeSelect) {
    recipeSelect.addEventListener('change', applySelectedRecipe);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date = document.getElementById('entryDate')?.value || today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      mealType: stringValue('mealType') || 'Dinner',
      name: stringValue('mealName'),
      calories: numberValue('mealCalories'),
      protein: numberValue('mealProtein'),
      carbs: numberValue('mealCarbs'),
      fat: numberValue('mealFat'),
      notes: stringValue('mealNotes'),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create('meals', payload);
      form.reset();
      if (recipeSelect) recipeSelect.value = '';
      await loadEntrySummary();
      alert('Meal saved.');
    } catch (error) {
      console.error('Failed to save meal:', error);
      alert('Meal could not be saved.');
    }
  });
}

function installWeightForm() {
  const form = document.getElementById('weightForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date = document.getElementById('weightDate')?.value || document.getElementById('entryDate')?.value || today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      value: numberValue('weightValue'),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create('weights', payload);
      form.reset();
      document.getElementById('weightDate').value = document.getElementById('entryDate')?.value || today();
      await loadEntrySummary();
      alert('Weight saved.');
    } catch (error) {
      console.error('Failed to save weight:', error);
      alert('Weight could not be saved.');
    }
  });
}

function installWorkoutForm() {
  const form = document.getElementById('workoutForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date = document.getElementById('workoutDate')?.value || document.getElementById('entryDate')?.value || today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      workoutType: stringValue('workoutType'),
      minutes: numberValue('workoutMinutes'),
      caloriesBurned: numberValue('workoutCaloriesBurned'),
      notes: stringValue('workoutNotes'),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create('workouts', payload);
      form.reset();
      document.getElementById('workoutDate').value = document.getElementById('entryDate')?.value || today();
      await loadEntrySummary();
      alert('Workout saved.');
    } catch (error) {
      console.error('Failed to save workout:', error);
      alert('Workout could not be saved.');
    }
  });
}

async function init() {
  await app.ensureApp();
  app.requireProfile();

  setDefaultDates();

  document.getElementById('entryDate')?.addEventListener('change', async () => {
    document.getElementById('weightDate').value = document.getElementById('entryDate').value;
    document.getElementById('workoutDate').value = document.getElementById('entryDate').value;
    await loadEntrySummary();
  });

  installWeightForm();
  installWorkoutForm();
  await installMealForm();
  await loadEntrySummary();
}

init();