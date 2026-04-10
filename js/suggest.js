const app = window.dailyTracker;

let selectedIngredients = new Set();

function normalizeWord(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "");
}

async function getSharedRecipes() {
  const recipes = await app.db.list("recipes", { profileId: "shared" });
  return recipes.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

function getAvailableIngredientButtons(recipes) {
const preferredOrder = [
  "alfredo sauce",
  "bacon",
  "bbq sauce",
  "beef",
  "bell peppers",
  "bread",
  "broccoli",
  "buffalo sauce",
  "bun",
  "cheese",
  "chicken",
  "enchilada sauce",
  "ground beef",
  "lettuce",
  "low carb tortilla",
  "marinara",
  "mozzarella",
  "onion",
  "parmesan",
  "pasta",
  "pesto",
  "pickles",
  "pico",
  "potatoes",
  "queso",
  "ranch seasoning",
  "spinach",
  "sweet chili sauce",
  "teriyaki sauce",
  "tortilla",
  "turkey"
];

  const allIngredients = new Set();

  recipes.forEach((recipe) => {
    (recipe.ingredients || []).forEach((ingredient) => {
      const cleaned = normalizeWord(ingredient);
      if (cleaned) allIngredients.add(cleaned);
    });
  });

  const allList = [...allIngredients];

  const ordered = preferredOrder.filter((item) => allIngredients.has(item));
  const remaining = allList
    .filter((item) => !preferredOrder.includes(item))
    .sort((a, b) => a.localeCompare(b));

  return [...ordered, ...remaining];
}

function updateSelectedIngredientsText() {
  const target = document.getElementById("selectedIngredientsText");
  const items = [...selectedIngredients];

  target.textContent = items.length
    ? `Selected: ${items.join(", ")}`
    : "No ingredients selected yet.";
}

function renderIngredientButtons(ingredients) {
  const target = document.getElementById("ingredientButtons");
  if (!target) return;

  target.innerHTML = ingredients
    .map((ingredient) => {
      const isActive = selectedIngredients.has(ingredient);
      return `
        <button
          type="button"
          class="ingredient-chip${isActive ? " active" : ""}"
          data-ingredient="${ingredient}"
        >
          ${ingredient}
        </button>
      `;
    })
    .join("");

  target.querySelectorAll(".ingredient-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const ingredient = button.dataset.ingredient;
      if (!ingredient) return;

      if (selectedIngredients.has(ingredient)) {
        selectedIngredients.delete(ingredient);
      } else {
        selectedIngredients.add(ingredient);
      }

      renderIngredientButtons(ingredients);
      updateSelectedIngredientsText();
    });
  });
}

function scoreRecipe(recipe, selectedList) {
  const recipeIngredients = (recipe.ingredients || []).map(normalizeWord);
  const recipeTags = (recipe.ingredientTags || []).map(normalizeWord);

  let score = 0;
  const matched = [];

  selectedList.forEach((item) => {
    const ingredientMatch = recipeIngredients.some((ingredient) =>
      ingredient.includes(item) || item.includes(ingredient)
    );

    const tagMatch = recipeTags.some((tag) =>
      tag.includes(item) || item.includes(tag)
    );

    if (ingredientMatch || tagMatch) {
      score += 3;
      matched.push(item);
    }
  });

  return { score, matched };
}

function recipeCard(recipe, matchData) {
  const macros = [
    recipe.calories ? `${recipe.calories} cal` : null,
    recipe.protein ? `P ${recipe.protein}` : null,
    recipe.carbs ? `C ${recipe.carbs}` : null,
    recipe.fat ? `F ${recipe.fat}` : null
  ].filter(Boolean).join(" • ");

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  return `
    <div class="list-item">
      <div class="summary-row">
        <div>
          <strong>${recipe.name || "Untitled Recipe"}</strong>
          <div class="helper-text">
            ${recipe.category || "No category"} • Match score ${matchData.score}
          </div>
        </div>
      </div>

      ${macros ? `<p class="helper-text" style="margin-top:8px;">${macros}</p>` : ""}
      ${matchData.matched.length ? `<p class="helper-text" style="margin-top:8px;">Matched: ${matchData.matched.join(", ")}</p>` : ""}
      ${ingredients.length ? `<p class="helper-text" style="margin-top:8px;">${ingredients.join(" • ")}</p>` : ""}
      ${recipe.notes ? `<p class="helper-text" style="margin-top:8px;">${recipe.notes}</p>` : ""}
    </div>
  `;
}

async function suggestRecipes() {
  const results = document.getElementById("suggestResults");
  const category = document.getElementById("suggestCategory")?.value || "";
  const recipes = await getSharedRecipes();
  const selectedList = [...selectedIngredients];

  if (!recipes.length) {
    results.innerHTML = `<div class="empty-state">No shared recipes found yet.</div>`;
    return;
  }

  if (!selectedList.length) {
    results.innerHTML = `<div class="empty-state">Tap at least one ingredient first.</div>`;
    return;
  }

  let filtered = recipes;

  if (category) {
    filtered = filtered.filter((recipe) => recipe.category === category);
  }

  const scored = filtered
    .map((recipe) => {
      const matchData = scoreRecipe(recipe, selectedList);
      return { recipe, matchData };
    })
    .filter((item) => item.matchData.score > 0)
    .sort((a, b) => {
      if (b.matchData.score !== a.matchData.score) {
        return b.matchData.score - a.matchData.score;
      }
      return (a.recipe.name || "").localeCompare(b.recipe.name || "");
    });

  if (!scored.length) {
    results.innerHTML = `<div class="empty-state">No matches found. Try broader ingredients like chicken, cheese, tortilla, pasta, or broccoli.</div>`;
    return;
  }

  results.innerHTML = scored.slice(0, 10).map((item) => recipeCard(item.recipe, item.matchData)).join("");
}

async function init() {
  await app.ensureApp();
  app.requireProfile();

  const recipes = await getSharedRecipes();
  const ingredients = getAvailableIngredientButtons(recipes);

  renderIngredientButtons(ingredients);
  updateSelectedIngredientsText();

  document.getElementById("suggestButton")?.addEventListener("click", suggestRecipes);

  document.getElementById("clearIngredients")?.addEventListener("click", () => {
    selectedIngredients.clear();
    renderIngredientButtons(ingredients);
    updateSelectedIngredientsText();
    document.getElementById("suggestResults").innerHTML =
      `<div class="empty-state">Tap ingredients above to get recipe ideas.</div>`;
  });
}

init();