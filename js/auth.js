function waitForAppReady() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.dailyTracker) {
        resolve(window.dailyTracker);
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

function getProfiles(api) {
  const profiles = api.storage.get('profiles', []);
  return Array.isArray(profiles) ? profiles : [];
}

function renderProfiles(api) {
  const profileList = document.getElementById('profileList');
  const profileSelect = document.getElementById('profileSelect');

  if (!profileList || !profileSelect) return;

  const profiles = getProfiles(api);

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

function installLogin(api) {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

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
  const api = await waitForAppReady();
  await api.ensureApp();
  renderProfiles(api);
  installLogin(api);
});