const app = window.dailyTracker;

const DEFAULT_SHARED_RECIPES = [

  {
    id: "bbq-bacon-cheeseburger-bowls",
    profileId: "shared",
    name: "BBQ Bacon Cheeseburger Bowls",
    category: "Dinner",
    calories: 315,
    protein: 30,
    carbs: 20,
    fat: 11,
    ingredients: [
      "ground beef",
      "potatoes",
      "onion",
      "bacon bits",
      "bbq sauce",
      "chipotle sauce",
      "cheese"
    ],
    ingredientTags: ["beef","bbq","bacon"],
    notes: ""
  },

  {
    id: "beef-enchilada-bowl",
    profileId: "shared",
    name: "Beef Enchilada Bowl (No Rice)",
    category: "Dinner",
    calories: 257,
    protein: 32,
    carbs: 8,
    fat: 10,
    ingredients: [
      "ground beef",
      "refried beans",
      "enchilada sauce",
      "queso",
      "cheese",
      "pico"
    ],
    ingredientTags: ["beef","mexican"],
    notes: "Rice removed"
  },

  {
    id: "big-mac-bowl",
    profileId: "shared",
    name: "Big Mac Bowl (No Rice)",
    category: "Dinner",
    calories: 256,
    protein: 27,
    carbs: 4,
    fat: 14,
    ingredients: [
      "ground beef",
      "lettuce",
      "pickles",
      "onion",
      "cheese",
      "burger sauce"
    ],
    ingredientTags: ["beef","low-carb"],
    notes: "Rice removed"
  },

  {
    id: "buffalo-chicken-quesadilla",
    profileId: "shared",
    name: "Buffalo Chicken Quesadilla",
    category: "Lunch",
    calories: 290,
    protein: 38,
    carbs: 5,
    fat: 12,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "buffalo sauce",
      "cheese"
    ],
    ingredientTags: ["chicken","tortilla"],
    notes: ""
  },

  {
    id: "cali-club-wrap",
    profileId: "shared",
    name: "Cali Club Wrap",
    category: "Lunch",
    calories: 284,
    protein: 23,
    carbs: 22,
    fat: 10,
    ingredients: [
      "low carb tortilla",
      "turkey",
      "bacon",
      "avocado",
      "ranch seasoning",
      "chipotle sauce"
    ],
    ingredientTags: ["wrap","turkey","bacon"],
    notes: ""
  },

  {
    id: "chicken-alfredo-bowl",
    profileId: "shared",
    name: "Chicken Alfredo Bowl",
    category: "Dinner",
    calories: 360,
    protein: 32,
    carbs: 35,
    fat: 8,
    ingredients: [
      "chicken",
      "pasta",
      "alfredo",
      "broccoli",
      "cheese"
    ],
    ingredientTags: ["chicken","pasta"],
    notes: ""
  },

  {
    id: "chicken-enchilada-bowl",
    profileId: "shared",
    name: "Chicken Enchilada Bowl (No Rice)",
    category: "Dinner",
    calories: 220,
    protein: 30,
    carbs: 7,
    fat: 6,
    ingredients: [
      "chicken",
      "beans",
      "enchilada sauce",
      "queso",
      "cheese"
    ],
    ingredientTags: ["chicken","mexican"],
    notes: "Rice removed"
  },

  {
    id: "chicken-parm-bowl",
    profileId: "shared",
    name: "Chicken Parm Bowl",
    category: "Dinner",
    calories: 364,
    protein: 32,
    carbs: 38,
    fat: 6,
    ingredients: [
      "chicken",
      "pasta",
      "marinara",
      "cheese"
    ],
    ingredientTags: ["chicken","pasta"],
    notes: ""
  },

  {
    id: "chicken-teriyaki-bowl",
    profileId: "shared",
    name: "Chicken Teriyaki Bowl (No Rice)",
    category: "Dinner",
    calories: 180,
    protein: 28,
    carbs: 10,
    fat: 3,
    ingredients: [
      "chicken",
      "broccoli",
      "teriyaki sauce"
    ],
    ingredientTags: ["chicken","asian"],
    notes: "Rice removed"
  },

  {
    id: "chili-mac-bowls",
    profileId: "shared",
    name: "Chili Mac Bowls",
    category: "Dinner",
    calories: 383,
    protein: 37,
    carbs: 25,
    fat: 14,
    ingredients: [
      "ground beef",
      "pasta",
      "chili seasoning",
      "cheese"
    ],
    ingredientTags: ["beef","pasta"],
    notes: ""
  },

  {
    id: "cowboy-butter-bowls",
    profileId: "shared",
    name: "Cowboy Butter Bowls",
    category: "Dinner",
    calories: 288,
    protein: 28,
    carbs: 26,
    fat: 9,
    ingredients: [
      "chicken",
      "potatoes",
      "butter",
      "garlic",
      "cream cheese"
    ],
    ingredientTags: ["chicken","butter"],
    notes: ""
  },

  {
    id: "crispy-chipotle-chicken-wrap",
    profileId: "shared",
    name: "Crispy Chipotle Chicken Wrap",
    category: "Lunch",
    calories: 294,
    protein: 28,
    carbs: 31,
    fat: 8,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "bbq sauce",
      "chipotle sauce",
      "bacon"
    ],
    ingredientTags: ["wrap","chicken","chipotle"],
    notes: ""
  },

  {
    id: "egg-roll-bowl",
    profileId: "shared",
    name: "Egg Roll Bowl (No Rice)",
    category: "Dinner",
    calories: 220,
    protein: 25,
    carbs: 8,
    fat: 12,
    ingredients: [
      "ground beef",
      "cabbage",
      "carrots",
      "soy sauce"
    ],
    ingredientTags: ["beef","low-carb"],
    notes: "Rice removed"
  },

  {
    id: "fajita-bowl",
    profileId: "shared",
    name: "Fajita Bowl (No Rice)",
    category: "Dinner",
    calories: 200,
    protein: 28,
    carbs: 6,
    fat: 7,
    ingredients: [
      "chicken",
      "peppers",
      "onion",
      "queso"
    ],
    ingredientTags: ["chicken","mexican"],
    notes: "Rice removed"
  },

  {
    id: "lasagna-bowl",
    profileId: "shared",
    name: "Lasagna Bowl",
    category: "Dinner",
    calories: 423,
    protein: 26,
    carbs: 36,
    fat: 19,
    ingredients: [
      "pasta",
      "ground beef",
      "marinara",
      "cheese"
    ],
    ingredientTags: ["pasta","beef"],
    notes: ""
  },

  {
    id: "mcchicken-sandwich",
    profileId: "shared",
    name: "McChicken Sandwich",
    category: "Lunch",
    calories: 225,
    protein: 13,
    carbs: 22,
    fat: 7,
    ingredients: [
      "chicken",
      "bun",
      "lettuce",
      "mayo"
    ],
    ingredientTags: ["chicken","sandwich"],
    notes: ""
  },

  {
    id: "mcchicken-wrap",
    profileId: "shared",
    name: "McChicken Wrap",
    category: "Lunch",
    calories: 400,
    protein: 30,
    carbs: 32,
    fat: 16,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "lettuce",
      "mayo"
    ],
    ingredientTags: ["wrap","chicken"],
    notes: ""
  },

  {
    id: "million-dollar-pasta",
    profileId: "shared",
    name: "Million Dollar Pasta",
    category: "Dinner",
    calories: 420,
    protein: 35,
    carbs: 42,
    fat: 16,
    ingredients: [
      "pasta",
      "ground beef",
      "cheese",
      "sauce"
    ],
    ingredientTags: ["pasta","beef"],
    notes: ""
  },

  {
    id: "pizza-lunchable",
    profileId: "shared",
    name: "Pizza Lunchable",
    category: "Lunch",
    calories: 263,
    protein: 16,
    carbs: 31,
    fat: 10,
    ingredients: [
      "naan",
      "cheese",
      "turkey pepperoni",
      "marinara"
    ],
    ingredientTags: ["pizza"],
    notes: ""
  },

  {
    id: "pesto-quesadilla",
    profileId: "shared",
    name: "Pesto Quesadilla",
    category: "Lunch",
    calories: 360,
    protein: 28,
    carbs: 26,
    fat: 16,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "pesto",
      "cheese"
    ],
    ingredientTags: ["chicken","tortilla"],
    notes: ""
  },

  {
    id: "sweet-chili-chicken-wrap",
    profileId: "shared",
    name: "Sweet Chili Chicken Wrap",
    category: "Lunch",
    calories: 228,
    protein: 28,
    carbs: 20,
    fat: 5,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "sweet chili sauce",
      "cucumber",
      "carrots"
    ],
    ingredientTags: ["wrap","chicken"],
    notes: ""
  }

];

