function getAppApi() {
  return window.dailyTracker || null;
}

function getProfiles() {
  const api = getAppApi();

  if (!api) return [];

  const profiles = api.storage.get('profiles', []);
  return Array.isArray(profiles) ? profiles : [];
}

function renderProfiles() {
  const profileList = document.getElementById('profileList');
  const profileSelect = document.getElementById('profileSelect');

  if (!profileList || !profileSelect) return;

  const profiles = getProfiles();

  profileList.innerHTML = profiles.map((profile) => `
    <button type="button" class="profile-card" data-id="${profile.id}">
      <div class="profile-avatar">${profile.name.charAt(0).toUpperCase()}</div>
      <div class="profile-name">${profile.name}</div>
    </button>
  `).join('');

  profileSelect.innerHTML = profiles.map((profile) => `
    <option value="${profile.id}">${profile.name}</option>
  `).join('');

  profileList.querySelectorAll('.profile-card').forEach((button) => {
    button.addEventListener('click', () => {
      profileSelect.value = button.dataset.id;
      document.getElementById('pinInput')?.focus();
    });
  });
}

function installLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const api = getAppApi();
    if (!api) return;

    const profileId = document.getElementById('profileSelect')?.value;
    const pin = document.getElementById('pinInput')?.value?.trim();

    const profiles = api.storage.get('profiles', []);
    const selected = profiles.find((profile) => profile.id === profileId);

    if (!selected) {
      alert('Please choose a profile.');
      return;
    }

    if (selected.pin !== pin) {
      alert('Incorrect PIN.');
      return;
    }

    api.setCurrentProfile(selected);

    const preferredTheme = selected.theme || localStorage.getItem('preferredTheme') || 'light';
    api.applyTheme(preferredTheme);

    window.location.href = 'dashboard.html';
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if (window.dailyTracker?.ensureApp) {
    await window.dailyTracker.ensureApp();
  }

  renderProfiles();
  installLogin();
});