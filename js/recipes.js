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
  }, {
  id: "cobb-chicken-wrap",
  profileId: "shared",
  name: "Cobb Chicken Wrap",
  category: "Lunch",
  calories: 320,
  protein: 28,
  carbs: 22,
  fat: 14,
  ingredients: [
    "low carb tortilla",
    "chicken",
    "bacon",
    "egg",
    "lettuce",
    "tomato",
    "ranch dressing"
  ],
  ingredientTags: ["wrap","chicken","bacon"],
  notes: "FlavorFULL"
},

{
  id: "mexi-cali-wrap",
  profileId: "shared",
  name: "Mexi Cali Wrap",
  category: "Lunch",
  calories: 300,
  protein: 26,
  carbs: 24,
  fat: 12,
  ingredients: [
    "low carb tortilla",
    "chicken",
    "avocado",
    "pico",
    "cheese",
    "chipotle sauce"
  ],
  ingredientTags: ["wrap","chicken","mexican"],
  notes: "FlavorFULL"
},

{
  id: "pizza-sub-wrap",
  profileId: "shared",
  name: "Pizza Sub Wrap",
  category: "Lunch",
  calories: 310,
  protein: 24,
  carbs: 28,
  fat: 12,
  ingredients: [
    "low carb tortilla",
    "turkey pepperoni",
    "marinara",
    "cheese"
  ],
  ingredientTags: ["wrap","pizza"],
  notes: "FlavorFULL"
},

{
  id: "jerk-chicken-wrap",
  profileId: "shared",
  name: "Jerk Chicken Wrap",
  category: "Lunch",
  calories: 280,
  protein: 26,
  carbs: 24,
  fat: 10,
  ingredients: [
    "low carb tortilla",
    "chicken",
    "jerk seasoning",
    "pineapple",
    "lettuce",
    "sauce"
  ],
  ingredientTags: ["wrap","chicken"],
  notes: "FlavorFULL"
},

{
  id: "french-dip-crunchers",
  profileId: "shared",
  name: "French Dip Crunchers",
  category: "Lunch",
  calories: 265,
  protein: 30,
  carbs: 18,
  fat: 10,
  ingredients: [
    "low carb tortilla",
    "roast beef",
    "cheese",
    "au jus",
    "greek yogurt"
  ],
  ingredientTags: ["beef","wrap"],
  notes: "FlavorFULL"
},

{
  id: "spinach-dip-crunchers",
  profileId: "shared",
  name: "Spinach Dip Crunchers",
  category: "Snack",
  calories: 250,
  protein: 18,
  carbs: 20,
  fat: 12,
  ingredients: [
    "low carb tortilla",
    "spinach dip",
    "cheese"
  ],
  ingredientTags: ["spinach","cheese"],
  notes: "FlavorFULL"
},

{
  id: "smash-burger-crunchers",
  profileId: "shared",
  name: "Smash Burger Crunchers",
  category: "Lunch",
  calories: 330,
  protein: 26,
  carbs: 22,
  fat: 16,
  ingredients: [
    "low carb tortilla",
    "ground beef",
    "cheese",
    "pickles",
    "burger sauce"
  ],
  ingredientTags: ["beef","burger"],
  notes: "FlavorFULL"
},
{
  id: "bbq-chicken-pasta-salad",
  profileId: "shared",
  name: "BBQ Chicken Pasta Salad",
  category: "Lunch",
  calories: 322,
  protein: 35,
  carbs: 34,
  fat: 7,
  ingredients: [
    "cooked pasta",
    "chicken",
    "bbq sauce",
    "bacon bits",
    "corn",
    "red onion",
    "lettuce",
    "spinach",
    "ranch dressing",
    "bbq seasoning"
  ],
  ingredientTags: ["chicken", "pasta", "bbq", "salad"],
  notes: "FlavorFULL"
},