function recipeCollectionName() {
  return app.collections?.recipes || 'recipes';
}

function getIngredientsArray(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeIngredientTags(ingredients) {
  return [
    ...new Set(
      (ingredients || [])
        .flatMap((line) =>
          String(line)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, ' ')
            .split(/\s+/)
        )
        .map((word) => word.trim())
        .filter((word) => word.length > 2)
    )
  ];
}

async function upsertDefaultSharedRecipes() {
  for (const recipe of DEFAULT_SHARED_RECIPES) {
    await app.db.upsert(recipeCollectionName(), recipe.id, {
      ...recipe,
      updatedAt: new Date().toISOString()
    });
  }

  console.log("Default shared recipes upserted.");
}

function fillRecipeForm(recipe) {
  document.getElementById("recipeId").value = recipe.id || "";
  document.getElementById("recipeName").value = recipe.name || "";
  document.getElementById("recipeCategory").value = recipe.category || "";
  document.getElementById("recipeServingSize").value = recipe.servingSize || "";
  document.getElementById("recipeCalories").value = recipe.calories ?? "";
  document.getElementById("recipeProtein").value = recipe.protein ?? "";
  document.getElementById("recipeCarbs").value = recipe.carbs ?? "";
  document.getElementById("recipeFat").value = recipe.fat ?? "";
  document.getElementById("recipeIngredients").value = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.join("\n")
    : "";
  document.getElementById("recipeNotes").value = recipe.notes || "";
}

