const app = window.dailyTracker;

const DEFAULT_SHARED_RECIPES = [
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
      "lean ground beef",
      "refried beans",
      "enchilada sauce",
      "queso",
      "shredded cheese",
      "pico"
    ],
    ingredientTags: ["beef", "mexican", "cheese", "sauce"],
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
    ingredientTags: ["beef", "low-carb", "burger"],
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
      "canned chicken",
      "cream cheese spread",
      "buffalo sauce",
      "shredded cheese"
    ],
    ingredientTags: ["tortilla", "chicken", "cheese", "buffalo"],
    notes: ""
  },
  {
    id: "burrito-bowl",
    profileId: "shared",
    name: "Burrito Bowl (No Rice)",
    category: "Dinner",
    calories: 210,
    protein: 26,
    carbs: 6,
    fat: 9,
    ingredients: [
      "ground beef",
      "refried beans",
      "queso",
      "shredded cheese",
      "pico"
    ],
    ingredientTags: ["beef", "mexican"],
    notes: "Rice removed"
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
      "alfredo sauce",
      "broccoli",
      "shredded cheese"
    ],
    ingredientTags: ["chicken", "pasta", "alfredo"],
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
      "black beans",
      "enchilada sauce",
      "queso",
      "shredded cheese"
    ],
    ingredientTags: ["chicken", "mexican"],
    notes: "Rice removed"
  },
  {
    id: "chicken-parm-bowl",
    profileId: "shared",
    name: "Chicken Parm Bowl",
    category: "Dinner",
    calories: 388,
    protein: 42,
    carbs: 37,
    fat: 8,
    ingredients: [
      "chicken",
      "protein pasta",
      "cottage cheese",
      "marinara",
      "parmesan",
      "mozzarella"
    ],
    ingredientTags: ["chicken", "pasta", "marinara", "cheese"],
    notes: "FlavorFULL version"
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
    ingredientTags: ["chicken", "asian", "teriyaki"],
    notes: "Rice removed"
  },
  {
    id: "creamy-lemon-chicken",
    profileId: "shared",
    name: "Creamy Lemon Chicken",
    category: "Dinner",
    calories: 368,
    protein: 32,
    carbs: 26,
    fat: 15,
    ingredients: [
      "instant mashed potatoes",
      "cauliflower rice",
      "chicken",
      "alfredo sauce",
      "bone broth",
      "mozzarella",
      "lemon"
    ],
    ingredientTags: ["chicken", "lemon", "creamy"],
    notes: "FlavorFULL version"
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
      "soy sauce",
      "teriyaki sauce"
    ],
    ingredientTags: ["beef", "cabbage", "low-carb"],
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
      "bell peppers",
      "onion",
      "queso"
    ],
    ingredientTags: ["chicken", "mexican", "peppers"],
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
      "greek yogurt",
      "mozzarella",
      "parmesan"
    ],
    ingredientTags: ["pasta", "beef", "cheese"],
    notes: ""
  },
  {
    id: "lettuce-wrap-bowl",
    profileId: "shared",
    name: "Lettuce Wrap Bowl",
    category: "Lunch",
    calories: 284,
    protein: 27,
    carbs: 15,
    fat: 16,
    ingredients: [
      "ground chicken",
      "lettuce",
      "teriyaki sauce",
      "peanut sauce"
    ],
    ingredientTags: ["chicken", "lettuce", "low-carb"],
    notes: ""
  },
  {
    id: "loaded-chicken-casserole",
    profileId: "shared",
    name: "Loaded Chicken Casserole",
    category: "Dinner",
    calories: 177,
    protein: 10,
    carbs: 7,
    fat: 12,
    ingredients: [
      "cream cheese",
      "plain greek yogurt",
      "cream of chicken soup",
      "ranch seasoning",
      "shredded cheese",
      "bacon bits",
      "shredded chicken",
      "ritz crackers",
      "butter"
    ],
    ingredientTags: ["chicken", "casserole", "cheese", "bacon"],
    notes: "Heat + Eat version; served without rice"
  },
  {
    id: "marry-me-pasta-salad-bowl",
    profileId: "shared",
    name: "Marry Me Pasta Salad Bowl",
    category: "Dinner",
    calories: 298,
    protein: 29,
    carbs: 28,
    fat: 7,
    ingredients: [
      "cooked pasta",
      "chicken",
      "sun dried tomatoes",
      "parmesan",
      "spinach",
      "alfredo sauce",
      "sun dried tomato pesto"
    ],
    ingredientTags: ["chicken", "pasta", "alfredo"],
    notes: "FlavorFULL version"
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
      "frozen chicken patty",
      "low carb bread or bun",
      "light mayo",
      "shredded lettuce",
      "pickles"
    ],
    ingredientTags: ["chicken", "sandwich"],
    notes: "Heat + Eat version"
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
      "crispy chicken",
      "lettuce",
      "mayo"
    ],
    ingredientTags: ["wrap", "chicken"],
    notes: ""
  },
  {
    id: "microwave-loaded-hb-casserole",
    profileId: "shared",
    name: "Microwave Loaded HB Casserole",
    category: "Dinner",
    calories: 361,
    protein: 42,
    carbs: 25,
    fat: 10,
    ingredients: [
      "shredded hashbrowns",
      "chicken",
      "cottage cheese",
      "laughing cow cheese",
      "ranch seasoning",
      "shredded cheese",
      "bacon bits"
    ],
    ingredientTags: ["chicken", "potato", "casserole", "bacon"],
    notes: "FlavorFULL version"
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
    ingredientTags: ["pasta", "beef", "cheese"],
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
    ingredientTags: ["tortilla", "chicken", "pesto"],
    notes: ""
  },
  {
    id: "sausage-rigatoni-bowls",
    profileId: "shared",
    name: "Sausage Rigatoni Bowls",
    category: "Dinner",
    calories: 362,
    protein: 31,
    carbs: 29,
    fat: 14,
    ingredients: [
      "dry pasta",
      "lean italian sausage or beef",
      "marinara or vodka sauce",
      "cottage cheese",
      "parmesan",
      "mozzarella",
      "green vegetable"
    ],
    ingredientTags: ["pasta", "sausage", "beef", "cheese"],
    notes: "FlavorFULL version"
  },
  {
    id: "street-corn-queso-bowl",
    profileId: "shared",
    name: "Street Corn Queso Bowl",
    category: "Lunch",
    calories: 289,
    protein: 42,
    carbs: 14,
    fat: 8,
    ingredients: [
      "chicken",
      "fire roasted corn",
      "laughing cow cheese",
      "cottage cheese or greek yogurt",
      "fajita seasoning",
      "shredded cheese"
    ],
    ingredientTags: ["chicken", "corn", "queso"],
    notes: "FlavorFULL version"
  },
  {
    id: "white-chicken-enchilada-casserole-bowl",
    profileId: "shared",
    name: "White Chicken Enchilada Casserole Bowl",
    category: "Dinner",
    calories: 287,
    protein: 37,
    carbs: 4,
    fat: 12,
    ingredients: [
      "salsa verde",
      "zero net carb mini tortillas",
      "chicken",
      "shredded cheese",
      "greek yogurt",
      "fajita seasoning",
      "queso"
    ],
    ingredientTags: ["chicken", "enchilada", "queso"],
    notes: "FlavorFULL version"
  },
  {
    id: "wicked-chicken-wrap",
    profileId: "shared",
    name: "Wicked Chicken Wrap",
    category: "Lunch",
    calories: 244,
    protein: 24,
    carbs: 36,
    fat: 6,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "hot sauce",
      "honey",
      "ranch seasoning",
      "shredded lettuce",
      "diced pickles"
    ],
    ingredientTags: ["wrap", "chicken", "spicy"],
    notes: "FlavorFULL version"
  }
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
      "russet potatoes",
      "lean ground beef",
      "yellow onion",
      "bacon bits",
      "bbq sauce",
      "chipotle sauce",
      "shredded cheese",
      "french fried onions"
    ],
    ingredientTags: ["beef", "potato", "bbq", "bacon", "cheeseburger"],
    notes: "FlavorFULL version"
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
      "dry pasta",
      "laughing cow cheese",
      "shredded cheese",
      "lean ground beef",
      "chili seasoning",
      "beef bone broth",
      "tomato sauce",
      "chili beans"
    ],
    ingredientTags: ["beef", "pasta", "chili", "cheese"],
    notes: "FlavorFULL version"
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
      "bacon bits",
      "red onion",
      "lettuce",
      "banana peppers"
    ],
    ingredientTags: ["wrap", "chicken", "chipotle", "bbq"],
    notes: "FlavorFULL version"
  },
  {
    id: "garlic-parm-stuffed-flatbread",
    profileId: "shared",
    name: "Garlic Parm Stuffed Flatbread",
    category: "Lunch",
    calories: 351,
    protein: 38,
    carbs: 30,
    fat: 13,
    ingredients: [
      "low carb tortillas",
      "laughing cow cheese",
      "chicken",
      "bacon bits",
      "onion",
      "parmesan garlic sauce",
      "shredded cheese",
      "mozzarella"
    ],
    ingredientTags: ["flatbread", "chicken", "garlic", "parmesan", "bacon"],
    notes: "FlavorFULL version"
  },
  {
    id: "honey-butter-chicken-bowls",
    profileId: "shared",
    name: "Honey Butter Chicken Bowls",
    category: "Dinner",
    calories: 325,
    protein: 27,
    carbs: 31,
    fat: 11,
    ingredients: [
      "instant mashed potatoes",
      "cauliflower rice",
      "chicken",
      "bbq seasoning",
      "butter",
      "honey",
      "soy sauce",
      "garlic",
      "green vegetable"
    ],
    ingredientTags: ["chicken", "potato", "honey", "butter"],
    notes: "FlavorFULL version"
  },
  {
    id: "orange-chicken-bowls",
    profileId: "shared",
    name: "Orange Chicken Bowls",
    category: "Dinner",
    calories: 365,
    protein: 29,
    carbs: 59,
    fat: 1,
    ingredients: [
      "chicken",
      "orange sauce",
      "bbq sauce",
      "dry pasta",
      "soy sauce",
      "garlic",
      "ginger",
      "broccoli",
      "carrots",
      "cabbage"
    ],
    ingredientTags: ["chicken", "orange", "pasta", "asian"],
    notes: "FlavorFULL version"
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
      "mini naan or pita",
      "mozzarella",
      "turkey pepperoni",
      "marinara"
    ],
    ingredientTags: ["pizza", "lunchable", "pepperoni"],
    notes: "FlavorFULL version"
  },
  {
    id: "southwestern-pinwheels",
    profileId: "shared",
    name: "Southwestern Pinwheels",
    category: "Lunch",
    calories: 270,
    protein: 31,
    carbs: 15,
    fat: 10,
    ingredients: [
      "low carb tortilla",
      "chicken",
      "laughing cow cheese",
      "fajita seasoning",
      "pico",
      "shredded mexican cheese",
      "chipotle or southwestern ranch sauce"
    ],
    ingredientTags: ["pinwheels", "chicken", "southwestern", "tortilla"],
    notes: "FlavorFULL version"
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
      "light cream cheese",
      "everything bagel seasoning",
      "chicken",
      "sweet chili sauce",
      "cucumber",
      "shredded carrots"
    ],
    ingredientTags: ["wrap", "chicken", "sweet chili"],
    notes: "FlavorFULL version"
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