{
  id: "blt-pasta-salad",
  profileId: "shared",
  name: "BLT Pasta Salad",
  category: "Lunch",
  calories: 348,
  protein: 39,
  carbs: 25,
  fat: 11,
  ingredients: [
    "cooked pasta",
    "chicken",
    "bacon bits",
    "cheddar cheese",
    "cherry tomatoes",
    "lettuce",
    "spinach",
    "light mayo",
    "plain greek yogurt",
    "ranch seasoning"
  ],
  ingredientTags: ["chicken", "pasta", "bacon", "salad"],
  notes: "FlavorFULL"
},

{
  id: "buffalo-chicken-pasta-salad",
  profileId: "shared",
  name: "Buffalo Chicken Pasta Salad",
  category: "Lunch",
  calories: 242,
  protein: 34,
  carbs: 26,
  fat: 1,
  ingredients: [
    "cooked pasta",
    "chicken",
    "shredded carrots",
    "celery",
    "red onion",
    "lettuce",
    "spinach",
    "plain greek yogurt",
    "ranch seasoning",
    "hot sauce"
  ],
  ingredientTags: ["chicken", "pasta", "buffalo", "salad"],
  notes: "FlavorFULL"
},

{
  id: "chopped-chicken-bacon-ranch-bowl",
  profileId: "shared",
  name: "Chopped Chicken Bacon Ranch Bowl",
  category: "Lunch",
  calories: 385,
  protein: 40,
  carbs: 27,
  fat: 14,
  ingredients: [
    "cooked pasta",
    "chicken",
    "bacon bits",
    "cheddar cheese",
    "banana peppers",
    "lettuce",
    "ranch dressing",
    "light italian dressing"
  ],
  ingredientTags: ["chicken", "bacon", "ranch", "salad"],
  notes: "FlavorFULL"
},

{
  id: "chopped-greek",
  profileId: "shared",
  name: "Chopped Greek",
  category: "Lunch",
  calories: 265,
  protein: 31,
  carbs: 22,
  fat: 6,
  ingredients: [
    "cooked pasta",
    "chicken",
    "feta cheese",
    "cherry tomatoes",
    "cucumber",
    "banana peppers or pepperoncini",
    "lettuce",
    "spinach",
    "tzatziki sauce"
  ],
  ingredientTags: ["chicken", "greek", "pasta", "salad"],
  notes: "FlavorFULL"
},

{
  id: "chopped-italian-beef-bowl",
  profileId: "shared",
  name: "Chopped Italian Beef Bowl",
  category: "Lunch",
  calories: 238,
  protein: 24,
  carbs: 29,
  fat: 5,
  ingredients: [
    "cooked pasta",
    "deli roast beef",
    "banana peppers",
    "mozzarella cheese",
    "red onion",
    "lettuce",
    "spinach",
    "plain greek yogurt",
    "au jus seasoning"
  ],
  ingredientTags: ["beef", "italian", "pasta", "salad"],
  notes: "FlavorFULL"
},

{
  id: "grinder-de-gallo",
  profileId: "shared",
  name: "Grinder de Gallo",
  category: "Lunch",
  calories: 213,
  protein: 21,
  carbs: 9,
  fat: 10,
  ingredients: [
    "turkey pepperoni",
    "ham or turkey",
    "banana peppers",
    "cherry tomatoes",
    "red onion",
    "shredded lettuce",
    "light mayo",
    "light italian dressing"
  ],
  ingredientTags: ["turkey", "pepperoni", "italian", "salad"],
  notes: "FlavorFULL"
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
    "carrots",
    "mushrooms",
    "onion",
    "teriyaki sauce",
    "romaine lettuce",
    "peanut butter",
    "mayo",
    "sriracha",
    "soy sauce"
  ],
  ingredientTags: ["chicken", "lettuce", "asian", "salad"],
  notes: "Heat + Eat"
},

{
  id: "marry-me-pasta-salad-bowl",
  profileId: "shared",
  name: "Marry Me Pasta Salad Bowl",
  category: "Lunch",
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
  ingredientTags: ["chicken", "pasta", "alfredo", "salad"],
  notes: "FlavorFULL"
},