function clearRecipeForm() {
  document.getElementById("recipeForm").reset();
  document.getElementById("recipeId").value = "";
}

function recipeCard(recipe) {
  const macros = [
    recipe.calories ? `${recipe.calories} cal` : null,
    recipe.protein ? `P ${recipe.protein}` : null,
    recipe.carbs ? `C ${recipe.carbs}` : null,
    recipe.fat ? `F ${recipe.fat}` : null
  ]
    .filter(Boolean)
    .join(" • ");

  const ingredientsPreview =
    Array.isArray(recipe.ingredients) && recipe.ingredients.length
      ? `<p class="helper-text">${recipe.ingredients.slice(0, 3).join(" • ")}${
          recipe.ingredients.length > 3 ? "..." : ""
        }</p>`
      : "";

  return `
    <div class="list-item">
      <div class="summary-row">
        <div>
          <strong>${recipe.name || "Untitled Recipe"}</strong>
          <div class="helper-text">
            ${recipe.category || "No category"}${recipe.servingSize ? ` • ${recipe.servingSize}` : ""}
          </div>
        </div>
        <span class="status-pill">Shared</span>
      </div>

      ${macros ? `<p class="helper-text" style="margin-top:8px;">${macros}</p>` : ""}
      ${ingredientsPreview}
      ${recipe.notes ? `<p class="helper-text" style="margin-top:8px;">${recipe.notes}</p>` : ""}

      <div class="inline-actions" style="margin-top:12px;">
        <button type="button" class="edit-recipe-button" data-id="${recipe.id}">Edit</button>
        <button type="button" class="delete-recipe-button" data-id="${recipe.id}">Delete</button>
      </div>
    </div>
  `;
}

async function getSharedRecipes() {
  const allRecipes = await app.db.list(recipeCollectionName());

  return allRecipes
    .filter((recipe) => recipe.profileId === "shared")
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

async function loadRecipes() {
  const search = document.getElementById("recipeSearch")?.value.trim().toLowerCase() || "";
  const category = document.getElementById("recipeFilterCategory")?.value || "";

  let recipes = await getSharedRecipes();

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
        ...(Array.isArray(recipe.ingredients) ? recipe.ingredients : []),
        ...(Array.isArray(recipe.ingredientTags) ? recipe.ingredientTags : [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }

  const recipeList = document.getElementById("recipeList");
  if (!recipeList) return;

  if (!recipes.length) {
    recipeList.innerHTML = `<div class="empty-state">No recipes yet.</div>`;
    return;
  }

  recipeList.innerHTML = recipes.map(recipeCard).join("");

  recipeList.querySelectorAll(".edit-recipe-button").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = recipes.find((recipe) => recipe.id === button.dataset.id);
      if (!selected) return;
      fillRecipeForm(selected);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  recipeList.querySelectorAll(".delete-recipe-button").forEach((button) => {
    button.addEventListener("click", async () => {
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
  const form = document.getElementById("recipeForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const existingId = document.getElementById("recipeId").value.trim();
    const ingredients = getIngredientsArray(document.getElementById("recipeIngredients").value);

    const payload = {
      id: existingId || crypto.randomUUID(),
      profileId: "shared",
      name: document.getElementById("recipeName").value.trim(),
      category: document.getElementById("recipeCategory").value,
      servingSize: document.getElementById("recipeServingSize").value.trim() || "1 serving",
      calories: Number(document.getElementById("recipeCalories").value || 0),
      protein: Number(document.getElementById("recipeProtein").value || 0),
      carbs: Number(document.getElementById("recipeCarbs").value || 0),
      fat: Number(document.getElementById("recipeFat").value || 0),
      ingredients,
      ingredientTags: normalizeIngredientTags(ingredients),
      notes: document.getElementById("recipeNotes").value.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      if (!existingId) {
        payload.createdAt = new Date().toISOString();
      }

      await app.db.upsert(recipeCollectionName(), payload.id, payload);
      clearRecipeForm();
      await loadRecipes();
      alert(existingId ? "Recipe updated." : "Recipe saved for both profiles.");
    } catch (error) {
      console.error("Recipe save failed:", error);
      alert(`Recipe save failed: ${error.message || error}`);
    }
  });

  document.getElementById("clearRecipeForm")?.addEventListener("click", clearRecipeForm);
}

function installFilters() {
  document.getElementById("recipeSearch")?.addEventListener("input", loadRecipes);
  document.getElementById("recipeFilterCategory")?.addEventListener("change", loadRecipes);
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  await upsertDefaultSharedRecipes();
  installRecipeForm();
  installFilters();
  await loadRecipes();
}

init();