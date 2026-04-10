const app = window.dailyTracker;

function recipeCollectionName() {
  return app.collections?.recipes || 'recipes';
}

function getIngredientsArray(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function fillRecipeForm(recipe) {
  document.getElementById('recipeId').value = recipe.id || '';
  document.getElementById('recipeName').value = recipe.name || '';
  document.getElementById('recipeCategory').value = recipe.category || '';
  document.getElementById('recipeServingSize').value = recipe.servingSize || '';
  document.getElementById('recipeCalories').value = recipe.calories ?? '';
  document.getElementById('recipeProtein').value = recipe.protein ?? '';
  document.getElementById('recipeCarbs').value = recipe.carbs ?? '';
  document.getElementById('recipeFat').value = recipe.fat ?? '';
  document.getElementById('recipeIngredients').value = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.join('\n')
    : '';
  document.getElementById('recipeNotes').value = recipe.notes || '';
}

function clearRecipeForm() {
  document.getElementById('recipeForm').reset();
  document.getElementById('recipeId').value = '';
}

function recipeCard(recipe) {
  const macros = [
    recipe.calories ? `${recipe.calories} cal` : null,
    recipe.protein ? `P ${recipe.protein}` : null,
    recipe.carbs ? `C ${recipe.carbs}` : null,
    recipe.fat ? `F ${recipe.fat}` : null
  ].filter(Boolean).join(' • ');

  const ingredientsPreview = Array.isArray(recipe.ingredients) && recipe.ingredients.length
    ? `<p class="helper-text">${recipe.ingredients.slice(0, 3).join(' • ')}${recipe.ingredients.length > 3 ? '...' : ''}</p>`
    : '';

  return `
    <div class="list-item">
      <div class="summary-row">
        <div>
          <strong>${recipe.name || 'Untitled Recipe'}</strong>
          <div class="helper-text">
            ${recipe.category || 'No category'}${recipe.servingSize ? ` • ${recipe.servingSize}` : ''}
          </div>
        </div>
        <span class="status-pill">${recipe.category || 'Recipe'}</span>
      </div>

      ${macros ? `<p class="helper-text" style="margin-top:8px;">${macros}</p>` : ''}
      ${ingredientsPreview}
      ${recipe.notes ? `<p class="helper-text" style="margin-top:8px;">${recipe.notes}</p>` : ''}

      <div class="inline-actions" style="margin-top:12px;">
        <button type="button" class="edit-recipe-button" data-id="${recipe.id}">Edit</button>
        <button type="button" class="delete-recipe-button" data-id="${recipe.id}">Delete</button>
      </div>
    </div>
  `;
}

async function loadRecipes() {
  const profile = app.getCurrentProfile();
  const search = document.getElementById('recipeSearch').value.trim().toLowerCase();
  const category = document.getElementById('recipeFilterCategory').value;

  let recipes = await app.db.list(recipeCollectionName(), { profileId: profile.id });

  recipes = recipes.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  if (category) {
    recipes = recipes.filter((recipe) => recipe.category === category);
  }

  if (search) {
    recipes = recipes.filter((recipe) => {
      const haystack = [
        recipe.name,
        recipe.category,
        recipe.servingSize,
        recipe.notes,
        ...(Array.isArray(recipe.ingredients) ? recipe.ingredients : [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(search);
    });
  }

  const recipeList = document.getElementById('recipeList');

  if (!recipes.length) {
    recipeList.innerHTML = `<div class="empty-state">No recipes yet.</div>`;
    return;
  }

  recipeList.innerHTML = recipes.map(recipeCard).join('');

  recipeList.querySelectorAll('.edit-recipe-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const selected = recipes.find((recipe) => recipe.id === button.dataset.id);
      if (!selected) return;
      fillRecipeForm(selected);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  recipeList.querySelectorAll('.delete-recipe-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const selected = recipes.find((recipe) => recipe.id === button.dataset.id);
      if (!selected) return;

      const confirmed = window.confirm(`Delete "${selected.name}"?`);
      if (!confirmed) return;

      await app.db.remove(recipeCollectionName(), selected.id);
      await loadRecipes();
    });
  });
}

function installRecipeForm() {
  const form = document.getElementById('recipeForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const existingId = document.getElementById('recipeId').value.trim();

    const payload = {
      id: existingId || crypto.randomUUID(),
      profileId: profile.id,
      name: document.getElementById('recipeName').value.trim(),
      category: document.getElementById('recipeCategory').value,
      servingSize: document.getElementById('recipeServingSize').value.trim(),
      calories: Number(document.getElementById('recipeCalories').value || 0),
      protein: Number(document.getElementById('recipeProtein').value || 0),
      carbs: Number(document.getElementById('recipeCarbs').value || 0),
      fat: Number(document.getElementById('recipeFat').value || 0),
      ingredients: getIngredientsArray(document.getElementById('recipeIngredients').value),
      notes: document.getElementById('recipeNotes').value.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await app.db.upsert(recipeCollectionName(), payload.id, payload);
    clearRecipeForm();
    await loadRecipes();
    alert(existingId ? 'Recipe updated.' : 'Recipe saved.');
  });

  document.getElementById('clearRecipeForm').addEventListener('click', clearRecipeForm);
}

function installFilters() {
  document.getElementById('recipeSearch').addEventListener('input', loadRecipes);
  document.getElementById('recipeFilterCategory').addEventListener('change', loadRecipes);
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  installRecipeForm();
  installFilters();
  await loadRecipes();
}

init();