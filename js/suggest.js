const app = window.dailyTracker;

let selectedIngredients = new Set();

const INGREDIENT_GROUPS = {
  Proteins: [
    "chicken",
    "ground beef",
    "turkey",
    "bacon",
    "pepperoni",
    "egg"
  ],
  Carbs: [
    "pasta",
    "tortilla",
    "bread",
    "potatoes",
    "beans",
    "corn"
  ],
  Sauces: [
    "alfredo",
    "bbq",
    "buffalo",
    "chipotle sauce",
    "enchilada sauce",
    "marinara",
    "orange sauce",
    "pesto",
    "queso",
    "ranch dressing",
    "ranch seasoning",
    "soy sauce",
    "sweet chili sauce",
    "teriyaki sauce",
    "tzatziki sauce"
  ],
  Dairy: [
    "cheese",
    "cream cheese",
    "greek yogurt",
    "butter"
  ],
  Vegetables: [
    "avocado",
    "banana peppers",
    "broccoli",
    "cabbage",
    "carrots",
    "cherry tomatoes",
    "cilantro",
    "cucumber",
    "fire roasted corn",
    "garlic",
    "lettuce",
    "lime",
    "mushrooms",
    "onion",
    "peppers",
    "pico",
    "pickles",
    "pineapple",
    "spinach",
    "sun dried tomatoes",
    "tomato",
    "vegetables"
  ],
  SeasoningsAndExtras: [
    "chili seasoning",
    "fajita seasoning",
    "honey",
    "italian dressing",
    "jerk seasoning",
    "light italian dressing",
    "light mayo",
    "mayo",
    "peanut butter",
    "refried beans",
    "spinach dip",
    "sriracha",
    "taco seasoning"
  ]
};

const COOKBOOK_BY_RECIPE_ID = {
  "bbq-bacon-cheeseburger-bowls": "FlavorFULL",
  "bbq-chicken-pasta-salad": "FlavorFULL",
  "beef-enchilada-bowl": "Heat + Eat",
  "big-mac-bowl": "Heat + Eat",
  "blt-pasta-salad": "FlavorFULL",
  "buffalo-chicken-pasta-salad": "FlavorFULL",
  "buffalo-chicken-quesadilla": "Heat + Eat",
  "cali-club-wrap": "FlavorFULL",
  "chicken-alfredo-bowl": "Heat + Eat",
  "chicken-enchilada-bowl": "Heat + Eat",
  "chicken-parm-bowl": "Heat + Eat",
  "chicken-teriyaki-bowl": "Heat + Eat",
  "chili-mac-bowls": "FlavorFULL",
  "chopped-chicken-bacon-ranch-bowl": "FlavorFULL",
  "chopped-greek": "FlavorFULL",
  "chopped-italian-beef-bowl": "FlavorFULL",
  "club-sliders": "FlavorFULL",
  "cool-ranch-chicken-casserole": "FlavorFULL",
  "cowboy-butter-bowls": "FlavorFULL",
  "creamy-chicken-spinach-bake": "FlavorFULL",
  "crispy-chipotle-chicken-wrap": "FlavorFULL",
  "crunchwrap-sliders": "FlavorFULL",
  "cobb-chicken-wrap": "FlavorFULL",
  "egg-roll-bowl": "Heat + Eat",
  "fajita-bowl": "Heat + Eat",
  "french-dip-crunchers": "FlavorFULL",
  "garlic-bread-pizza-burgers": "FlavorFULL",
  "garlic-parm-sliders": "FlavorFULL",
  "grinder-de-gallo": "FlavorFULL",
  "honey-butter-chicken": "FlavorFULL",
  "jerk-chicken-wrap": "FlavorFULL",
  "lasagna-bowl": "Heat + Eat",
  "lettuce-wrap-bowl": "Heat + Eat",
  "loaded-alfredo-fries": "FlavorFULL",
  "marry-me-pasta-salad-bowl": "FlavorFULL",
  "mcchicken-sandwich": "Heat + Eat",
  "mcchicken-wrap": "Heat + Eat",
  "mexi-cali-wrap": "FlavorFULL",
  "million-dollar-pasta": "Heat + Eat",
  "orange-chicken-bowls": "FlavorFULL",
  "philly-cheese-casserole": "FlavorFULL",
  "philly-cheese-sliders": "FlavorFULL",
  "pizza-lunchable": "FlavorFULL",
  "pizza-sub-wrap": "FlavorFULL",
  "pesto-quesadilla": "Heat + Eat",
  "quesarita-enchiladas": "FlavorFULL",
  "smash-burger-crunchers": "FlavorFULL",
  "southwestern-alfredo-bowls": "FlavorFULL",
  "spinach-dip-crunchers": "FlavorFULL",
  "street-corn-chicken-salad": "FlavorFULL",
  "stuffed-flatbread": "Heat + Eat",
  "sweet-chili-chicken-wrap": "FlavorFULL",
  "teriyaki-beef-bowl-no-rice": "FlavorFULL"
};

