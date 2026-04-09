import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  limit
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { db } from './firebase-config.js';

export const collections = {
  profiles: 'profiles',
  meals: 'meals',
  weights: 'weights',
  workouts: 'workouts'
};

export function isoToday() {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}

export function getActiveProfileName() {
  return localStorage.getItem('dailyTracker.activeProfileName') || '';
}

export function setActiveProfileName(name) {
  localStorage.setItem('dailyTracker.activeProfileName', name);
}

export function getThemePreference() {
  return localStorage.getItem('dailyTracker.themePreference') || 'system';
}

export function applyTheme() {
  const root = document.documentElement;
  const pref = getThemePreference();
  const resolved = pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref;
  root.setAttribute('data-theme', resolved);
}

export function cycleThemePreference() {
  const current = getThemePreference();
  const next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
  localStorage.setItem('dailyTracker.themePreference', next);
  applyTheme();
  return next;
}

export function wireThemeToggle() {
  applyTheme();
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => cycleThemePreference());
  }
}

export async function getProfiles() {
  const snapshot = await getDocs(query(collection(db, collections.profiles), orderBy('name')));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProfileByName(name) {
  const ref = doc(db, collections.profiles, name);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function saveProfile(profile) {
  const ref = doc(db, collections.profiles, profile.name);
  await setDoc(ref, profile, { merge: true });
}

export async function getEntriesForDate(type, profileName, date) {
  const snapshot = await getDocs(query(
    collection(db, collections[type]),
    where('profileName', '==', profileName),
    where('date', '==', date),
    orderBy('createdAt', 'desc')
  ));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getRecentEntries(type, profileName, max = 50) {
  const snapshot = await getDocs(query(
    collection(db, collections[type]),
    where('profileName', '==', profileName),
    orderBy('date', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(max)
  ));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addEntry(type, payload) {
  await addDoc(collection(db, collections[type]), {
    ...payload,
    createdAt: Date.now()
  });
}

export async function updateEntry(type, id, payload) {
  await updateDoc(doc(db, collections[type], id), payload);
}

export async function removeEntry(type, id) {
  await deleteDoc(doc(db, collections[type], id));
}

export async function getAllEntries(type, profileName) {
  const snapshot = await getDocs(query(
    collection(db, collections[type]),
    where('profileName', '==', profileName),
    orderBy('date', 'desc'),
    orderBy('createdAt', 'desc')
  ));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function sumBy(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

export function groupByDate(items, key = 'date') {
  return items.reduce((acc, item) => {
    const bucket = item[key];
    acc[bucket] = acc[bucket] || [];
    acc[bucket].push(item);
    return acc;
  }, {});
}

export async function verifyPin(profileName, pin) {
  const profile = await getProfileByName(profileName);
  return profile && String(profile.pin) === String(pin);
}

export function requireProfile() {
  const name = getActiveProfileName();
  if (!name && !location.pathname.endsWith('settings.html')) {
    location.href = 'settings.html';
    return null;
  }
  return name;
}

export async function seedProfiles() {
  const defaults = [
    {
      name: 'Chloe',
      pin: '5629',
      startWeight: 0,
      goalWeight: 0,
      calorieTarget: 1800,
      proteinTarget: 100,
      weighInFrequencyDays: 5,
      themePreference: 'system'
    },
    {
      name: 'Isa',
      pin: '2525',
      startWeight: 0,
      goalWeight: 0,
      calorieTarget: 1800,
      proteinTarget: 100,
      weighInFrequencyDays: 5,
      themePreference: 'system'
    }
  ];

  for (const profile of defaults) {
    const existing = await getProfileByName(profile.name);
    if (!existing) {
      await saveProfile(profile);
    }
  }
}