{
  id: "street-corn-chicken-salad",
  profileId: "shared",
  name: "Street Corn Chicken Salad",
  category: "Lunch",
  calories: 392,
  protein: 35,
  carbs: 30,
  fat: 15,
  ingredients: [
    "cooked pasta",
    "chicken",
    "bacon bits",
    "fire roasted corn",
    "red onion",
    "cilantro",
    "lettuce",
    "spinach",
    "avocado ranch",
    "lime",
    "cotija cheese"
  ],
  ingredientTags: ["chicken", "corn", "pasta", "salad"],
  notes: "FlavorFULL"
},
{
  id: "creamy-chicken-spinach-bake",
  profileId: "shared",
  name: "Creamy Chicken Spinach Bake",
  category: "Dinner",
  calories: 340,
  protein: 35,
  carbs: 10,
  fat: 18,
  ingredients: [
    "chicken",
    "spinach",
    "cream cheese",
    "mozzarella",
    "garlic",
    "seasoning"
  ],
  ingredientTags: ["chicken","spinach","creamy"],
  notes: "FlavorFULL"
},

{
  id: "cool-ranch-chicken-casserole",
  profileId: "shared",
  name: "Cool Ranch Chicken Casserole",
  category: "Dinner",
  calories: 360,
  protein: 32,
  carbs: 12,
  fat: 18,
  ingredients: [
    "chicken",
    "cream cheese",
    "ranch seasoning",
    "cheese",
    "tortilla chips"
  ],
  ingredientTags: ["chicken","ranch","casserole"],
  notes: "FlavorFULL"
},

{
  id: "garlic-bread-pizza-burgers",
  profileId: "shared",
  name: "Garlic Bread Pizza Burgers",
  category: "Dinner",
  calories: 420,
  protein: 30,
  carbs: 35,
  fat: 20,
  ingredients: [
    "ground beef",
    "garlic bread",
    "marinara",
    "cheese",
    "pepperoni"
  ],
  ingredientTags: ["beef","pizza"],
  notes: "FlavorFULL"
},

{
  id: "honey-butter-chicken",
  profileId: "shared",
  name: "Honey Butter Chicken",
  category: "Dinner",
  calories: 325,
  protein: 27,
  carbs: 31,
  fat: 11,
  ingredients: [
    "chicken",
    "butter",
    "honey",
    "garlic",
    "seasoning",
    "vegetables"
  ],
  ingredientTags: ["chicken","sweet"],
  notes: "FlavorFULL"
},

{
  id: "orange-chicken-bowls",
  profileId: "shared",
  name: "Orange Chicken Bowls (No Rice)",
  category: "Dinner",
  calories: 365,
  protein: 29,
  carbs: 30,
  fat: 6,
  ingredients: [
    "chicken",
    "orange sauce",
    "soy sauce",
    "garlic",
    "vegetables"
  ],
  ingredientTags: ["chicken","asian"],
  notes: "Rice removed"
},

{
  id: "philly-cheese-casserole",
  profileId: "shared",
  name: "Philly Cheese Casserole",
  category: "Dinner",
  calories: 380,
  protein: 34,
  carbs: 12,
  fat: 22,
  ingredients: [
    "ground beef",
    "onion",
    "peppers",
    "cheese",
    "cream cheese"
  ],
  ingredientTags: ["beef","cheese"],
  notes: "FlavorFULL"
},

{
  id: "quesarita-enchiladas",
  profileId: "shared",
  name: "Quesarita Enchiladas",
  category: "Dinner",
  calories: 400,
  protein: 30,
  carbs: 30,
  fat: 18,
  ingredients: [
    "tortilla",
    "ground beef",
    "cheese",
    "enchilada sauce",
    "queso"
  ],
  ingredientTags: ["beef","mexican"],
  notes: "FlavorFULL"
},