function normalizeWord(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "");
}

function getCanonicalIngredient(value) {
  const item = normalizeWord(value);

  const aliases = {
    "alfredo sauce": "alfredo",
    "avocado ranch": "ranch dressing",
    "bacon bits": "bacon",
    "bbq sauce": "bbq",
    "bbq seasoning": "bbq",
    "bun": "bread",
    "buns": "bread",
    "slider buns": "bread",
    "garlic bread": "bread",
    "naan": "bread",
    "flatbread": "bread",
    "refried beans": "beans",
    "fire roasted corn": "corn",
    "mozzarella": "cheese",
    "feta cheese": "cheese",
    "cotija cheese": "cheese",
    "cheddar cheese": "cheese",
    "parmesan": "cheese",
    "mozzarella cheese": "cheese",
    "plain greek yogurt": "greek yogurt",
    "romaine lettuce": "lettuce",
    "red onion": "onion",
    "cooked pasta": "pasta",
    "cherry tomatoes": "tomato",
    "rotel": "tomato",
    "low carb tortilla": "tortilla",
    "tortillas": "tortilla",
    "tortilla chips": "tortilla",
    "turkey pepperoni": "turkey",
    "ground chicken": "chicken"
  };

  return aliases[item] || item;
}

async function getSharedRecipes() {
  const recipes = await app.db.list("recipes", { profileId: "shared" });
  return recipes.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

function updateSelectedIngredientsText() {
  const target = document.getElementById("selectedIngredientsText");
  const items = [...selectedIngredients].sort((a, b) => a.localeCompare(b));

  target.textContent = items.length
    ? `Selected: ${items.join(", ")}`
    : "No ingredients selected yet.";
}

function renderIngredientButtons() {
  const target = document.getElementById("ingredientButtons");
  if (!target) return;

  target.innerHTML = Object.entries(INGREDIENT_GROUPS)
    .map(([groupName, items]) => {
      const chips = items
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

      return `
        <section class="ingredient-group">
          <h3 class="ingredient-group-title">${groupName}</h3>
          <div class="chip-grid">${chips}</div>
        </section>
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

      renderIngredientButtons();
      updateSelectedIngredientsText();
    });
  });
}

function scoreRecipe(recipe, selectedList) {
  const recipeIngredients = (recipe.ingredients || []).map((item) =>
    getCanonicalIngredient(item)
  );
  const recipeTags = (recipe.ingredientTags || []).map((item) =>
    getCanonicalIngredient(item)
  );

  const matched = [];

  for (const selected of selectedList) {
    const ingredientMatch = recipeIngredients.some((ingredient) =>
      ingredient.includes(selected) || selected.includes(ingredient)
    );

    const tagMatch = recipeTags.some((tag) =>
      tag.includes(selected) || selected.includes(tag)
    );

    if (!ingredientMatch && !tagMatch) {
      return { score: 0, matched: [] };
    }

    matched.push(selected);
  }

  return {
    score: matched.length,
    matched
  };
}

function getCookbookNote(recipe) {
  return COOKBOOK_BY_RECIPE_ID[recipe.id] || "";
}

function recipeCard(recipe, matchData) {
  const macros = [
    recipe.calories ? `${recipe.calories} cal` : null,
    recipe.protein ? `P ${recipe.protein}` : null,
    recipe.carbs ? `C ${recipe.carbs}` : null,
    recipe.fat ? `F ${recipe.fat}` : null
  ].filter(Boolean).join(" • ");

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const cookbook = getCookbookNote(recipe);
  const extraNotes = [cookbook ? `Cookbook: ${cookbook}` : null, recipe.notes || null]
    .filter(Boolean)
    .join(" • ");

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
      ${extraNotes ? `<p class="helper-text" style="margin-top:8px;">${extraNotes}</p>` : ""}
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
    results.innerHTML = `<div class="empty-state">No recipes match all selected ingredients.</div>`;
    return;
  }

  results.innerHTML = scored
    .slice(0, 10)
    .map((item) => recipeCard(item.recipe, item.matchData))
    .join("");
}

async function init() {
  await app.ensureApp();
  app.requireProfile();

  renderIngredientButtons();
  updateSelectedIngredientsText();

  document.getElementById("suggestButton")?.addEventListener("click", suggestRecipes);

  document.getElementById("clearIngredients")?.addEventListener("click", () => {
    selectedIngredients.clear();
    renderIngredientButtons();
    updateSelectedIngredientsText();
    document.getElementById("suggestResults").innerHTML =
      `<div class="empty-state">Tap ingredients above to get recipe ideas.</div>`;
  });
}

init();