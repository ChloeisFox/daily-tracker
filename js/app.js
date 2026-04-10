import { firebaseSettings, collections } from './firebase-config.js';

const STARTER_PROFILES = [
  {
    id: 'chloe',
    name: 'Chloe',
    pin: '5629',
    createdAt: new Date().toISOString(),
    theme: 'light',
    goals: {
      startWeight: '',
      goalWeight: '',
      calorieTarget: 1800,
      proteinTarget: 100,
      weighInDays: 5
    }
  },
  {
    id: 'isa',
    name: 'Isa',
    pin: '2525',
    createdAt: new Date().toISOString(),
    theme: 'light',
    goals: {
      startWeight: '',
      goalWeight: '',
      calorieTarget: 1800,
      proteinTarget: 100,
      weighInDays: 5
    }
  }
];

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const db = {
  async init() {
    this.mode = firebaseSettings.enabled ? 'firebase' : 'local';

    if (this.mode === 'firebase') {
      try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
        const {
          getFirestore,
          collection,
          getDocs,
          getDoc,
          doc,
          setDoc,
          addDoc,
          deleteDoc,
          query,
          where
        } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');

        this._sdk = { collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc, query, where };
        this.app = initializeApp(firebaseSettings.config);
        this.firestore = getFirestore(this.app);
      } catch (error) {
        console.error('Firebase failed to initialize, falling back to local mode.', error);
        this.mode = 'local';
      }
    }

    const profiles = storage.get('profiles', []);
    if (!profiles.length) {
      storage.set('profiles', STARTER_PROFILES);
      storage.set('settings', {});
      storage.set('meals', []);
      storage.set('weights', []);
      storage.set('workouts', []);
    }
  },

  async list(name, filter = null) {
    if (this.mode === 'local') {
      const list = storage.get(name, []);
      if (!filter) return list;

      return list.filter((item) =>
        Object.entries(filter).every(([k, v]) => item[k] === v)
      );
    }

    const { collection, getDocs, query, where } = this._sdk;
    const ref = collection(this.firestore, name);

    let snapshot;
    if (filter) {
      const clauses = Object.entries(filter).map(([k, v]) => where(k, '==', v));
      snapshot = await getDocs(query(ref, ...clauses));
    } else {
      snapshot = await getDocs(ref);
    }

    return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
  },

  async upsert(name, id, payload) {
    if (this.mode === 'local') {
      const list = storage.get(name, []);
      const item = { ...payload, id };
      const index = list.findIndex((entry) => entry.id === id);

      if (index >= 0) {
        list[index] = item;
      } else {
        list.push(item);
      }

      storage.set(name, list);
      return item;
    }

    const { doc, setDoc } = this._sdk;
    await setDoc(doc(this.firestore, name, id), payload, { merge: true });
    return { id, ...payload };
  },

  async create(name, payload) {
    const id = payload.id || crypto.randomUUID();
    return this.upsert(name, id, { ...payload, id });
  },

  async remove(name, id) {
    if (this.mode === 'local') {
      const list = storage.get(name, []).filter((entry) => entry.id !== id);
      storage.set(name, list);
      return;
    }

    const { doc, deleteDoc } = this._sdk;
    await deleteDoc(doc(this.firestore, name, id));
  }
};

const helpers = {
today() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
},

  formatDate(dateString) {
    if (!dateString) return '--';

    return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  formatNumber(value, digits = 0) {
    return Number.isFinite(Number(value)) ? Number(value).toFixed(digits) : '--';
  },

  slugify(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  initials(name) {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  },

  calcDayTotals({ meals, workouts, settings }) {
    const mealCalories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    const protein = meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0);
    const carbs = meals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0);
    const fats = meals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0);
    const caloriesBurned = workouts.reduce((sum, workout) => sum + Number(workout.caloriesBurned || 0), 0);
    const workoutMinutes = workouts.reduce((sum, workout) => sum + Number(workout.minutes || 0), 0);
    const calorieTarget = Number(settings?.goals?.calorieTarget || 0);
    const caloriesLeft = calorieTarget ? calorieTarget - mealCalories + caloriesBurned : 0;

    return {
      mealCalories,
      protein,
      carbs,
      fats,
      caloriesBurned,
      workoutMinutes,
      calorieTarget,
      caloriesLeft
    };
  }
};

function applyTheme(theme) {
  const resolvedTheme = theme === 'dark' ? 'dark' : 'light';

  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${resolvedTheme}`);

  localStorage.setItem('preferredTheme', resolvedTheme);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', resolvedTheme === 'dark' ? '#09070d' : '#f8f5fd');
  }

  const button = document.getElementById('themeToggle');
  if (button) {
    button.textContent = resolvedTheme === 'dark' ? '☀' : '◐';
    button.setAttribute(
      'aria-label',
      resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

function installThemeToggle() {
  const button = document.getElementById('themeToggle');
  const current = localStorage.getItem('preferredTheme') || 'light';

  applyTheme(current);

  if (!button) return;

  button.onclick = () => {
    const next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(next);
  };
}

function getCurrentProfile() {
  return storage.get('currentProfile', null);
}

function setCurrentProfile(profile) {
  storage.set('currentProfile', profile);
}

function requireProfile() {
  if (!getCurrentProfile()) {
    window.location.href = 'index.html';
  }
}

let appReadyPromise = null;

async function ensureApp() {
  if (appReadyPromise) return appReadyPromise;

  appReadyPromise = (async () => {
    await db.init();
    installThemeToggle();

    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./service-worker.js');
      } catch (error) {
        console.warn('Service worker registration failed.', error);
      }
    }
  })();

  return appReadyPromise;
}

window.dailyTracker = {
  db,
  helpers,
  storage,
  collections,
  getCurrentProfile,
  setCurrentProfile,
  requireProfile,
  ensureApp,
  applyTheme
};

ensureApp();