{
  id: "southwestern-alfredo-bowls",
  profileId: "shared",
  name: "Southwestern Alfredo Bowls",
  category: "Dinner",
  calories: 408,
  protein: 37,
  carbs: 34,
  fat: 14,
  ingredients: [
    "pasta",
    "chicken",
    "alfredo",
    "rotel",
    "cheese",
    "fajita seasoning"
  ],
  ingredientTags: ["chicken","pasta","southwestern"],
  notes: "FlavorFULL"
},

{
  id: "stuffed-flatbread",
  profileId: "shared",
  name: "Stuffed Flatbread",
  category: "Lunch",
  calories: 350,
  protein: 30,
  carbs: 30,
  fat: 12,
  ingredients: [
    "flatbread",
    "chicken",
    "cheese",
    "sauce"
  ],
  ingredientTags: ["flatbread","chicken"],
  notes: "Heat + Eat"
},

{
  id: "teriyaki-beef-bowl-no-rice",
  profileId: "shared",
  name: "Teriyaki Beef Bowl (No Rice)",
  category: "Dinner",
  calories: 280,
  protein: 28,
  carbs: 10,
  fat: 12,
  ingredients: [
    "ground beef",
    "teriyaki sauce",
    "soy sauce",
    "vegetables"
  ],
  ingredientTags: ["beef","asian"],
  notes: "Rice removed"
},{
  id: "club-sliders",
  profileId: "shared",
  name: "Club Sliders",
  category: "Dinner",
  calories: 330,
  protein: 24,
  carbs: 28,
  fat: 14,
  ingredients: [
    "slider buns",
    "turkey",
    "ham",
    "bacon",
    "cheese",
    "mayo",
    "lettuce"
  ],
  ingredientTags: ["turkey","bacon","sliders"],
  notes: "FlavorFULL"
},

{
  id: "crunchwrap-sliders",
  profileId: "shared",
  name: "Crunchwrap Sliders",
  category: "Dinner",
  calories: 380,
  protein: 28,
  carbs: 30,
  fat: 18,
  ingredients: [
    "ground beef",
    "tortillas",
    "cheese",
    "queso",
    "lettuce",
    "taco seasoning"
  ],
  ingredientTags: ["beef","mexican","sliders"],
  notes: "FlavorFULL"
},

{
  id: "garlic-parm-sliders",
  profileId: "shared",
  name: "Garlic Parm Sliders",
  category: "Dinner",
  calories: 360,
  protein: 30,
  carbs: 28,
  fat: 16,
  ingredients: [
    "slider buns",
    "chicken",
    "parmesan",
    "garlic butter",
    "cheese"
  ],
  ingredientTags: ["chicken","garlic","sliders"],
  notes: "FlavorFULL"
},

{
  id: "garlic-bread-pizza-burgers",
  profileId: "shared",
  name: "Garlic Bread Pizza Burgers",
  category: "Dinner",
  calories: 420,
  protein: 30,
  carbs: 35,
  fat: 20,
  ingredients: [
    "ground beef",
    "garlic bread",
    "marinara",
    "cheese",
    "pepperoni"
  ],
  ingredientTags: ["beef","pizza"],
  notes: "FlavorFULL"
},

{
  id: "loaded-alfredo-fries",
  profileId: "shared",
  name: "Loaded Alfredo Fries",
  category: "Dinner",
  calories: 370,
  protein: 28,
  carbs: 35,
  fat: 14,
  ingredients: [
    "potatoes",
    "chicken",
    "alfredo sauce",
    "cheese",
    "bacon"
  ],
  ingredientTags: ["chicken","fries","alfredo"],
  notes: "FlavorFULL"
},

{
  id: "philly-cheese-sliders",
  profileId: "shared",
  name: "Philly Cheese Sliders",
  category: "Dinner",
  calories: 390,
  protein: 32,
  carbs: 30,
  fat: 18,
  ingredients: [
    "ground beef",
    "slider buns",
    "peppers",
    "onion",
    "cheese"
  ],
  ingredientTags: ["beef","sliders"],
  notes: "FlavorFULL"
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