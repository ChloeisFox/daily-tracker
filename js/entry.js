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
  },

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

function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

async function ensureSharedRecipesExist() {
  console.log("Seeding shared recipes...");

  for (const recipe of DEFAULT_SHARED_RECIPES) {
    await app.db.upsert("recipes", recipe.id, {
      ...recipe,
      updatedAt: new Date().toISOString()
    });
  }

  console.log("Shared recipes ready.");
}

function setDefaultDates() {
  const entryDate = document.getElementById("entryDate");
  const weightDate = document.getElementById("weightDate");
  const workoutDate = document.getElementById("workoutDate");

  if (entryDate && !entryDate.value) {
    entryDate.value = today();
  }

  const selectedDate = entryDate?.value || today();

  if (weightDate && !weightDate.value) weightDate.value = selectedDate;
  if (workoutDate && !workoutDate.value) workoutDate.value = selectedDate;
}

function syncFormDatesFromEntry() {
  const selectedDate = document.getElementById("entryDate")?.value || today();
  const weightDate = document.getElementById("weightDate");
  const workoutDate = document.getElementById("workoutDate");

  if (weightDate) weightDate.value = selectedDate;
  if (workoutDate) workoutDate.value = selectedDate;
}

function numberValue(id) {
  return Number(document.getElementById(id)?.value || 0);
}

function stringValue(id) {
  return document.getElementById(id)?.value?.trim() || "";
}

async function getSharedRecipes() {
  const recipes = await app.db.list("recipes", { profileId: "shared" });
  return recipes.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

async function loadRecipesIntoSelect() {
  const select = document.getElementById("savedRecipeSelect");
  if (!select) return;

  const recipes = await getSharedRecipes();

  select.innerHTML = `
    <option value="">Choose a saved recipe</option>
    ${recipes.map((recipe) => `<option value="${recipe.id}">${recipe.name}</option>`).join("")}
  `;
}

async function applySelectedRecipe() {
  const recipeId = document.getElementById("savedRecipeSelect")?.value;
  if (!recipeId) return;

  const recipes = await getSharedRecipes();
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  document.getElementById("mealName").value = recipe.name || "";
  document.getElementById("mealType").value = recipe.category || "Dinner";
  document.getElementById("mealCalories").value = recipe.calories ?? "";
  document.getElementById("mealProtein").value = recipe.protein ?? "";
  document.getElementById("mealCarbs").value = recipe.carbs ?? "";
  document.getElementById("mealFat").value = recipe.fat ?? "";
  document.getElementById("mealNotes").value = recipe.notes || "";
}

async function loadEntrySummary() {
  const profile = app.getCurrentProfile();
  const date = document.getElementById("entryDate")?.value || today();
  const summary = document.getElementById("entrySummary");

  const [meals, weights, workouts] = await Promise.all([
    app.db.list("meals", { profileId: profile.id, date }),
    app.db.list("weights", { profileId: profile.id, date }),
    app.db.list("workouts", { profileId: profile.id, date })
  ]);

  const blocks = [];

  if (weights.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Weight</strong>
        ${weights.map((item) => `<div>${item.value}</div>`).join("")}
      </div>
    `);
  }

  if (meals.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Meals</strong>
        ${meals
          .map(
            (item) =>
              `<div>${item.mealType}: ${item.name || "Meal"} - ${item.calories || 0} cal</div>`
          )
          .join("")}
      </div>
    `);
  }

  if (workouts.length) {
    blocks.push(`
      <div class="list-item">
        <strong>Workouts</strong>
        ${workouts
          .map(
            (item) =>
              `<div>${item.workoutType || "Workout"} - ${item.minutes || 0} min - ${item.caloriesBurned || 0} cal</div>`
          )
          .join("")}
      </div>
    `);
  }

  summary.innerHTML = blocks.length
    ? blocks.join("")
    : `<div class="empty-state">Nothing saved for this date yet.</div>`;
}

async function installMealForm() {
  const form = document.getElementById("mealForm");
  if (!form) return;

  await loadRecipesIntoSelect();

  const recipeSelect = document.getElementById("savedRecipeSelect");
  if (recipeSelect) {
    recipeSelect.addEventListener("change", applySelectedRecipe);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date = document.getElementById("entryDate")?.value || today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      mealType: stringValue("mealType") || "Dinner",
      name: stringValue("mealName"),
      calories: numberValue("mealCalories"),
      protein: numberValue("mealProtein"),
      carbs: numberValue("mealCarbs"),
      fat: numberValue("mealFat"),
      notes: stringValue("mealNotes"),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create("meals", payload);
      form.reset();
      if (recipeSelect) recipeSelect.value = "";
      await loadEntrySummary();
      alert("Meal saved.");
    } catch (error) {
      console.error("Failed to save meal:", error);
      alert("Meal could not be saved.");
    }
  });
}

function installWeightForm() {
  const form = document.getElementById("weightForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date =
      document.getElementById("weightDate")?.value ||
      document.getElementById("entryDate")?.value ||
      today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      value: numberValue("weightValue"),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create("weights", payload);
      form.reset();
      const weightDate = document.getElementById("weightDate");
      if (weightDate) {
        weightDate.value = document.getElementById("entryDate")?.value || today();
      }
      await loadEntrySummary();
      alert("Weight saved.");
    } catch (error) {
      console.error("Failed to save weight:", error);
      alert("Weight could not be saved.");
    }
  });
}

function installWorkoutForm() {
  const form = document.getElementById("workoutForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profile = app.getCurrentProfile();
    const date =
      document.getElementById("workoutDate")?.value ||
      document.getElementById("entryDate")?.value ||
      today();

    const payload = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      date,
      workoutType: stringValue("workoutType"),
      minutes: numberValue("workoutMinutes"),
      caloriesBurned: numberValue("workoutCaloriesBurned"),
      notes: stringValue("workoutNotes"),
      createdAt: new Date().toISOString()
    };

    try {
      await app.db.create("workouts", payload);
      form.reset();
      const workoutDate = document.getElementById("workoutDate");
      if (workoutDate) {
        workoutDate.value = document.getElementById("entryDate")?.value || today();
      }
      await loadEntrySummary();
      alert("Workout saved.");
    } catch (error) {
      console.error("Failed to save workout:", error);
      alert("Workout could not be saved.");
    }
  });
}

async function init() {
  await app.ensureApp();
  app.requireProfile();
  await ensureSharedRecipesExist();

  setDefaultDates();

  document.getElementById("entryDate")?.addEventListener("change", async () => {
    syncFormDatesFromEntry();
    await loadEntrySummary();
  });

  installWeightForm();
  installWorkoutForm();
  await installMealForm();
  await loadEntrySummary();
}

init();