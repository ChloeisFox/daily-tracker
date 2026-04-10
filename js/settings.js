const app = window.dailyTracker;

function renderProfileCard(profile) {
  document.getElementById('currentProfileCard').innerHTML = `
    <div class="summary-row"><span>Name</span><strong>${profile.name}</strong></div>
    <div class="summary-row"><span>PIN</span><strong>••••</strong></div>
    <div class="summary-row"><span>Theme</span><strong>${document.body.classList.contains('theme-dark') ? 'dark' : 'light'}</strong></div>
    <div class="summary-row"><span>Daily Calorie Target</span><strong>${profile?.goals?.calorieTarget || 0}</strong></div>
  `;
}

function fillSettingsForm(profile) {
  document.getElementById('startWeight').value = profile?.goals?.startWeight || '';
  document.getElementById('goalWeight').value = profile?.goals?.goalWeight || '';
  document.getElementById('calorieTarget').value = profile?.goals?.calorieTarget || '';
  document.getElementById('proteinTarget').value = profile?.goals?.proteinTarget || '';
  document.getElementById('weighInDays').value = profile?.goals?.weighInDays || 5;
  document.getElementById('displayName').value = profile.name || '';
}

async function init() {
  await app.ensureApp();
  app.requireProfile();

  const profile = app.getCurrentProfile();
  let liveProfile = (await app.db.list('profiles', { id: profile.id }))[0] || profile;

  renderProfileCard(liveProfile);
  fillSettingsForm(liveProfile);

  document.getElementById('settingsForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const saveButton = event.target.querySelector('button[type="submit"]');
    if (saveButton) saveButton.disabled = true;

    try {
      const updated = {
        ...liveProfile,
        id: liveProfile.id,
        pin: liveProfile.pin,
        createdAt: liveProfile.createdAt || new Date().toISOString(),
        name: document.getElementById('displayName').value.trim() || liveProfile.name,
        theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
        goals: {
          startWeight: document.getElementById('startWeight').value.trim(),
          goalWeight: document.getElementById('goalWeight').value.trim(),
          calorieTarget: Number(document.getElementById('calorieTarget').value || 0),
          proteinTarget: Number(document.getElementById('proteinTarget').value || 0),
          weighInDays: Number(document.getElementById('weighInDays').value || 5)
        }
      };

      await app.db.upsert('profiles', liveProfile.id, updated);

      liveProfile = updated;
      app.setCurrentProfile(updated);

      renderProfileCard(liveProfile);
      fillSettingsForm(liveProfile);

      alert('Settings saved.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Settings could not be saved. Check the console for details.');
    } finally {
      if (saveButton) saveButton.disabled = false;
    }
  });

  document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('newProfileName').value.trim();
    const pin = document.getElementById('newProfilePin').value.trim();

    if (!name || !/^[0-9]{4}$/.test(pin)) {
      alert('Please enter a name and a 4-digit PIN.');
      return;
    }

    try {
      await app.db.create('profiles', {
        id: app.helpers.slugify(name),
        name,
        pin,
        createdAt: new Date().toISOString(),
        theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
        goals: {
          startWeight: '',
          goalWeight: '',
          calorieTarget: 1800,
          proteinTarget: 100,
          weighInDays: 5
        }
      });

      event.target.reset();
      alert('Profile created. You can switch to it from the profile picker.');
    } catch (error) {
      console.error('Failed to create profile:', error);
      alert('Profile could not be created.');
    }
  });

  document.getElementById('enableNotifications').addEventListener('click', async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }

    const result = await Notification.requestPermission();
    alert(result === 'granted' ? 'Notifications enabled.' : 'Notifications were not enabled.');
  });
}

init();